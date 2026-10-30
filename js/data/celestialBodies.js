/**
 * Catálogo de Cuerpos Celestes del Sistema Solar y Objetos Clave
 * Distancias medias al Sol en Unidades Astronómicas (UA) y kilómetros (km).
 * 1 UA = 149,597,870.7 km
 */

export const AU_IN_KM = 149597870.7;
export const SPEED_OF_LIGHT_KMS = 299792.458; // km/s

export const CELESTIAL_BODIES = [
  {
    id: "mercury",
    name: "Mercurio",
    category: "planeta",
    tag: "Planeta Rocoso",
    distSunAU: 0.387,
    distSunKm: 57909050,
    perihelionKm: 46001200,
    aphelionKm: 69816900,
    orbitalPeriodDays: 87.97,
    diameterKm: 4879,
    gravity: 3.7, // m/s²
    color: "#a8a29e",
    accentColor: "#e2e8f0",
    gradient: "radial-gradient(circle at 35% 35%, #cbd5e1, #64748b 60%, #1e293b 95%)",
    description: "El planeta más pequeño del Sistema Solar y el más cercano al Sol. Tiene variaciones extremas de temperatura entre el día (430°C) y la noche (-180°C).",
    curiosities: [
      "Un año en Mercurio dura solo 88 días terrestres, pero un solo día solar dura 176 días terrestres.",
      "A pesar de estar más cerca del Sol, Venus es más caliente debido a su efecto invernadero.",
      "La sonda MESSENGER tardó más de 6 años en entrar en órbita debido a la enorme atracción gravitatoria del Sol."
    ],
    symbol: "☿"
  },
  {
    id: "venus",
    name: "Venus",
    category: "planeta",
    tag: "Gemelo Tóxico",
    distSunAU: 0.723,
    distSunKm: 108208000,
    perihelionKm: 107477000,
    aphelionKm: 108939000,
    orbitalPeriodDays: 224.7,
    diameterKm: 12104,
    gravity: 8.87,
    color: "#f59e0b",
    accentColor: "#fbbf24",
    gradient: "radial-gradient(circle at 35% 35%, #fef3c7, #f59e0b 55%, #78350f 95%)",
    description: "Gemelo casi idéntico en tamaño a la Tierra, pero un infierno sofocante con nubes de ácido sulfúrico y una presión atmosférica 92 veces superior a la terrestre.",
    curiosities: [
      "Su temperatura superficial supera los 465°C, suficiente para fundir el plomo.",
      "Gira en sentido retrógrado (el Sol sale por el oeste y se pone por el este).",
      "Las sondas soviéticas Venera solo sobrevivieron entre 23 y 127 minutos en su superficie antes de ser aplastadas y calcinadas."
    ],
    symbol: "♀"
  },
  {
    id: "earth",
    name: "Tierra",
    category: "planeta",
    tag: "El Punto Azul Pálido",
    distSunAU: 1.0,
    distSunKm: 149597871,
    perihelionKm: 147098290,
    aphelionKm: 152098232,
    orbitalPeriodDays: 365.25,
    diameterKm: 12742,
    gravity: 9.807,
    color: "#3b82f6",
    accentColor: "#60a5fa",
    gradient: "radial-gradient(circle at 35% 35%, #93c5fd, #2563eb 50%, #1e3a8a 85%, #0f172a 100%)",
    description: "Nuestro hogar, el único mundo conocido que alberga vida y océanos de agua líquida en superficie. Es la base de lanzamiento de todas nuestras misiones espaciales.",
    curiosities: [
      "Viajamos a unos 107,000 km/h alrededor del Sol en este mismo instante.",
      "La atmósfera nos protege de meteoros y de la radiación cósmica letal.",
      "Para escapar de la gravedad terrestre se necesita una velocidad de escape de 11.2 km/s (40,320 km/h)."
    ],
    symbol: "♁"
  },
  {
    id: "moon",
    name: "La Luna",
    category: "luna",
    parentBody: "earth",
    tag: "Satélite Natural de la Tierra",
    distFromEarthKm: 384400,
    distSunAU: 1.0,
    distSunKm: 149597871,
    orbitalPeriodDays: 27.3,
    diameterKm: 3474,
    gravity: 1.62,
    color: "#e2e8f0",
    accentColor: "#f8fafc",
    gradient: "radial-gradient(circle at 35% 35%, #ffffff, #94a3b8 60%, #334155 95%)",
    description: "El único cuerpo celeste fuera de la Tierra donde los seres humanos han puesto el pie. Dista en promedio solo 384,400 km de nosotros.",
    curiosities: [
      "Las misiones Apolo tardaron unas 72 horas (3 días) en llegar a la Luna.",
      "A la velocidad de la luz, un pulso láser tarda solo 1.28 segundos en llegar a la Luna.",
      "La Luna se aleja de la Tierra aproximadamente 3.8 cm cada año."
    ],
    symbol: "☽"
  },
  {
    id: "mars",
    name: "Marte",
    category: "planeta",
    tag: "El Planeta Rojo",
    distSunAU: 1.524,
    distSunKm: 227936640,
    perihelionKm: 206620000,
    aphelionKm: 249230000,
    orbitalPeriodDays: 686.98,
    diameterKm: 6779,
    gravity: 3.72,
    color: "#ef4444",
    accentColor: "#f87171",
    gradient: "radial-gradient(circle at 35% 35%, #fca5a5, #dc2626 55%, #7f1d1d 95%)",
    description: "Mundo desértico y frío con una fina atmósfera de CO2. Hogar del Monte Olimpo (el volcán más alto del Sistema Solar, 22 km) y el principal objetivo de colonización humana.",
    curiosities: [
      "Una ventana de lanzamiento óptima (conjunción) solo ocurre cada 26 meses (unos 780 días).",
      "Las señales de radio tardan entre 3 y 22 minutos en viajar de la Tierra a Marte dependiendo de sus posiciones orbitales.",
      "Un día marciano (Sol) dura 24 horas y 37 minutos, casi igual al terrestre."
    ],
    symbol: "♂"
  },
  {
    id: "ceres",
    name: "Ceres",
    category: "enano",
    tag: "Cinturón de Asteroides",
    distSunAU: 2.767,
    distSunKm: 413900000,
    perihelionKm: 382620000,
    aphelionKm: 445410000,
    orbitalPeriodDays: 1682,
    diameterKm: 946,
    gravity: 0.28,
    color: "#a1a1aa",
    accentColor: "#d4d4d8",
    gradient: "radial-gradient(circle at 35% 35%, #e4e4e7, #71717a 60%, #27272a 95%)",
    description: "El objeto más grande del Cinturón de Asteroides entre Marte y Júpiter. Posee criovolcanes y un manto rico en hielo de agua.",
    curiosities: [
      "Contiene aproximadamente un tercio de toda la masa del Cinturón Principal de Asteroides.",
      "La sonda Dawn de la NASA lo orbitó y descubrió puntos brillantes de sal de carbonato de sodio en el cráter Occator.",
      "Un viaje directo a Ceres atraviesa miles de asteroides, aunque el espacio entre ellos es inmenso (millones de km)."
    ],
    symbol: "⚳"
  },
  {
    id: "jupiter",
    name: "Júpiter",
    category: "planeta",
    tag: "Rey de los Gigantes",
    distSunAU: 5.204,
    distSunKm: 778412010,
    perihelionKm: 740520000,
    aphelionKm: 816620000,
    orbitalPeriodDays: 4332.6,
    diameterKm: 139820,
    gravity: 24.79,
    color: "#eab308",
    accentColor: "#fde047",
    gradient: "radial-gradient(circle at 35% 35%, #fef08a, #d97706 40%, #b45309 70%, #451a03 95%)",
    description: "El planeta más masivo del Sistema Solar: tiene más del doble de la masa de todos los demás planetas combinados. Posee más de 90 lunas confirmadas.",
    curiosities: [
      "Su Gran Mancha Roja es una tormenta anticiclónica más grande que la Tierra entera, activa desde hace siglos.",
      "Actúa como un 'escudo gravitatorio' desviando cometas y asteroides peligrosos lejos del Sistema Solar interior.",
      "Su intensa radiación electromagnética puede freír los componentes electrónicos de las naves espaciales en horas sin blindaje masivo."
    ],
    symbol: "♃"
  },
  {
    id: "europa",
    name: "Europa",
    category: "luna",
    parentBody: "jupiter",
    tag: "Océano Subterráneo de Júpiter",
    distFromJupiterKm: 670900,
    distSunAU: 5.204,
    distSunKm: 778412010,
    orbitalPeriodDays: 3.55,
    diameterKm: 3122,
    gravity: 1.315,
    color: "#38bdf8",
    accentColor: "#7dd3fc",
    gradient: "radial-gradient(circle at 35% 35%, #e0f2fe, #38bdf8 55%, #0369a1 90%)",
    description: "Luna helada de Júpiter con una corteza de hielo que cubre un océano global de agua líquida con más del doble de agua que todos los océanos terrestres combinados.",
    curiosities: [
      "Es uno de los candidatos más prometedores para encontrar vida extraterrestre en el Sistema Solar.",
      "La misión Europa Clipper de la NASA fue lanzada en 2024 para estudiar su habitabilidad.",
      "El calor interior que mantiene líquido el océano proviene de la fricción de marea gravitacional que ejerce Júpiter."
    ],
    symbol: "◎"
  },
  {
    id: "saturn",
    name: "Saturno",
    category: "planeta",
    tag: "La Joya de los Anillos",
    distSunAU: 9.582,
    distSunKm: 1433530000,
    perihelionKm: 1352550000,
    aphelionKm: 1514500000,
    orbitalPeriodDays: 10759.2,
    diameterKm: 116460,
    gravity: 10.44,
    color: "#fcd34d",
    accentColor: "#fef08a",
    gradient: "radial-gradient(circle at 35% 35%, #fef3c7, #ca8a04 50%, #854d0e 85%, #3f2c06 100%)",
    hasRings: true,
    description: "Famoso por su espectacular sistema de anillos formado por fragmentos de hielo y roca. Es el único planeta del Sistema Solar con densidad menor que el agua.",
    curiosities: [
      "Si existiera una bañera cósmica lo bastante grande, ¡Saturno flotaría en el agua!",
      "Sus majestuosos anillos se extienden hasta 282,000 km desde el planeta, pero tienen un grosor promedio de apenas 10 a 30 metros.",
      "La sonda Cassini tardó 6.7 años en llegar allí usando múltiples asistencias gravitacionales (Venus, Tierra, Júpiter)."
    ],
    symbol: "♄"
  },
  {
    id: "titan",
    name: "Titán",
    category: "luna",
    parentBody: "saturn",
    tag: "Mundo de Lagos de Metano",
    distFromSaturnKm: 1221870,
    distSunAU: 9.582,
    distSunKm: 1433530000,
    orbitalPeriodDays: 15.95,
    diameterKm: 5150,
    gravity: 1.35,
    color: "#fb923c",
    accentColor: "#fdba74",
    gradient: "radial-gradient(circle at 35% 35%, #fed7aa, #ea580c 60%, #7c2d12 95%)",
    description: "La luna más grande de Saturno y el único satélite del Sistema Solar con una atmósfera densa. Tiene ríos, lagos y lluvias de hidrocarburos líquidos (metano y etano).",
    curiosities: [
      "Su atmósfera es tan densa y su gravedad tan baja que un humano con alas artificiales atadas a los brazos podría volar.",
      "La sonda Huygens aterrizó con éxito en Titán en 2005 tras viajar a bordo de Cassini.",
      "La misión Dragonfly de la NASA enviará un dron helicóptero nuclear para explorar su atmósfera en la década de 2030."
    ],
    symbol: "⛢"
  },
  {
    id: "uranus",
    name: "Urano",
    category: "planeta",
    tag: "El Gigante Inclinado",
    distSunAU: 19.201,
    distSunKm: 2872460000,
    perihelionKm: 2741300000,
    aphelionKm: 3003620000,
    orbitalPeriodDays: 30685.4,
    diameterKm: 50724,
    gravity: 8.69,
    color: "#22d3ee",
    accentColor: "#67e8f9",
    gradient: "radial-gradient(circle at 35% 35%, #cffafe, #06b6d4 55%, #0e7490 85%, #083344 100%)",
    description: "Gigante helado de un hipnótico color cian debido al metano en su atmósfera. Rota de costado con una inclinación axial extrema de 98 grados.",
    curiosities: [
      "Debido a su inclinación, cada polo pasa 42 años de continua luz solar seguidos de 42 años de noche polar perpetua.",
      "Es el planeta más frío del Sistema Solar, alcanzando los -224°C en su atmósfera inferior.",
      "Solo una nave espacial humana lo ha visitado: Voyager 2 en un breve sobrevuelo en enero de 1986."
    ],
    symbol: "♅"
  },
  {
    id: "neptune",
    name: "Neptuno",
    category: "planeta",
    tag: "Mundo de Vientos Supersónicos",
    distSunAU: 30.07,
    distSunKm: 4495060000,
    perihelionKm: 4444450000,
    aphelionKm: 4545670000,
    orbitalPeriodDays: 60190,
    diameterKm: 49244,
    gravity: 11.15,
    color: "#3b82f6",
    accentColor: "#60a5fa",
    gradient: "radial-gradient(circle at 35% 35%, #bfdbfe, #2563eb 50%, #1d4ed8 75%, #0f172a 100%)",
    description: "El planeta más lejano reconocido del Sistema Solar. Un mundo azul profundo con los vientos más violentos registrados, superando los 2,100 km/h.",
    curiosities: [
      "Fue el primer planeta descubierto mediante predicciones matemáticas antes de ser observado con un telescopio.",
      "La luz del Sol tarda más de 4 horas en llegar a Neptuno.",
      "Voyager 2 tardó 12 años en llegar a Neptuno tras su lanzamiento en 1977."
    ],
    symbol: "♆"
  },
  {
    id: "pluto",
    name: "Plutón",
    category: "enano",
    tag: "Rey del Cinturón de Kuiper",
    distSunAU: 39.482,
    distSunKm: 5906380000,
    perihelionKm: 4436820000,
    aphelionKm: 7375930000,
    orbitalPeriodDays: 90560,
    diameterKm: 2377,
    gravity: 0.62,
    color: "#d4a373",
    accentColor: "#f3c68f",
    gradient: "radial-gradient(circle at 35% 35%, #faedcd, #d4a373 50%, #99582a 85%, #3e1f07 100%)",
    description: "Reclasificado en 2006 como planeta enano. En 2015, la sonda New Horizons nos reveló que tiene montañas de hielo de agua y un enorme glaciar de nitrógeno con forma de corazón.",
    curiosities: [
      "Su órbita es tan elíptica e inclinada que entre 1979 y 1999 estuvo más cerca del Sol que el propio Neptuno.",
      "New Horizons fue la sonda más rápida lanzada desde la Tierra y aún así tardó 9.5 años en llegar a Plutón.",
      "Forma un sistema binario gravitacional con su luna mayor Caronte, ambos mostrándose siempre la misma cara."
    ],
    symbol: "♇"
  },
  {
    id: "proxima_centauri",
    name: "Próxima Centauri",
    category: "estrella",
    tag: "Frontera Interestelar (4.25 años-luz)",
    distSunAU: 268770,
    distSunKm: 40208000000000, // 4.02e13 km (~4.2465 años luz)
    perihelionKm: 40208000000000,
    aphelionKm: 40208000000000,
    orbitalPeriodDays: 0,
    diameterKm: 214550, // Enana roja
    gravity: 1600,
    color: "#f43f5e",
    accentColor: "#fda4af",
    gradient: "radial-gradient(circle at 40% 40%, #fecdd3, #f43f5e 50%, #be123c 80%, #4c0519 100%)",
    description: "La estrella más cercana al Sistema Solar, una enana roja ubicada a 4.2465 años-luz en la constelación de Centaurus. Posee al menos dos exoplanetas confirmados, incluyendo Próxima b en la zona habitable.",
    curiosities: [
      "A las velocidades de la sonda Voyager 1 (17 km/s), tardaríamos más de 75,000 años en llegar allí.",
      "Incluso a la velocidad de la luz (c), el viaje tomaría 4 años y 3 meses.",
      "El proyecto Breakthrough Starshot propone usar nanonaves empujadas por lásers a 0.2c para llegar en solo 20 años."
    ],
    symbol: "★"
  }
];

export const CELESTIAL_LOOKUP = Object.fromEntries(
  CELESTIAL_BODIES.map(body => [body.id, body])
);
