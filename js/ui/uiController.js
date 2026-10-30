/**
 * Controlador Principal de la Interfaz de Usuario
 */

import { CELESTIAL_BODIES, CELESTIAL_LOOKUP, SPEED_OF_LIGHT_KMS } from '../data/celestialBodies.js';
import { PROPULSION_SYSTEMS, PROPULSION_LOOKUP, PROPULSION_CATEGORIES } from '../data/propulsionSystems.js';
import { calculateDistances } from '../physics/orbitalMechanics.js';
import { calculateSpaceTrip, formatDurationDetailed } from '../physics/relativity.js';
import { soundFX } from '../audio/soundEffects.js';

export class UIController {
  constructor({ orbitViz, starfield, comparisonRace, encyclopedia }) {
    this.orbitViz = orbitViz;
    this.starfield = starfield;
    this.comparisonRace = comparisonRace;
    this.encyclopedia = encyclopedia;

    // Estado inicial
    this.originId = "earth";
    this.destId = "mars";
    this.propulsionId = "apollo11";
    this.distanceMode = "avgKm"; // "minKm", "avgKm", "maxKm", "hohmannKm"

    // Personalización de velocidad
    this.isCustomSpeed = false;
    this.customValue = 100;
    this.customUnit = "kms"; // "kms", "kmh", "pct_c", "mach", "c"

    this.cacheDOMElements();
    this.populateSelectors();
    this.bindEvents();
    this.updateAll();
  }

  cacheDOMElements() {
    this.selectOrigin = document.getElementById('selectOrigin');
    this.selectDest = document.getElementById('selectDest');
    this.btnSwap = document.getElementById('btnSwapPlanets');

    this.distModeButtons = document.querySelectorAll('.dist-mode-btn');
    this.distDisplayKm = document.getElementById('distDisplayKm');
    this.distDisplayAU = document.getElementById('distDisplayAU');
    this.distDisplayLightTime = document.getElementById('distDisplayLightTime');
    this.distNote = document.getElementById('distNote');

    this.propulsionCardsContainer = document.getElementById('propulsionCards');
    this.customSpeedBox = document.getElementById('customSpeedBox');
    this.inputCustomSpeed = document.getElementById('inputCustomSpeed');
    this.selectCustomUnit = document.getElementById('selectCustomUnit');
    this.customSpeedPreview = document.getElementById('customSpeedPreview');

    // Resultados
    this.timeEarthEl = document.getElementById('timeEarth');
    this.timeCrewEl = document.getElementById('timeCrew');
    this.dilationCard = document.getElementById('dilationCard');
    this.lorentzVal = document.getElementById('lorentzVal');
    this.dilationDesc = document.getElementById('dilationDesc');
    this.warpBanner = document.getElementById('warpBanner');
    this.comparisonsList = document.getElementById('comparisonsList');

    // Audio & Modos
    this.btnSoundToggle = document.getElementById('btnSoundToggle');
    this.btnAmbientToggle = document.getElementById('btnAmbientToggle');
    this.btnOpenEncyclopedia = document.getElementById('btnOpenEncyclopedia');
    this.btnOpenRace = document.getElementById('btnOpenRace');
    this.btnToggleLogScale = document.getElementById('btnToggleLogScale');
    this.btnResetView = document.getElementById('btnResetView');
    this.selectTimeSpeed = document.getElementById('selectTimeSpeed');
  }

  populateSelectors() {
    // Origen y Destino
    const optionsHtml = CELESTIAL_BODIES.map(b => `
      <option value="${b.id}">${b.symbol} ${b.name} (${b.tag})</option>
    `).join('');

    this.selectOrigin.innerHTML = optionsHtml;
    this.selectDest.innerHTML = optionsHtml;

    this.selectOrigin.value = this.originId;
    this.selectDest.value = this.destId;

    // Renderizar tarjetas de sistemas de propulsión agrupadas por categoría
    this.renderPropulsionCards();
  }

  renderPropulsionCards() {
    const categories = [
      { key: "current", label: "🚀 Tecnologías Actuales & Históricas" },
      { key: "near_future", label: "⚛️ Futuro Cercano & Teórico" },
      { key: "scifi", label: "🌌 Ciencia Ficción & Relatividad" },
      { key: "reference", label: "🚶 Referencias Terrestres Cotidianas" }
    ];

    let html = "";

    categories.forEach(cat => {
      const systems = PROPULSION_SYSTEMS.filter(s => s.category === cat.key);
      html += `
        <div class="prop-category-group">
          <div class="category-heading">${cat.label}</div>
          <div class="prop-cards-grid">
            ${systems.map(s => `
              <div class="prop-card ${s.id === this.propulsionId && !this.isCustomSpeed ? 'selected' : ''}" data-prop-id="${s.id}">
                <div class="prop-card-header">
                  <span class="prop-icon">${s.icon}</span>
                  <span class="prop-badge">${s.badge}</span>
                </div>
                <div class="prop-name">${s.name}</div>
                <div class="prop-desc">${s.description.substring(0, 85)}...</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    // Agregar botón de velocidad personalizada
    html += `
      <div class="prop-category-group">
        <div class="category-heading">⚙️ Parámetros Personalizados</div>
        <div class="prop-cards-grid">
          <div class="prop-card custom-card ${this.isCustomSpeed ? 'selected' : ''}" data-prop-id="custom">
            <div class="prop-card-header">
              <span class="prop-icon">🎛️</span>
              <span class="prop-badge">Custom</span>
            </div>
            <div class="prop-name">Velocidad Personalizada</div>
            <div class="prop-desc">Define cualquier velocidad manualmente en km/s, Mach, % de c o múltiplos de la velocidad de la luz.</div>
          </div>
        </div>
      </div>
    `;

    this.propulsionCardsContainer.innerHTML = html;

    // Reasignar clics a tarjetas de propulsión
    this.propulsionCardsContainer.querySelectorAll('.prop-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.propId;
        soundFX.playClick();
        if (id === 'custom') {
          this.isCustomSpeed = true;
          this.customSpeedBox.classList.remove('hidden');
        } else {
          this.isCustomSpeed = false;
          this.propulsionId = id;
          this.customSpeedBox.classList.add('hidden');
        }
        this.renderPropulsionCards();
        this.updateAll();
      });
    });
  }

  bindEvents() {
    // Cambio en selector de origen / destino
    this.selectOrigin.addEventListener('change', (e) => {
      this.originId = e.target.value;
      soundFX.playPlanetSelect();
      this.updateAll();
    });

    this.selectDest.addEventListener('change', (e) => {
      this.destId = e.target.value;
      soundFX.playPlanetSelect();
      this.updateAll();
    });

    // Botón intercambiar
    this.btnSwap.addEventListener('click', () => {
      soundFX.playClick();
      const temp = this.originId;
      this.originId = this.destId;
      this.destId = temp;
      this.selectOrigin.value = this.originId;
      this.selectDest.value = this.destId;
      this.updateAll();
    });

    // Modos de distancia
    this.distModeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundFX.playClick();
        this.distModeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.distanceMode = btn.dataset.mode;
        this.orbitViz.setDistanceMode(this.distanceMode);
        this.updateAll();
      });
    });

    // Inputs de velocidad personalizada
    this.inputCustomSpeed.addEventListener('input', () => {
      this.customValue = parseFloat(this.inputCustomSpeed.value) || 1;
      this.updateAll();
    });

    this.selectCustomUnit.addEventListener('change', () => {
      this.customUnit = this.selectCustomUnit.value;
      this.updateAll();
    });

    // Audio
    this.btnSoundToggle.addEventListener('click', () => {
      const isMuted = soundFX.toggleMute();
      this.btnSoundToggle.innerHTML = isMuted ? '🔇 Audio: Silenciado' : '🔊 Audio: Activado';
    });

    this.btnAmbientToggle.addEventListener('click', () => {
      soundFX.resume();
      soundFX.startCosmicAmbience();
      this.btnAmbientToggle.classList.add('active');
      this.btnAmbientToggle.innerHTML = '✨ Drone Cósmico Activo';
    });

    // Enciclopedia
    this.btnOpenEncyclopedia?.addEventListener('click', () => {
      this.encyclopedia.open("topics");
    });

    // Scroll o modal a Carrera
    this.btnOpenRace?.addEventListener('click', () => {
      soundFX.playClick();
      const raceSection = document.getElementById('raceSection');
      raceSection?.scrollIntoView({ behavior: 'smooth' });
    });

    // Controles de Canvas Solar
    this.btnToggleLogScale?.addEventListener('click', () => {
      const isLog = this.orbitViz.toggleLogScale();
      soundFX.playClick();
      this.btnToggleLogScale.innerHTML = isLog ? '🔍 Escala: Logarítmica' : '📏 Escala: Proporcional';
    });

    this.btnResetView?.addEventListener('click', () => {
      soundFX.playClick();
      this.orbitViz.resetView();
    });

    this.selectTimeSpeed?.addEventListener('change', (e) => {
      soundFX.playClick();
      this.orbitViz.setTimeScale(e.target.value);
    });
  }

  getCalculatedSpeedKms() {
    if (!this.isCustomSpeed) {
      const prop = PROPULSION_LOOKUP[this.propulsionId] || PROPULSION_SYSTEMS[2];
      return prop.speedKms;
    }

    const val = this.customValue;
    switch (this.customUnit) {
      case "kms":
        return val;
      case "kmh":
        return val / 3600;
      case "pct_c":
        return (val / 100) * SPEED_OF_LIGHT_KMS;
      case "mach":
        return (val * 0.343) / 1000; // Mach 1 = 343 m/s = 0.343 km/s
      case "c":
        return val * SPEED_OF_LIGHT_KMS;
      default:
        return val;
    }
  }

  updateAll() {
    const origin = CELESTIAL_LOOKUP[this.originId] || CELESTIAL_BODIES[2];
    const destination = CELESTIAL_LOOKUP[this.destId] || CELESTIAL_BODIES[4];

    // 1. Calcular distancias orbitales
    const distances = calculateDistances(origin, destination);

    // Actualizar visualizador del Sistema Solar
    this.orbitViz.setPlanets(this.originId, this.destId);

    // 2. Determinar distancia activa
    let activeDistKm = distances[this.distanceMode] ?? distances.avgKm;

    // Actualizar badges de distancia
    this.distDisplayKm.textContent = `${Math.round(activeDistKm).toLocaleString('es-ES')} km`;
    const distAU = (activeDistKm / 149597871).toFixed(3);
    this.distDisplayAU.textContent = `${distAU} UA`;

    // Tiempo luz (segundos que tarda la luz en recorrer la distancia)
    const lightSeconds = activeDistKm / SPEED_OF_LIGHT_KMS;
    const lightFormatted = formatDurationDetailed(lightSeconds);
    this.distDisplayLightTime.textContent = lightFormatted.shortText;

    // 3. Obtener velocidad de propulsión
    const speedKms = this.getCalculatedSpeedKms();
    this.orbitViz.setShipSpeedFactor(speedKms);

    let activeProp = PROPULSION_LOOKUP[this.propulsionId] || PROPULSION_SYSTEMS[2];
    if (this.isCustomSpeed) {
      activeProp = {
        id: "custom",
        name: "Velocidad Personalizada",
        speedKms,
        speedKmh: speedKms * 3600,
        fractionOfC: speedKms / SPEED_OF_LIGHT_KMS,
        icon: "🎛️",
        badge: `${speedKms.toLocaleString('es-ES', { maximumFractionDigits: 1 })} km/s`,
        isWarp: speedKms > SPEED_OF_LIGHT_KMS
      };

      if (this.customSpeedPreview) {
        this.customSpeedPreview.innerHTML = `
          Velocidad equivalente: <strong>${speedKms.toLocaleString('es-ES', { maximumFractionDigits: 2 })} km/s</strong> 
          (${Math.round(speedKms * 3600).toLocaleString('es-ES')} km/h) &bull; 
          <strong>${(speedKms / SPEED_OF_LIGHT_KMS * 100).toFixed(speedKms < 30 ? 4 : 2)}% de la velocidad de la luz</strong>
        `;
      }
    }

    // Activar efecto de estrellas Warp si la velocidad supera 0.5c o es Warp
    const isWarpVisual = activeProp.isWarp || speedKms >= SPEED_OF_LIGHT_KMS * 0.5;
    this.starfield.setWarp(isWarpVisual, activeProp.isWarp ? 45 : 20);

    // 4. Calcular viaje espacial con Relatividad Especial
    const trip = calculateSpaceTrip({
      origin,
      destination,
      propulsion: activeProp,
      customSpeedKms: speedKms,
      distanceMode: this.distanceMode,
      distancesObj: distances
    });

    // 5. Renderizar resultados numéricos
    this.timeEarthEl.innerHTML = `
      <div class="result-number">${trip.earthDuration.text}</div>
      <div class="result-sub">Exacto: ${trip.earthDuration.fullText} (${Math.round(trip.timeEarthSeconds).toLocaleString('es-ES')} s)</div>
    `;

    // Si hay relatividad o warp
    if (trip.isWarp) {
      this.timeCrewEl.innerHTML = `
        <div class="result-number warp-glow">${trip.crewDuration.text}</div>
        <div class="result-sub">Espacio-tiempo plano dentro de la burbuja Alcubierre</div>
      `;
      this.warpBanner.classList.remove('hidden');
      this.dilationCard.classList.add('hidden');
    } else if (trip.isRelativistic) {
      this.warpBanner.classList.add('hidden');
      this.dilationCard.classList.remove('hidden');

      this.timeCrewEl.innerHTML = `
        <div class="result-number relativistic-glow">${trip.crewDuration.text}</div>
        <div class="result-sub">Tiempo propio biológico de la tripulación a bordo</div>
      `;

      this.lorentzVal.textContent = trip.lorentzFactor === Infinity ? "∞" : trip.lorentzFactor.toFixed(3);
      this.dilationDesc.innerHTML = `
        Debido a la velocidad cercana a la luz (${(trip.speedKms / SPEED_OF_LIGHT_KMS * 100).toFixed(2)}% c), 
        el tiempo para la tripulación transcurre <strong>${trip.timeDilationPct}% más lento</strong> que en la Tierra. 
        ¡Los astronautas envejecen a una fracción del tiempo de sus familias en casa!
      `;
    } else {
      this.warpBanner.classList.add('hidden');
      this.dilationCard.classList.add('hidden');
      this.timeCrewEl.innerHTML = `
        <div class="result-number">${trip.earthDuration.text}</div>
        <div class="result-sub">A velocidades no relativistas, el tiempo de la tripulación es idéntico al terrestre</div>
      `;
    }

    // 6. Comparaciones a escala humana
    this.renderComparisons(trip.comparisons);

    // 7. Actualizar escenario en el Gran Premio Cósmico
    this.comparisonRace.setScenario(origin, destination, activeDistKm);
  }

  renderComparisons(comparisons) {
    if (!this.comparisonsList) return;
    if (comparisons.length === 0) {
      this.comparisonsList.innerHTML = `<div class="comp-empty">Trayecto instantáneo o distancia nula.</div>`;
      return;
    }

    this.comparisonsList.innerHTML = comparisons.map(c => `
      <div class="comp-item">
        <span class="comp-icon">${c.icon}</span>
        <div class="comp-content">
          <div class="comp-label">${c.label}</div>
          <div class="comp-val">${c.value}</div>
        </div>
      </div>
    `).join('');
  }
}
