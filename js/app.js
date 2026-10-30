/**
 * Punto de Entrada Principal de la Aplicación
 */

import { Starfield } from './canvas/starfield.js';
import { OrbitVisualizer } from './canvas/orbitVisualizer.js';
import { ComparisonRace } from './ui/comparisonRace.js';
import { Encyclopedia } from './ui/encyclopedia.js';
import { UIController } from './ui/uiController.js';
import { soundFX } from './audio/soundEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Canvas de Fondo Estelar
  const starfieldCanvas = document.getElementById('starfieldCanvas');
  const starfield = new Starfield(starfieldCanvas);
  starfield.animate();

  // 2. Inicializar Enciclopedia Modal
  const encyclopediaModal = document.getElementById('encyclopediaModal');
  const encyclopedia = new Encyclopedia(encyclopediaModal);

  // 3. Inicializar Simulador de Carreras
  const raceContainer = document.getElementById('raceContainer');
  const comparisonRace = new ComparisonRace(raceContainer);

  // 4. Inicializar Visualizador Orbital del Sistema Solar
  const orbitCanvas = document.getElementById('orbitCanvas');
  let uiControllerRef = null;

  const orbitViz = new OrbitVisualizer(orbitCanvas, (clickedPlanetId) => {
    // Al hacer clic en un planeta en el lienzo del sistema solar
    soundFX.playPlanetSelect();
    if (uiControllerRef) {
      if (uiControllerRef.originId === clickedPlanetId) {
        // Ya es origen, nada que hacer
        return;
      }
      // Si no es el origen, asignarlo como destino
      uiControllerRef.destId = clickedPlanetId;
      uiControllerRef.selectDest.value = clickedPlanetId;
      uiControllerRef.updateAll();
    }
  });
  orbitViz.animate();

  // 5. Inicializar Controlador Central de Interfaz
  uiControllerRef = new UIController({
    orbitViz,
    starfield,
    comparisonRace,
    encyclopedia
  });

  // Habilitar audio con la primera interacción del usuario (política de navegadores)
  const enableAudioOnInteraction = () => {
    soundFX.init();
    window.removeEventListener('click', enableAudioOnInteraction);
    window.removeEventListener('keydown', enableAudioOnInteraction);
  };
  window.addEventListener('click', enableAudioOnInteraction, { once: true });
  window.addEventListener('keydown', enableAudioOnInteraction, { once: true });

  console.log("🚀 Calculadora Espacial Educativa inicializada con éxito.");
});
