/**
 * Enciclopedia Interactiva del Espacio y Fichas Didácticas
 */

import { EDUCATIONAL_TOPICS } from '../data/educationalFacts.js';
import { CELESTIAL_BODIES, CELESTIAL_LOOKUP } from '../data/celestialBodies.js';
import { PROPULSION_SYSTEMS, PROPULSION_LOOKUP } from '../data/propulsionSystems.js';
import { soundFX } from '../audio/soundEffects.js';

export class Encyclopedia {
  constructor(modalEl) {
    this.modalEl = modalEl;
    this.activeTab = "topics"; // "topics", "bodies", "propulsion"
    this.activeTopicId = EDUCATIONAL_TOPICS[0].id;
    this.activeBodyId = "earth";
    this.activePropId = "apollo11";

    this.bindGlobalTriggers();
  }

  bindGlobalTriggers() {
    // Escucha clics para cerrar el modal
    this.modalEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop') || e.target.classList.contains('btn-close-modal')) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modalEl.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open(tab = "topics", itemId = null) {
    this.activeTab = tab;
    if (itemId) {
      if (tab === "topics") this.activeTopicId = itemId;
      if (tab === "bodies") this.activeBodyId = itemId;
      if (tab === "propulsion") this.activePropId = itemId;
    }
    this.modalEl.classList.remove('hidden');
    soundFX.playClick();
    this.render();
  }

  close() {
    this.modalEl.classList.add('hidden');
    soundFX.playClick();
  }

  render() {
    this.modalEl.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-window">
          <div class="modal-header">
            <div class="modal-title">
              <span class="modal-icon">📚</span>
              <h2>Enciclopedia del Viajero Cósmico</h2>
            </div>
            <div class="modal-tabs">
              <button class="tab-btn ${this.activeTab === 'topics' ? 'active' : ''}" data-tab="topics">
                🌌 Principios de Física
              </button>
              <button class="tab-btn ${this.activeTab === 'bodies' ? 'active' : ''}" data-tab="bodies">
                🪐 Cuerpos Celestes
              </button>
              <button class="tab-btn ${this.activeTab === 'propulsion' ? 'active' : ''}" data-tab="propulsion">
                🚀 Motores & Propulsión
              </button>
            </div>
            <button class="btn-close-modal" title="Cerrar modal">&times;</button>
          </div>

          <div class="modal-body">
            ${this.renderActiveTabContent()}
          </div>
        </div>
      </div>
    `;

    this.bindTabEvents();
  }

  renderActiveTabContent() {
    if (this.activeTab === "topics") {
      const activeTopic = EDUCATIONAL_TOPICS.find(t => t.id === this.activeTopicId) || EDUCATIONAL_TOPICS[0];
      return `
        <div class="encyclopedia-layout">
          <div class="encyclopedia-sidebar">
            ${EDUCATIONAL_TOPICS.map(topic => `
              <div class="topic-item ${topic.id === this.activeTopicId ? 'active' : ''}" data-topic-id="${topic.id}">
                <span class="topic-icon">${topic.icon}</span>
                <div class="topic-item-text">
                  <div class="topic-badge">${topic.badge}</div>
                  <div class="topic-name">${topic.title}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="encyclopedia-article">
            <div class="article-badge">${activeTopic.badge}</div>
            <h1 class="article-title">${activeTopic.icon} ${activeTopic.title}</h1>
            <div class="article-summary">${activeTopic.summary}</div>
            <div class="article-divider"></div>
            <div class="article-content">${activeTopic.content}</div>
          </div>
        </div>
      `;
    }

    if (this.activeTab === "bodies") {
      const body = CELESTIAL_LOOKUP[this.activeBodyId] || CELESTIAL_BODIES[2];
      return `
        <div class="encyclopedia-layout">
          <div class="encyclopedia-sidebar">
            ${CELESTIAL_BODIES.map(b => `
              <div class="topic-item ${b.id === this.activeBodyId ? 'active' : ''}" data-body-id="${b.id}">
                <span class="body-symbol" style="color: ${b.color}">${b.symbol}</span>
                <div class="topic-item-text">
                  <div class="topic-badge">${b.tag}</div>
                  <div class="topic-name">${b.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="encyclopedia-article">
            <div class="dossier-header" style="border-left: 4px solid ${body.color}">
              <div class="dossier-badge">${body.tag}</div>
              <h1 class="article-title">${body.name} <span class="dossier-symbol">${body.symbol}</span></h1>
              <p class="article-summary">${body.description}</p>
            </div>

            <div class="dossier-stats-grid">
              <div class="stat-card">
                <span class="stat-label">Distancia media al Sol</span>
                <span class="stat-value">${body.distSunAU ? `${body.distSunAU} UA` : 'N/A'}</span>
                <span class="stat-sub">${body.distSunKm ? (body.distSunKm / 1e6).toFixed(1) + ' millones de km' : ''}</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Diámetro ecuatorial</span>
                <span class="stat-value">${body.diameterKm.toLocaleString('es-ES')} km</span>
                <span class="stat-sub">${(body.diameterKm / 12742).toFixed(2)}x el tamaño de la Tierra</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Gravedad superficial</span>
                <span class="stat-value">${body.gravity} m/s²</span>
                <span class="stat-sub">${(body.gravity / 9.807).toFixed(2)} g</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Periodo orbital (Año)</span>
                <span class="stat-value">${body.orbitalPeriodDays ? `${body.orbitalPeriodDays.toLocaleString('es-ES')} días` : 'N/A'}</span>
                <span class="stat-sub">${body.orbitalPeriodDays ? (body.orbitalPeriodDays / 365.25).toFixed(2) + ' años terrestres' : ''}</span>
              </div>
            </div>

            <h3 class="curiosities-title">💡 Curiosidades Asombrosas</h3>
            <ul class="curiosities-list">
              ${body.curiosities.map(c => `<li>${c}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    if (this.activeTab === "propulsion") {
      const prop = PROPULSION_LOOKUP[this.activePropId] || PROPULSION_SYSTEMS[2];
      return `
        <div class="encyclopedia-layout">
          <div class="encyclopedia-sidebar">
            ${PROPULSION_SYSTEMS.map(p => `
              <div class="topic-item ${p.id === this.activePropId ? 'active' : ''}" data-prop-id="${p.id}">
                <span class="topic-icon">${p.icon}</span>
                <div class="topic-item-text">
                  <div class="topic-badge">${p.badge}</div>
                  <div class="topic-name">${p.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="encyclopedia-article">
            <div class="dossier-header">
              <div class="dossier-badge">${prop.badge}</div>
              <h1 class="article-title">${prop.icon} ${prop.name}</h1>
              <p class="article-summary">${prop.description}</p>
            </div>

            <div class="dossier-stats-grid">
              <div class="stat-card">
                <span class="stat-label">Velocidad en km/s</span>
                <span class="stat-value">${prop.speedKms.toLocaleString('es-ES', { maximumFractionDigits: 2 })} km/s</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Velocidad en km/h</span>
                <span class="stat-value">${Math.round(prop.speedKmh).toLocaleString('es-ES')} km/h</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Fracción de la velocidad de la luz (c)</span>
                <span class="stat-value">${(prop.fractionOfC * 100).toFixed(prop.fractionOfC < 0.0001 ? 6 : 2)}% de c</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Tipo de propulsión</span>
                <span class="stat-value">${prop.techDetails}</span>
              </div>
            </div>

            <div class="pros-cons-box">
              <div class="pro-column">
                <h4>✅ Ventajas Principales</h4>
                <p>${prop.pros}</p>
              </div>
              <div class="con-column">
                <h4>⚠️ Limitaciones o Desafíos</h4>
                <p>${prop.cons}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return "";
  }

  bindTabEvents() {
    this.modalEl.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFX.playClick();
        this.activeTab = e.currentTarget.dataset.tab;
        this.render();
      });
    });

    this.modalEl.querySelectorAll('[data-topic-id]').forEach(item => {
      item.addEventListener('click', (e) => {
        soundFX.playClick();
        this.activeTopicId = e.currentTarget.dataset.topicId;
        this.render();
      });
    });

    this.modalEl.querySelectorAll('[data-body-id]').forEach(item => {
      item.addEventListener('click', (e) => {
        soundFX.playClick();
        this.activeBodyId = e.currentTarget.dataset.bodyId;
        this.render();
      });
    });

    this.modalEl.querySelectorAll('[data-prop-id]').forEach(item => {
      item.addEventListener('click', (e) => {
        soundFX.playClick();
        this.activePropId = e.currentTarget.dataset.propId;
        this.render();
      });
    });
  }
}
