/**
 * Catálogo de Sistemas de Propulsión y Velocidades
 * Velocidades normalizadas en kilómetros por segundo (km/s).
 */

import { SPEED_OF_LIGHT_KMS } from './celestialBodies.js';

export const PROPULSION_CATEGORIES = {
  reference: "Referencias Terrestres",
  current: "Tecnología Actual & Histórica",
  near_future: "Futuro Cercano & Teórico",
  scifi: "Ciencia Ficción & Relatividad",
  custom: "Personalizado"
};

export const PROPULSION_SYSTEMS = [
  // --- REFERENCIAS TERRESTRES ---
  {
    id: "walking",
    name: "Caminando a pie",
    category: "reference",
    type: "human",
    speedKms: 0.001389, // 5 km/h
    speedKmh: 5,
    fractionOfC: 0.001389 / SPEED_OF_LIGHT_KMS,
    icon: "🚶",
    badge: "5 km/h",
    description: "La velocidad de una caminata humana estándar de 5 km/h. Un recordatorio pedagógico de lo colosal que es el cosmos.",
    pros: "Cero combustible, saludable para el cuerpo.",
    cons: "Tardarías unos 9 años seguidos solo en caminar la distancia a la Luna.",
    techDetails: "Impulso metabólico biológico (~1.4 m/s).",
    isRelativistic: false
  },
  {
    id: "commercial_jet",
    name: "Avión Comercial (Jet 787)",
    category: "reference",
    type: "jet",
    speedKms: 0.25, // 900 km/h
    speedKmh: 900,
    fractionOfC: 0.25 / SPEED_OF_LIGHT_KMS,
    icon: "✈️",
    badge: "900 km/h (Mach 0.85)",
    description: "Velocidad de crucero típica de un avión comercial a reacción cruzando continentes y océanos.",
    pros: "Viaje cómodo con servicio a bordo y presurización.",
    cons: "Requiere atmósfera con oxígeno para la combustión; no puede volar en el vacío espacial.",
    techDetails: "Turbofanes de alto índice de derivación (Turbofan).",
    isRelativistic: false
  },

  // --- TECNOLOGÍA ACTUAL & HISTÓRICA ---
  {
    id: "apollo11",
    name: "Apolo 11 (Cohete Saturno V)",
    category: "current",
    type: "chemical",
    speedKms: 10.83, // ~39,000 km/h
    speedKmh: 39000,
    fractionOfC: 10.83 / SPEED_OF_LIGHT_KMS,
    icon: "🚀",
    badge: "10.8 km/s (39,000 km/h)",
    description: "Velocidad de inyección translunar (TLI) que llevó a Neil Armstrong, Buzz Aldrin y Michael Collins a la Luna en julio de 1969.",
    pros: "Tecnología probada, confiable y con capacidad para transportar tripulación humana.",
    cons: "Requiere una masa inmensa de propelente químico (95% del peso del cohete es solo combustible).",
    techDetails: "Combustión de Hidrógeno/Oxígeno líquido (LOX/LH2) y Queroseno RP-1. Impulso específico ~450 s.",
    isRelativistic: false
  },
  {
    id: "new_horizons",
    name: "Sonda New Horizons",
    category: "current",
    type: "chemical_boosted",
    speedKms: 16.26, // ~58,536 km/h
    speedKmh: 58536,
    fractionOfC: 16.26 / SPEED_OF_LIGHT_KMS,
    icon: "🛰️",
    badge: "16.3 km/s (58,500 km/h)",
    description: "La sonda espacial que alcanzó la mayor velocidad de escape directa de la Tierra en el momento de su lanzamiento en 2006, rumbo a Plutón.",
    pros: "Trayectoria de escape hiperbólica rápida y directa hacia el Sistema Solar exterior.",
    cons: "No tenía suficiente combustible para frenar y entrar en órbita; solo realizó un sobrevuelo fugaz.",
    techDetails: "Lanzador Atlas V 551 + etapa superior Star 48B de combustible sólido. Asistencia gravitacional de Júpiter.",
    isRelativistic: false
  },
  {
    id: "voyager1",
    name: "Sonda Voyager 1",
    category: "current",
    type: "gravity_assist",
    speedKms: 17.0, // ~61,200 km/h
    speedKmh: 61200,
    fractionOfC: 17.0 / SPEED_OF_LIGHT_KMS,
    icon: "📡",
    badge: "17.0 km/s (61,200 km/h)",
    description: "Lanzada en 1977, es el objeto humano más distante de la Tierra (a más de 24,000 millones de km), viajando por el espacio interestelar.",
    pros: "Lleva más de 45 años operando gracias a sus generadores termoeléctricos de radioisótopos (RTG).",
    cons: "Lenta para estándares interestelares: tardaría 75,000 años en llegar a la estrella más cercana.",
    techDetails: "Asistencias gravitacionales repetidas ('efecto tirachinas') aprovechando una alineación planetaria única.",
    isRelativistic: false
  },
  {
    id: "ion_drive",
    name: "Propulsión Iónica (Dawn / BepiColombo)",
    category: "current",
    type: "electric",
    speedKms: 40.0, // ~144,000 km/h
    speedKmh: 144000,
    fractionOfC: 40.0 / SPEED_OF_LIGHT_KMS,
    icon: "⚡",
    badge: "40 km/s (144,000 km/h)",
    description: "Acelera iones de gas xenón mediante campos electrostáticos. El empuje es tan suave como el peso de una hoja de papel, pero continuo durante meses.",
    pros: "Eficiencia de combustible 10 veces superior a los cohetes químicos (Isp hasta 4,000 s).",
    cons: "Aceleración inicial extremadamente baja; no puede despegar desde la superficie terrestre.",
    techDetails: "Propulsores de efecto Hall y rejillas electrostáticas alimentadas por paneles solares.",
    isRelativistic: false
  },
  {
    id: "parker_probe",
    name: "Parker Solar Probe (Récord Humano)",
    category: "current",
    type: "extreme_gravity",
    speedKms: 192.2, // ~692,000 km/h
    speedKmh: 692000,
    fractionOfC: 192.2 / SPEED_OF_LIGHT_KMS,
    icon: "☀️",
    badge: "192 km/s (692,000 km/h)",
    description: "La nave espacial más veloz jamás construida por la humanidad. Alcanza esta velocidad vertiginosa al 'caer' en el pozo gravitacional del Sol en su perihelio.",
    pros: "Velocidad récord histórica absoluta de fabricación humana.",
    cons: "Solo alcanza esta velocidad en caída libre extrema cerca del Sol, soportando temperaturas de 1,400°C.",
    techDetails: "Múltiples asistencias gravitatorias con Venus para reducir su perihelio a solo 6 millones de km del Sol.",
    isRelativistic: false
  },

  // --- FUTURO CERCANO & TEÓRICO ---
  {
    id: "nuclear_thermal",
    name: "Cohete Térmico Nuclear (NTR / DRACO)",
    category: "near_future",
    type: "nuclear",
    speedKms: 100.0, // ~360,000 km/h
    speedKmh: 360000,
    fractionOfC: 100.0 / SPEED_OF_LIGHT_KMS,
    icon: "⚛️",
    badge: "100 km/s (360,000 km/h)",
    description: "Un reactor de fisión nuclear calienta hidrógeno líquido a temperaturas extremas antes de expulsarlo por la tobera. Proyecto actual de NASA y DARPA.",
    pros: "Duplica la eficiencia del mejor cohete químico; reduce el viaje a Marte a la mitad (unos 3 meses).",
    cons: "Manejo de material radiactivo en órbita y regulaciones de seguridad complejas.",
    techDetails: "Reactor nuclear de uranio poco enriquecido de alto ensayo (HALEU). Impulso específico ~900 s.",
    isRelativistic: false
  },
  {
    id: "fusion_drive",
    name: "Propulsión por Fusión (Proyecto Daedalus)",
    category: "near_future",
    type: "fusion",
    speedKms: 36000.0, // 12% c = 36,000 km/s
    speedKmh: 129600000,
    fractionOfC: 0.12,
    icon: "🔥",
    badge: "0.12 c (36,000 km/s)",
    description: "Diseño de la Sociedad Interplanetaria Británica que utiliza microexplosiones de fusión de Deuterio y Helio-3 inducidas por láseres de alta potencia.",
    pros: "Permite viajes interplanetarios rápidos (Marte en días, Saturno en semanas) e interestelares en décadas.",
    cons: "Aún no dominamos la fusión nuclear controlada de confinamiento inercial para naves espaciales.",
    techDetails: "Fusión por confinamiento inercial de micro-perlas con tobera magnética. Isp ~1,000,000 s.",
    isRelativistic: true
  },
  {
    id: "solar_sail_laser",
    name: "Vela Láser (Breakthrough Starshot)",
    category: "near_future",
    type: "beamed_energy",
    speedKms: 59958.5, // 20% c = 0.2c
    speedKmh: 215850567,
    fractionOfC: 0.20,
    icon: "⛵",
    badge: "0.20 c (60,000 km/s)",
    description: "Nanonaves del tamaño de un microchip acopladas a una vela ultraligera y reflectante empujadas por un rayo láser terrestre de 100 gigavatios.",
    pros: "No lleva combustible a bordo (toda la energía se suministra desde la Tierra). Llega a Próxima Centauri en ~20 años.",
    cons: "Solo para cargas microscópicas (pocos gramos); casi imposible de desacelerar al llegar al destino.",
    techDetails: "Propulsión por presión de radiación de fotones mediante un array de láseres ópticos de fase.",
    isRelativistic: true
  },
  {
    id: "antimatter_rocket",
    name: "Cohete de Antimateria",
    category: "near_future",
    type: "antimatter",
    speedKms: 149896.2, // 50% c = 0.5c
    speedKmh: 539626424,
    fractionOfC: 0.50,
    icon: "💥",
    badge: "0.50 c (150,000 km/s)",
    description: "La aniquilación de materia y antimateria convierte el 100% de la masa en energía pura según E=mc², la máxima densidad energética conocida por la física.",
    pros: "El combustible más eficiente del universo; unas pocas decenas de miligramos bastarían para llegar a Marte.",
    cons: "Fabricar 1 gramo de antimateria costaría billones de dólares y requiere trampas magnéticas perfectas.",
    techDetails: "Aniquilación protón-antiprotón generando piones cargados canalizados por una tobera magnética.",
    isRelativistic: true
  },

  // --- CIENCIA FICCIÓN & RELATIVIDAD ---
  {
    id: "relativistic_sublight",
    name: "Impulso Sub-luz Relativista (0.90 c)",
    category: "scifi",
    type: "relativistic",
    speedKms: SPEED_OF_LIGHT_KMS * 0.90, // ~269,813 km/s
    speedKmh: SPEED_OF_LIGHT_KMS * 0.90 * 3600,
    fractionOfC: 0.90,
    icon: "💫",
    badge: "0.90 c (90% vel. luz)",
    description: "Viajando al 90% de la velocidad de la luz. A esta velocidad, la dilatación temporal de Einstein se vuelve muy notable: el tiempo para la tripulación transcurre a menos de la mitad del ritmo terrestre.",
    pros: "Cruza el Sistema Solar en pocas horas. Los astronautas envejecen 2.29 veces más lento (Factor de Lorentz γ ≈ 2.29).",
    cons: "Cualquier mota de polvo de un miligramo en el camino impacta con la energía de una bomba nuclear.",
    techDetails: "Efectos relativistas extremos: contracción de Lorentz, aberración de la luz y efecto Doppler relativista.",
    isRelativistic: true
  },
  {
    id: "light_speed",
    name: "Velocidad de la Luz (c)",
    category: "scifi",
    type: "cosmic_constant",
    speedKms: SPEED_OF_LIGHT_KMS, // 299,792.458 km/s
    speedKmh: SPEED_OF_LIGHT_KMS * 3600,
    fractionOfC: 1.0,
    icon: "🌟",
    badge: "1.0 c (300,000 km/s)",
    description: "El límite de velocidad universal de la causalidad y los fotones en el vacío ($c = 299,792.458$ km/s). Para un fotón, el tiempo propio es exactamente cero.",
    pros: "El límite absoluto al que viajan las ondas electromagnéticas, la gravedad y la información en el cosmos.",
    cons: "Para objetos con masa en reposo requeriría energía infinita alcanzarla.",
    techDetails: "Constante universal de Einstein. Tarda 1.28 s a la Luna, 8.3 min al Sol, 4.25 años a Próxima Centauri.",
    isRelativistic: true
  },
  {
    id: "warp_1",
    name: "Motor Warp Alcubierre (Factor 1 - 1c)",
    category: "scifi",
    type: "ftl",
    speedKms: SPEED_OF_LIGHT_KMS * 1.0,
    speedKmh: SPEED_OF_LIGHT_KMS * 1.0 * 3600,
    fractionOfC: 1.0,
    icon: "🌌",
    badge: "Warp 1 (1.0 c)",
    description: "Propuesta teórica del físico mexicano Miguel Alcubierre (1994): contrae el espacio-tiempo delante de la nave y lo expande detrás. La nave permanece en reposo dentro de una burbuja de curvatura.",
    pros: "Sin aceleración inercial destructiva para la tripulación ni dilatación temporal paradójica.",
    cons: "Requiere 'materia exótica' con densidad de energía negativa, cuya existencia aún no se ha comprobado.",
    techDetails: "Métrica geométrica de la relatividad general modificada con tensor de energía-impulso exótico.",
    isRelativistic: false, // Warp bypasses local relativity!
    isWarp: true
  },
  {
    id: "warp_5",
    name: "Motor Warp Alcubierre (Factor 5 - 125c)",
    category: "scifi",
    type: "ftl",
    speedKms: SPEED_OF_LIGHT_KMS * 125.0, // v = w^3 * c = 125 c
    speedKmh: SPEED_OF_LIGHT_KMS * 125.0 * 3600,
    fractionOfC: 125.0,
    icon: "🌀",
    badge: "Warp 5 (125 c)",
    description: "Velocidad de crucero estándar en la ciencia ficción como Star Trek (Enterprise NX-01). Viaja a 125 veces la velocidad de la luz.",
    pros: "Llega a Marte en menos de 2 segundos y a Próxima Centauri en solo 12 días.",
    cons: "Acumulación de radiación de Hawking en el horizonte de sucesos de la burbuja que podría vaporizar el destino al frenar.",
    techDetails: "Burbuja de curvatura superlumínica de orden cúbico (v = w³·c).",
    isRelativistic: false,
    isWarp: true
  },
  {
    id: "warp_9_9",
    name: "Motor Warp Translumínico (Warp 9.9 - 3,053c)",
    category: "scifi",
    type: "ftl",
    speedKms: SPEED_OF_LIGHT_KMS * 3053.0,
    speedKmh: SPEED_OF_LIGHT_KMS * 3053.0 * 3600,
    fractionOfC: 3053.0,
    icon: "⚡",
    badge: "Warp 9.9 (3,053 c)",
    description: "Velocidad de emergencia máxima de naves estelares avanzadas como la USS Voyager. Viaja a más de 3,000 veces la velocidad de la luz.",
    pros: "Cruza todo el Sistema Solar en una fracción imperceptible de segundo. Llega a Alfa Centauri en 12 horas.",
    cons: "Riesgo de fractura del subespacio e inmenso estrés estructural cuántico.",
    techDetails: "Propulsión de campo de curvatura de plasma de taquiones asimétrico.",
    isRelativistic: false,
    isWarp: true
  },
  {
    id: "hyperdrive",
    name: "Hiperespacio / Hyperdrive (Star Wars)",
    category: "scifi",
    type: "ftl_dimension",
    speedKms: SPEED_OF_LIGHT_KMS * 1000000.0, // 1,000,000 c
    speedKmh: SPEED_OF_LIGHT_KMS * 1000000.0 * 3600,
    fractionOfC: 1000000.0,
    icon: "✨",
    badge: "1,000,000 c",
    description: "Entra en una dimensión paralela donde las distancias espaciales son millones de veces menores, permitiendo cruzar la galaxia entera en días.",
    pros: "Viajes interestelares e intergalácticos casi instantáneos.",
    cons: "Requiere cálculos astrografícos precisos con el 'Navicomputer' para evitar chocar con pozos gravitatorios estelares.",
    techDetails: "Generador de hiperimpulso que abre una brecha dimensional entre el espacio real y el hiperespacio.",
    isRelativistic: false,
    isWarp: true
  }
];

export const PROPULSION_LOOKUP = Object.fromEntries(
  PROPULSION_SYSTEMS.map(sys => [sys.id, sys])
);
