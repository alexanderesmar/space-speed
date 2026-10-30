/**
 * Mecánica Orbital y Geometría Interplanetaria
 * Cálculos astronómicos de distancias entre cuerpos celestes.
 */

import { AU_IN_KM, SPEED_OF_LIGHT_KMS } from '../data/celestialBodies.js';

// Parámetro gravitacional estándar del Sol (mu = G * M_sun) en km³/s²
export const MU_SUN = 1.32712440018e11;

/**
 * Calcula la distancia elíptica media entre dos órbitas circulares
 * usando integración numérica del promedio cuadrático de la distancia relativa.
 */
function calculateAverageOrbitalDistance(r1, r2) {
  // Integral sobre el ángulo de separación theta de 0 a 2pi: sqrt(r1^2 + r2^2 - 2*r1*r2*cos(theta))
  const steps = 360;
  let totalDist = 0;
  for (let i = 0; i < steps; i++) {
    const theta = (i * 2 * Math.PI) / steps;
    const d = Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(theta));
    totalDist += d;
  }
  return totalDist / steps;
}

/**
 * Aproximación de Ramanujan para el perímetro de una elipse
 */
function ellipseHalfPerimeter(a, b) {
  const h = Math.pow((a - b) / (a + b), 2);
  const p = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  return p / 2; // Media órbita (de perihelio a afelio)
}

/**
 * Calcula las distancias en diferentes configuraciones orbitales
 * entre dos cuerpos celestes.
 */
export function calculateDistances(origin, destination) {
  if (origin.id === destination.id) {
    return {
      minKm: 0,
      avgKm: 0,
      maxKm: 0,
      hohmannKm: 0,
      hohmannRealDays: 0,
      type: "same_body"
    };
  }

  // Caso 1: La Tierra y la Luna
  if (
    (origin.id === "earth" && destination.id === "moon") ||
    (origin.id === "moon" && destination.id === "earth")
  ) {
    const perigee = 363300;
    const apogee = 405500;
    const avg = 384400;
    return {
      minKm: perigee,
      avgKm: avg,
      maxKm: apogee,
      hohmannKm: avg * 1.15,
      hohmannRealDays: 3.0,
      type: "moon_earth",
      note: "Órbita translunar directa"
    };
  }

  // Caso 2: Júpiter y Europa
  if (
    (origin.id === "jupiter" && destination.id === "europa") ||
    (origin.id === "europa" && destination.id === "jupiter")
  ) {
    const d = 670900;
    return {
      minKm: d * 0.99,
      avgKm: d,
      maxKm: d * 1.01,
      hohmannKm: d * 1.2,
      hohmannRealDays: 1.5,
      type: "moon_jupiter"
    };
  }

  // Caso 3: Saturno y Titán
  if (
    (origin.id === "saturn" && destination.id === "titan") ||
    (origin.id === "titan" && destination.id === "saturn")
  ) {
    const d = 1221870;
    return {
      minKm: d * 0.98,
      avgKm: d,
      maxKm: d * 1.02,
      hohmannKm: d * 1.25,
      hohmannRealDays: 3.5,
      type: "moon_saturn"
    };
  }

  // Caso 4: Interés Interestelar (Próxima Centauri)
  if (origin.id === "proxima_centauri" || destination.id === "proxima_centauri") {
    const targetDist = 40208000000000; // ~4.2465 años-luz
    return {
      minKm: targetDist,
      avgKm: targetDist,
      maxKm: targetDist,
      hohmannKm: targetDist,
      hohmannRealDays: null,
      type: "interstellar",
      note: "Viaje interestelar directo fuera del Sistema Solar"
    };
  }

  // Caso 5: Luna a otro planeta (ej. Luna a Marte): se toma la distancia desde el planeta anfitrión
  const r1 = origin.distSunKm || 149597871;
  const r2 = destination.distSunKm || 149597871;

  const peri1 = origin.perihelionKm || r1;
  const ap1 = origin.aphelionKm || r1;
  const peri2 = destination.perihelionKm || r2;
  const ap2 = destination.aphelionKm || r2;

  // Distancia mínima (oposición / perihelio más cercano):
  // Ocurre cuando ambos planetas están en el mismo rayo desde el Sol
  const minKm = Math.abs(peri1 - ap2) < Math.abs(ap1 - peri2)
    ? Math.abs(peri1 - ap2)
    : Math.abs(ap1 - peri2);

  // Distancia máxima (conjunción / lados opuestos del Sol):
  const maxKm = ap1 + ap2;

  // Distancia media realista en el tiempo
  const avgKm = calculateAverageOrbitalDistance(r1, r2);

  // Órbita de Transferencia de Hohmann:
  // Eje mayor de la elipse de transferencia: 2a = r1 + r2  =>  a = (r1 + r2) / 2
  const aTransfer = (r1 + r2) / 2;
  // Semieje menor: b = sqrt(r1 * r2)
  const bTransfer = Math.sqrt(r1 * r2);
  // Longitud de la media elipse que recorre la nave
  const hohmannKm = ellipseHalfPerimeter(aTransfer, bTransfer);

  // Tiempo teórico de Hohmann clásico en días (usando la Tercera Ley de Kepler con mu del Sol):
  // T = pi * sqrt(a^3 / mu) segundos
  const hohmannSeconds = Math.PI * Math.sqrt(Math.pow(aTransfer, 3) / MU_SUN);
  const hohmannRealDays = hohmannSeconds / 86400;

  return {
    minKm: Math.round(minKm),
    avgKm: Math.round(avgKm),
    maxKm: Math.round(maxKm),
    hohmannKm: Math.round(hohmannKm),
    hohmannRealDays: Math.round(hohmannRealDays),
    type: "heliocentric"
  };
}
