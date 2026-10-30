/**
 * Relatividad Especial, Dilatación Temporal y Formato de Tiempo
 */

import { SPEED_OF_LIGHT_KMS } from '../data/celestialBodies.js';

/**
 * Calcula el factor de Lorentz (gamma) para una velocidad v (km/s)
 * gamma = 1 / sqrt(1 - (v/c)^2)
 */
export function calculateLorentzFactor(speedKms) {
  if (speedKms <= 0) return 1.0;
  if (speedKms >= SPEED_OF_LIGHT_KMS) {
    return Infinity;
  }
  const beta = speedKms / SPEED_OF_LIGHT_KMS;
  return 1 / Math.sqrt(1 - beta * beta);
}

/**
 * Convierte un número de segundos en un objeto detallado y texto legible en español.
 */
export function formatDurationDetailed(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) {
    return { text: "No aplicable", shortText: "N/A", seconds: 0 };
  }

  if (seconds <= 0) {
    return { text: "Instantáneo (0 segundos)", shortText: "0 s", seconds: 0 };
  }

  // Menor a un segundo
  if (seconds < 1) {
    const ms = Math.round(seconds * 1000);
    if (ms < 1) {
      const us = Math.round(seconds * 1000000);
      return { text: `${us} microsegundos`, shortText: `${us} µs`, seconds };
    }
    return { text: `${ms} milisegundos`, shortText: `${ms} ms`, seconds };
  }

  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 3600;
  const SECONDS_PER_DAY = 86400;
  const SECONDS_PER_MONTH = 86400 * 30.4375; // Mes promedio
  const SECONDS_PER_YEAR = 86400 * 365.25; // Año juliano

  // Casos gigantescos (más de 1,000 años)
  if (seconds > SECONDS_PER_YEAR * 1000) {
    const years = seconds / SECONDS_PER_YEAR;
    if (years >= 1000000) {
      const millions = (years / 1000000).toLocaleString('es-ES', { maximumFractionDigits: 2 });
      return { text: `${millions} millones de años`, shortText: `${millions} M años`, seconds, years };
    }
    const formattedYears = Math.round(years).toLocaleString('es-ES');
    return { text: `${formattedYears} años`, shortText: `${formattedYears} a`, seconds, years };
  }

  // Años
  let rem = seconds;
  const years = Math.floor(rem / SECONDS_PER_YEAR);
  rem %= SECONDS_PER_YEAR;

  const months = Math.floor(rem / SECONDS_PER_MONTH);
  rem %= SECONDS_PER_MONTH;

  const days = Math.floor(rem / SECONDS_PER_DAY);
  rem %= SECONDS_PER_DAY;

  const hours = Math.floor(rem / SECONDS_PER_HOUR);
  rem %= SECONDS_PER_HOUR;

  const minutes = Math.floor(rem / SECONDS_PER_MINUTE);
  const secs = Math.floor(rem % SECONDS_PER_MINUTE);

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  if (days > 0 && years < 10) parts.push(`${days} ${days === 1 ? 'día' : 'días'}`);
  if (hours > 0 && years === 0) parts.push(`${hours} h`);
  if (minutes > 0 && years === 0 && months === 0) parts.push(`${minutes} min`);
  if (secs > 0 && years === 0 && months === 0 && days === 0) parts.push(`${secs} s`);

  if (parts.length === 0) {
    parts.push(`${(seconds).toFixed(2)} s`);
  }

  // Texto resumido para tarjetas pequeñas
  let shortText = "";
  if (years > 0) {
    shortText = `${years} a ${months} m`;
  } else if (months > 0) {
    shortText = `${months} m ${days} d`;
  } else if (days > 0) {
    shortText = `${days} d ${hours} h`;
  } else if (hours > 0) {
    shortText = `${hours} h ${minutes} m`;
  } else if (minutes > 0) {
    shortText = `${minutes} m ${secs} s`;
  } else {
    shortText = `${seconds.toFixed(1)} s`;
  }

  return {
    text: parts.slice(0, 3).join(', '),
    fullText: parts.join(', '),
    shortText,
    seconds,
    years: seconds / SECONDS_PER_YEAR
  };
}

/**
 * Genera comparativas educativas a escala humana
 */
export function generateHumanComparisons(seconds) {
  const years = seconds / (86400 * 365.25);
  const days = seconds / 86400;
  const hours = seconds / 3600;

  const comparisons = [];

  // 1. Vidas humanas (esperanza de vida ~80 años)
  if (years >= 1) {
    const lifespans = years / 80;
    if (lifespans >= 1) {
      comparisons.push({
        icon: "🧬",
        label: "Vidas humanas consecutivas",
        value: `${Math.round(lifespans).toLocaleString('es-ES')} vidas completas de 80 años`
      });
    } else {
      const pct = (lifespans * 100).toFixed(1);
      comparisons.push({
        icon: "🧬",
        label: "Porcentaje de vida humana",
        value: `${pct}% de una vida promedio de 80 años`
      });
    }
  }

  // 2. Generaciones humanas (25 años por generación)
  if (years >= 25) {
    const gens = Math.round(years / 25);
    comparisons.push({
      icon: "👥",
      label: "Generaciones humanas",
      value: `${gens.toLocaleString('es-ES')} generaciones familiares completas`
    });
  }

  // 3. Canciones de música (media de 3.5 minutos = 210 s)
  if (seconds < 86400 * 30 && seconds >= 210) {
    const songs = Math.round(seconds / 210);
    comparisons.push({
      icon: "🎵",
      label: "Canciones en streaming",
      value: `Podrías escuchar unas ${songs.toLocaleString('es-ES')} canciones completas`
    });
  }

  // 4. Copas del Mundo de Fútbol o Juegos Olímpicos (cada 4 años)
  if (years >= 4 && years <= 400) {
    const cups = Math.floor(years / 4);
    comparisons.push({
      icon: "🏆",
      label: "Copas Mundiales de Fútbol",
      value: `Pasarían ${cups.toLocaleString('es-ES')} mundiales mientras viajas`
    });
  }

  // 5. Comparativa histórica arqueológica
  if (years > 4500) {
    comparisons.push({
      icon: "🏛️",
      label: "Escala Histórica",
      value: "Más tiempo que toda la historia humana desde la construcción de las Pirámides de Guiza"
    });
  } else if (years > 2000) {
    comparisons.push({
      icon: "🏛️",
      label: "Escala Histórica",
      value: "Más tiempo que el transcurrido desde el apogeo del Imperio Romano"
    });
  }

  // 6. Si el tiempo es ultra corto (segundos o minutos)
  if (seconds < 60) {
    comparisons.push({
      icon: "⚡",
      label: "Reflejo Instantáneo",
      value: "Más rápido de lo que tardas en atarte los cordones de los zapatos"
    });
  } else if (seconds < 3600) {
    comparisons.push({
      icon: "☕",
      label: "Pausa Cotidiana",
      value: "Lo que tardas en tomarte un café y leer las noticias de la mañana"
    });
  }

  return comparisons;
}

/**
 * Calcula el viaje espacial completo con o sin relatividad
 */
export function calculateSpaceTrip({
  origin,
  destination,
  propulsion,
  customSpeedKms = null,
  distanceMode = "avgKm", // "minKm", "avgKm", "maxKm", "hohmannKm"
  distancesObj
}) {
  const speed = customSpeedKms !== null ? customSpeedKms : propulsion.speedKms;
  const distanceKm = distancesObj[distanceMode] ?? distancesObj.avgKm;

  if (distanceKm === 0 || speed <= 0) {
    return {
      distanceKm: 0,
      speedKms: speed,
      timeEarthSeconds: 0,
      timeCrewSeconds: 0,
      earthDuration: formatDurationDetailed(0),
      crewDuration: formatDurationDetailed(0),
      lorentzFactor: 1,
      timeDilationPct: 0,
      isRelativistic: false,
      isWarp: false,
      comparisons: []
    };
  }

  // Tiempo en marco de referencia terrestre (observador externo)
  const timeEarthSeconds = distanceKm / speed;

  // Manejo de Relatividad Especial o Motores FTL / Warp
  let lorentzFactor = 1;
  let timeCrewSeconds = timeEarthSeconds;
  let isRelativisticActive = false;
  let timeDilationPct = 0;

  if (propulsion.isWarp) {
    // El motor Warp Alcubierre dobla el espacio exterior; localmente el tiempo del tripulante = tiempo terrestre
    lorentzFactor = 1;
    timeCrewSeconds = timeEarthSeconds;
  } else if (speed >= SPEED_OF_LIGHT_KMS) {
    // Si viaja a la velocidad exacta de la luz:
    lorentzFactor = Infinity;
    timeCrewSeconds = 0; // Para el fotón o pasajero en c, el tiempo propio se detiene
    isRelativisticActive = true;
    timeDilationPct = 100;
  } else if (speed > 1000) {
    // A partir de velocidades apreciables respecto a c
    lorentzFactor = calculateLorentzFactor(speed);
    if (lorentzFactor > 1.0001) {
      isRelativisticActive = true;
      timeCrewSeconds = timeEarthSeconds / lorentzFactor;
      timeDilationPct = ((1 - 1 / lorentzFactor) * 100);
    }
  }

  return {
    distanceKm,
    speedKms: speed,
    timeEarthSeconds,
    timeCrewSeconds,
    earthDuration: formatDurationDetailed(timeEarthSeconds),
    crewDuration: formatDurationDetailed(timeCrewSeconds),
    lorentzFactor,
    timeDilationPct: timeDilationPct.toFixed(2),
    isRelativistic: isRelativisticActive,
    isWarp: propulsion.isWarp || false,
    comparisons: generateHumanComparisons(timeEarthSeconds)
  };
}
