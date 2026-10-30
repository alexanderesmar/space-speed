/**
 * Visualizador Interactivo del Sistema Solar y Trayectorias de Vuelo
 */

import { CELESTIAL_BODIES } from '../data/celestialBodies.js';

export class OrbitVisualizer {
  constructor(canvas, onPlanetClicked) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onPlanetClicked = onPlanetClicked;

    this.originId = "earth";
    this.destId = "mars";
    this.distanceMode = "avgKm"; // "minKm", "avgKm", "maxKm", "hohmannKm"

    // Estados de navegación e interacción
    this.zoom = 1.0;
    this.targetZoom = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.hoveredPlanet = null;

    // Animación orbital
    this.isPaused = false;
    this.timeScale = 1.0;
    this.simTime = 0;

    // Animación de la nave espacial sobre la trayectoria
    this.shipProgress = 0; // 0 a 1
    this.shipSpeedFactor = 0.005; // Ajustable según sistema de propulsión
    this.shipTrail = [];

    // Opciones de visualización
    this.useLogScale = true; // Permite ver tanto Mercurio como Neptuno claramente

    this.initEvents();
    this.resize();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio || 800;
    this.canvas.height = rect.height * window.devicePixelRatio || 500;
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.width = rect.width || 800;
    this.height = rect.height || 500;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    // Arrastrar (Pan)
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.panX = e.clientX - this.dragStartX;
        this.panY = e.clientY - this.dragStartY;
      }
      this.checkHover(e);
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Zoom con la rueda del ratón
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      this.targetZoom = Math.max(0.3, Math.min(6.0, this.targetZoom * zoomFactor));
    }, { passive: false });

    // Clic en planeta
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const clicked = this.getPlanetAtPosition(mouseX, mouseY);
      if (clicked && this.onPlanetClicked) {
        this.onPlanetClicked(clicked.id);
      }
    });

    // Soporte táctil móvil (touch)
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStartX = e.touches[0].clientX - this.panX;
        this.dragStartY = e.touches[0].clientY - this.panY;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        this.panX = e.touches[0].clientX - this.dragStartX;
        this.panY = e.touches[0].clientY - this.dragStartY;
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  setPlanets(originId, destId) {
    this.originId = originId;
    this.destId = destId;
    this.shipProgress = 0;
    this.shipTrail = [];
  }

  setDistanceMode(mode) {
    this.distanceMode = mode;
    this.shipProgress = 0;
    this.shipTrail = [];
  }

  setShipSpeedFactor(speedKms) {
    // Escala la animación de la nave para que refleje visualmente la velocidad relativa
    if (speedKms < 1) {
      this.shipSpeedFactor = 0.0008;
    } else if (speedKms < 50) {
      this.shipSpeedFactor = 0.0025;
    } else if (speedKms < 500) {
      this.shipSpeedFactor = 0.006;
    } else if (speedKms < 30000) {
      this.shipSpeedFactor = 0.015;
    } else {
      this.shipSpeedFactor = 0.035; // FTL / Warp
    }
  }

  resetView() {
    this.targetZoom = 1.0;
    this.zoom = 1.0;
    this.panX = 0;
    this.panY = 0;
  }

  toggleLogScale() {
    this.useLogScale = !this.useLogScale;
    return this.useLogScale;
  }

  /**
   * Transforma distancia astronómica en radio de pantalla (píxeles)
   */
  getOrbitRadiusPx(body) {
    if (body.id === "proxima_centauri") {
      return 520 * this.zoom; // Representación en el borde exterior
    }

    const distAU = body.distSunAU || 1.0;
    if (this.useLogScale) {
      // Escala perceptual que hace visibles tanto a Mercurio como a Neptuno
      // Usamos escala logarítmica suave: base + log10(AU + 0.5) * factor
      const baseR = 40;
      return (baseR + Math.pow(distAU, 0.55) * 65) * this.zoom;
    } else {
      // Escala lineal de UA
      return (distAU * 28 + 25) * this.zoom;
    }
  }

  /**
   * Obtiene la posición cartesiana en pantalla de un cuerpo celeste en el frame actual
   */
  getBodyPosition(body) {
    if (body.id === "moon") {
      const earth = CELESTIAL_BODIES.find(b => b.id === "earth");
      const ep = this.getBodyPosition(earth);
      const moonAngle = this.simTime * 2.5;
      const moonDist = 20 * this.zoom;
      return {
        x: ep.x + Math.cos(moonAngle) * moonDist,
        y: ep.y + Math.sin(moonAngle) * moonDist
      };
    }

    if (body.id === "europa") {
      const jup = CELESTIAL_BODIES.find(b => b.id === "jupiter");
      const jp = this.getBodyPosition(jup);
      const euAngle = this.simTime * 3.0;
      const euDist = 22 * this.zoom;
      return {
        x: jp.x + Math.cos(euAngle) * euDist,
        y: jp.y + Math.sin(euAngle) * euDist
      };
    }

    if (body.id === "titan") {
      const sat = CELESTIAL_BODIES.find(b => b.id === "saturn");
      const sp = this.getBodyPosition(sat);
      const tiAngle = this.simTime * 2.2;
      const tiDist = 24 * this.zoom;
      return {
        x: sp.x + Math.cos(tiAngle) * tiDist,
        y: sp.y + Math.sin(tiAngle) * tiDist
      };
    }

    if (body.id === "proxima_centauri") {
      // Ángulo fijo en la esquina del cuadrante para representar la estrella exterior
      const angle = -0.55;
      const r = this.getOrbitRadiusPx(body);
      return {
        x: this.centerX + this.panX + Math.cos(angle) * r,
        y: this.centerY + this.panY + Math.sin(angle) * r
      };
    }

    const r = this.getOrbitRadiusPx(body);
    // Periodo orbital: T proporcional a a^(3/2) (Tercera Ley de Kepler)
    const orbitalSpeed = body.orbitalPeriodDays
      ? (100 / Math.sqrt(Math.pow(body.distSunAU || 1, 3))) * 0.002
      : 0.002;

    const angle = this.simTime * orbitalSpeed + (body.distSunAU * 1.7);

    return {
      x: this.centerX + this.panX + Math.cos(angle) * r,
      y: this.centerY + this.panY + Math.sin(angle) * r,
      angle,
      orbitRadius: r
    };
  }

  checkHover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hit = this.getPlanetAtPosition(mouseX, mouseY);
    if (hit !== this.hoveredPlanet) {
      this.hoveredPlanet = hit;
      this.canvas.style.cursor = hit ? 'pointer' : (this.isDragging ? 'grabbing' : 'default');
    }
  }

  getPlanetAtPosition(x, y) {
    for (const body of CELESTIAL_BODIES) {
      const pos = this.getBodyPosition(body);
      const radius = Math.max(14, (body.diameterKm ? Math.min(18, Math.log10(body.diameterKm) * 3.5) : 10) * this.zoom);
      const dx = x - pos.x;
      const dy = y - pos.y;
      if (Math.sqrt(dx * dx + dy * dy) <= radius) {
        return body;
      }
    }
    return null;
  }

  setTimeScale(scale) {
    this.timeScale = parseFloat(scale);
    this.isPaused = this.timeScale === 0;
  }

  update() {
    // Transición suave del zoom
    this.zoom += (this.targetZoom - this.zoom) * 0.1;

    if (!this.isPaused && this.timeScale > 0) {
      // Base calibrada para un movimiento orbital más natural y pausado
      this.simTime += 0.25 * this.timeScale;
    }

    // Progreso de la nave espacial (también afectado suavemente por la escala de tiempo si no está pausada)
    if (!this.isPaused && this.timeScale > 0) {
      this.shipProgress += this.shipSpeedFactor * Math.max(0.2, Math.min(2.5, this.timeScale));
      if (this.shipProgress > 1.0) {
        this.shipProgress = 0;
        this.shipTrail = [];
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const sunX = this.centerX + this.panX;
    const sunY = this.centerY + this.panY;

    // 1. Dibujar el Sol con resplandor coronal
    this.drawSun(sunX, sunY);

    // 2. Dibujar órbitas elípticas/circulares
    for (const body of CELESTIAL_BODIES) {
      if (body.category === "luna" || body.id === "proxima_centauri") continue;
      const r = this.getOrbitRadiusPx(body);

      this.ctx.beginPath();
      this.ctx.arc(sunX, sunY, r, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 6]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    // 3. Dibujar trayectoria entre Origen y Destino
    const originBody = CELESTIAL_BODIES.find(b => b.id === this.originId);
    const destBody = CELESTIAL_BODIES.find(b => b.id === this.destId);

    if (originBody && destBody && originBody.id !== destBody.id) {
      const p1 = this.getBodyPosition(originBody);
      const p2 = this.getBodyPosition(destBody);

      this.drawTrajectory(p1, p2, sunX, sunY);
    }

    // 4. Dibujar cuerpos celestes
    for (const body of CELESTIAL_BODIES) {
      this.drawBody(body, sunX, sunY);
    }

    // 5. Tooltip en hover
    if (this.hoveredPlanet) {
      this.drawTooltip(this.hoveredPlanet);
    }
  }

  drawSun(x, y) {
    const sunRadius = Math.max(14, 20 * this.zoom);

    // Resplandor externo
    const glow = this.ctx.createRadialGradient(x, y, sunRadius * 0.2, x, y, sunRadius * 2.8);
    glow.addColorStop(0, "rgba(251, 191, 36, 0.95)");
    glow.addColorStop(0.3, "rgba(245, 158, 11, 0.45)");
    glow.addColorStop(0.7, "rgba(234, 88, 12, 0.15)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");

    this.ctx.fillStyle = glow;
    this.ctx.beginPath();
    this.ctx.arc(x, y, sunRadius * 2.8, 0, Math.PI * 2);
    this.ctx.fill();

    // Núcleo del Sol
    const core = this.ctx.createRadialGradient(x - 3, y - 3, 0, x, y, sunRadius);
    core.addColorStop(0, "#ffffff");
    core.addColorStop(0.2, "#fef08a");
    core.addColorStop(0.6, "#f59e0b");
    core.addColorStop(1, "#b45309");

    this.ctx.fillStyle = core;
    this.ctx.beginPath();
    this.ctx.arc(x, y, sunRadius, 0, Math.PI * 2);
    this.ctx.fill();

    // Etiqueta Sol
    this.ctx.fillStyle = "#fef08a";
    this.ctx.font = "10px Inter, sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Sol", x, y + sunRadius + 14);
  }

  drawTrajectory(p1, p2, sunX, sunY) {
    this.ctx.save();

    let shipPos = { x: p1.x, y: p1.y };

    if (this.distanceMode === "hohmannKm") {
      // Trayectoria curvada de transferencia elíptica
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      // Desplazamiento respecto al Sol para curvar la órbita de Hohmann
      const dxSun = midX - sunX;
      const dySun = midY - sunY;
      const curveX = midX + dxSun * 0.45;
      const curveY = midY + dySun * 0.45;

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.quadraticCurveTo(curveX, curveY, p2.x, p2.y);
      this.ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
      this.ctx.lineWidth = 2.5;
      this.ctx.setLineDash([6, 6]);
      this.ctx.stroke();

      // Posición de la nave en curva cuadrática de Bézier
      const t = this.shipProgress;
      const u = 1 - t;
      shipPos.x = u * u * p1.x + 2 * u * t * curveX + t * t * p2.x;
      shipPos.y = u * u * p1.y + 2 * u * t * curveY + t * t * p2.y;
    } else {
      // Trayectoria directa (Línea recta de crucero de alta velocidad / FTL)
      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([5, 5]);
      this.ctx.stroke();

      // Posición lineal
      shipPos.x = p1.x + (p2.x - p1.x) * this.shipProgress;
      shipPos.y = p1.y + (p2.y - p1.y) * this.shipProgress;
    }

    this.ctx.setLineDash([]);

    // Guardar estela de partículas de la nave
    this.shipTrail.push({ ...shipPos, age: 0 });
    if (this.shipTrail.length > 25) {
      this.shipTrail.shift();
    }

    // Dibujar estela brillante
    for (let i = 0; i < this.shipTrail.length; i++) {
      const pt = this.shipTrail[i];
      const alpha = (i / this.shipTrail.length) * 0.8;
      const r = Math.max(1, (i / this.shipTrail.length) * 3);
      this.ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Dibujar nave espacial
    this.drawSpacecraft(shipPos.x, shipPos.y, p1, p2);

    this.ctx.restore();
  }

  drawSpacecraft(x, y, p1, p2) {
    // Ángulo hacia el destino
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);

    // Resplandor de propulsión
    this.ctx.fillStyle = "#38bdf8";
    this.ctx.shadowColor = "#38bdf8";
    this.ctx.shadowBlur = 10;

    // Silueta de nave espacial elegante
    this.ctx.beginPath();
    this.ctx.moveTo(8, 0); // Proa
    this.ctx.lineTo(-6, -5); // Ala superior
    this.ctx.lineTo(-3, 0); // Popa
    this.ctx.lineTo(-6, 5); // Ala inferior
    this.ctx.closePath();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fill();

    // Llama del propulsor
    this.ctx.beginPath();
    this.ctx.moveTo(-3, 0);
    this.ctx.lineTo(-9 - Math.random() * 4, 0);
    this.ctx.strokeStyle = "#00f0ff";
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawBody(body, sunX, sunY) {
    const pos = this.getBodyPosition(body);
    const isOrigin = body.id === this.originId;
    const isDest = body.id === this.destId;
    const isHovered = this.hoveredPlanet && this.hoveredPlanet.id === body.id;

    const baseSize = body.diameterKm
      ? Math.max(4, Math.min(16, Math.log10(body.diameterKm) * 2.8))
      : 6;
    const radius = Math.max(3.5, baseSize * Math.pow(this.zoom, 0.7));

    // Si es Saturno, dibujar anillos primero
    if (body.hasRings) {
      this.ctx.save();
      this.ctx.translate(pos.x, pos.y);
      this.ctx.rotate(0.35);
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, radius * 2.4, radius * 0.7, 0, 0, Math.PI * 2);
      this.ctx.strokeStyle = "rgba(253, 224, 71, 0.45)";
      this.ctx.lineWidth = 3 * this.zoom;
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Dibujar el orbe del planeta
    const grad = this.ctx.createRadialGradient(
      pos.x - radius * 0.3,
      pos.y - radius * 0.3,
      0,
      pos.x,
      pos.y,
      radius
    );
    grad.addColorStop(0, body.accentColor || "#fff");
    grad.addColorStop(0.7, body.color || "#888");
    grad.addColorStop(1, "#0f172a");

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Retícula y halo para Origen (Cian)
    if (isOrigin) {
      this.ctx.save();
      this.ctx.strokeStyle = "#00f0ff";
      this.ctx.lineWidth = 2;
      this.ctx.shadowColor = "#00f0ff";
      this.ctx.shadowBlur = 12;

      // Anillo exterior
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, radius + 8, 0, Math.PI * 2);
      this.ctx.stroke();

      // Indicador
      this.ctx.fillStyle = "#00f0ff";
      this.ctx.font = "bold 10px Inter, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("🛫 ORIGEN", pos.x, pos.y - radius - 12);
      this.ctx.restore();
    }

    // Retícula y halo para Destino (Magenta / Dorado)
    if (isDest) {
      this.ctx.save();
      this.ctx.strokeStyle = "#f43f5e";
      this.ctx.lineWidth = 2;
      this.ctx.shadowColor = "#f43f5e";
      this.ctx.shadowBlur = 12;

      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, radius + 8, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.fillStyle = "#f43f5e";
      this.ctx.font = "bold 10px Inter, sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillText("🎯 DESTINO", pos.x, pos.y - radius - 12);
      this.ctx.restore();
    }

    // Nombre del planeta
    this.ctx.fillStyle = isHovered ? "#38bdf8" : "#cbd5e1";
    this.ctx.font = `${Math.max(9, 11 * Math.min(1.2, this.zoom))}px Inter, sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(body.name, pos.x, pos.y + radius + 13);
  }

  drawTooltip(body) {
    const pos = this.getBodyPosition(body);
    const text1 = `${body.name} (${body.tag})`;
    const distText = body.distSunAU
      ? `${body.distSunAU} UA del Sol (${(body.distSunKm / 1e6).toFixed(1)} M km)`
      : `${body.distFromEarthKm ? (body.distFromEarthKm / 1e3).toFixed(0) + ' mil km' : ''}`;

    this.ctx.save();
    this.ctx.font = "bold 11px Inter, sans-serif";
    const width1 = this.ctx.measureText(text1).width;
    this.ctx.font = "10px Inter, sans-serif";
    const width2 = this.ctx.measureText(distText).width;
    const boxW = Math.max(width1, width2) + 24;
    const boxH = 46;

    let boxX = pos.x + 15;
    let boxY = pos.y - 25;
    if (boxX + boxW > this.width) boxX = pos.x - boxW - 15;
    if (boxY < 10) boxY = 10;

    // Caja con efecto glassmorphism
    this.ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    this.ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    this.ctx.fill();
    this.ctx.stroke();

    // Texto
    this.ctx.fillStyle = "#f8fafc";
    this.ctx.font = "bold 11px Inter, sans-serif";
    this.ctx.textAlign = "left";
    this.ctx.fillText(text1, boxX + 12, boxY + 18);

    this.ctx.fillStyle = "#94a3b8";
    this.ctx.font = "10px Inter, sans-serif";
    this.ctx.fillText(distText, boxX + 12, boxY + 34);

    this.ctx.restore();
  }

  animate() {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
