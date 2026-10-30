/**
 * Simulador de Carrera Interplanetaria ("Gran Premio Cósmico")
 * Permite enfrentar hasta 3 sistemas de propulsión en tiempo real.
 */

import { PROPULSION_SYSTEMS, PROPULSION_LOOKUP } from '../data/propulsionSystems.js';
import { formatDurationDetailed } from '../physics/relativity.js';
import { soundFX } from '../audio/soundEffects.js';

export class ComparisonRace {
  constructor(containerEl) {
    this.container = containerEl;
    this.selectedContenders = ["apollo11", "nuclear_thermal", "warp_1"];
    this.isRunning = false;
    this.raceProgress = [0, 0, 0];
    this.animationId = null;
    this.onRaceEnd = null;

    this.currentOrigin = null;
    this.currentDestination = null;
    this.currentDistanceKm = 0;
  }

  setScenario(origin, destination, distanceKm) {
    this.currentOrigin = origin;
    this.currentDestination = destination;
    this.currentDistanceKm = distanceKm;
    this.render();
  }

  setContenders(contenderIds) {
    this.selectedContenders = contenderIds.slice(0, 3);
    this.render();
  }

  calculateTripTimes() {
    return this.selectedContenders.map(id => {
      const prop = PROPULSION_LOOKUP[id] || PROPULSION_SYSTEMS[0];
      const seconds = this.currentDistanceKm / prop.speedKms;
      return {
        prop,
        seconds,
        formatted: formatDurationDetailed(seconds)
      };
    });
  }

  render() {
    if (!this.container) return;

    const trips = this.calculateTripTimes();

    this.container.innerHTML = `
      <div class="race-header">
        <div class="race-title-box">
          <span class="race-badge">🏁 SIMULADOR MULTI-PROPULSIÓN</span>
          <h3>Gran Premio Cósmico: ${this.currentOrigin?.name || 'Tierra'} ➔ ${this.currentDestination?.name || 'Marte'}</h3>
          <p class="race-subtitle">Distancia de carrera: <strong>${Math.round(this.currentDistanceKm).toLocaleString('es-ES')} km</strong></p>
        </div>
        <div class="race-actions">
          <button id="btnStartRace" class="btn-primary pulse-btn" ${this.isRunning ? 'disabled' : ''}>
            ${this.isRunning ? '🚀 Carrera en progreso...' : '▶ ¡Comenzar Carrera!'}
          </button>
          <button id="btnResetRace" class="btn-ghost" ${!this.isRunning && this.raceProgress.every(p => p === 0) ? 'disabled' : ''}>
            ↺ Reiniciar
          </button>
        </div>
      </div>

      <div class="race-selector-row">
        ${[0, 1, 2].map(idx => `
          <div class="race-slot">
            <label for="selectRacer${idx}">Nave #${idx + 1}:</label>
            <select id="selectRacer${idx}" class="cosmic-select" ${this.isRunning ? 'disabled' : ''}>
              ${PROPULSION_SYSTEMS.map(sys => `
                <option value="${sys.id}" ${sys.id === this.selectedContenders[idx] ? 'selected' : ''}>
                  ${sys.icon} ${sys.name} (${sys.badge})
                </option>
              `).join('')}
            </select>
          </div>
        `).join('')}
      </div>

      <div class="race-tracks">
        ${trips.map((item, idx) => `
          <div class="racer-card" id="racerCard${idx}">
            <div class="racer-info">
              <span class="racer-icon">${item.prop.icon}</span>
              <div class="racer-text">
                <div class="racer-name-row">
                  <span class="racer-name">${item.prop.name}</span>
                  <span class="racer-badge-tag">${item.prop.badge}</span>
                </div>
                <div class="racer-time-estimate">Tiempo total: <strong>${item.formatted.text}</strong></div>
              </div>
              <div class="racer-rank" id="racerRank${idx}">--</div>
            </div>

            <div class="track-bar-container">
              <div class="track-planet-start" title="${this.currentOrigin?.name}">
                <span>${this.currentOrigin?.symbol || '●'}</span>
              </div>
              <div class="track-bar">
                <div class="track-progress" id="trackProgress${idx}" style="width: ${this.raceProgress[idx]}%">
                  <div class="track-ship" id="trackShip${idx}">
                    🚀
                  </div>
                </div>
              </div>
              <div class="track-planet-end" title="${this.currentDestination?.name}">
                <span>${this.currentDestination?.symbol || '●'}</span>
              </div>
            </div>

            <div class="racer-telemetry">
              <span id="telemetryPct${idx}">0% completado</span>
              <span class="telemetry-speed">${item.prop.speedKms.toLocaleString('es-ES', { maximumFractionDigits: 1 })} km/s</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const btnStart = this.container.querySelector('#btnStartRace');
    const btnReset = this.container.querySelector('#btnResetRace');

    btnStart?.addEventListener('click', () => this.startRace());
    btnReset?.addEventListener('click', () => this.resetRace());

    [0, 1, 2].forEach(idx => {
      const select = this.container.querySelector(`#selectRacer${idx}`);
      select?.addEventListener('change', (e) => {
        soundFX.playClick();
        this.selectedContenders[idx] = e.target.value;
        this.resetRace();
      });
    });
  }

  startRace() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.raceProgress = [0, 0, 0];

    soundFX.playWarpEngage();

    const trips = this.calculateTripTimes();
    const minSeconds = Math.min(...trips.map(t => t.seconds));

    // Determinar velocidades de avance en la animación
    // Usamos una escala logarítmica/normalizada para que la más rápida gane espectacularmente
    // pero las más lentas no se queden completamente congeladas
    const finishOrder = [];
    const startTime = performance.now();
    const baseDurationMs = 5000; // La nave ganadora tarda 5 segundos en cruzar la pantalla

    const speeds = trips.map(t => {
      // Relación normalizada
      const ratio = minSeconds / t.seconds;
      return Math.max(0.0003, Math.pow(ratio, 0.45));
    });

    const animate = (now) => {
      if (!this.isRunning) return;

      let allFinished = true;

      for (let i = 0; i < 3; i++) {
        if (this.raceProgress[i] < 100) {
          allFinished = false;
          // Incremento por frame
          this.raceProgress[i] += speeds[i] * 0.85;

          if (this.raceProgress[i] >= 100) {
            this.raceProgress[i] = 100;
            if (!finishOrder.includes(i)) {
              finishOrder.push(i);
              const rankEl = this.container.querySelector(`#racerRank${i}`);
              if (rankEl) {
                const rankLabels = ["🥇 1º", "🥈 2º", "🥉 3º"];
                rankEl.innerHTML = rankLabels[finishOrder.length - 1];
                rankEl.classList.add(`rank-${finishOrder.length}`);
              }
              if (finishOrder.length === 1) {
                soundFX.playVictoryRace();
              }
            }
          }

          const progressBar = this.container.querySelector(`#trackProgress${i}`);
          const pctEl = this.container.querySelector(`#telemetryPct${i}`);
          if (progressBar) progressBar.style.width = `${Math.min(100, this.raceProgress[i])}%`;
          if (pctEl) pctEl.textContent = `${Math.min(100, Math.round(this.raceProgress[i]))}% completado`;
        }
      }

      if (!allFinished) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.isRunning = false;
        const btnStart = this.container.querySelector('#btnStartRace');
        if (btnStart) {
          btnStart.textContent = "🏁 ¡Carrera Finalizada!";
          btnStart.disabled = false;
        }
      }
    };

    this.animationId = requestAnimationFrame(animate);
    this.render(); // Re-render to update disabled states
  }

  resetRace() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.raceProgress = [0, 0, 0];
    soundFX.playClick();
    this.render();
  }
}
