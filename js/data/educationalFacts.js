/**
 * Artículos y Fichas Educativas sobre Astrodinámica y Astrofísica
 */

export const EDUCATIONAL_TOPICS = [
  {
    id: "hohmann_transfer",
    title: "¿Por qué no viajamos en línea recta en el espacio?",
    icon: "🪐",
    badge: "Mecánica Orbital",
    summary: "En el vacío no hay fricción, pero existe el gigantesco pozo gravitatorio del Sol. Para llegar a otro planeta no se 'apunta' directamente a él.",
    content: `
      <p>Cuando miras un mapa o una película de ciencia ficción, es tentador imaginar que para ir de la Tierra a Marte simplemente enciendes los motores y vuelas en línea recta. <strong>En la física real, esto requeriría una cantidad prohibitiva e infinita de combustible.</strong></p>
      
      <h4>La Danza de la Gravedad Solar</h4>
      <p>Cualquier nave que abandona la Tierra ya se está moviendo alrededor del Sol a la tremenda velocidad de la órbita terrestre: <strong>107,000 km/h (29.8 km/s)</strong>. Al apagar los motores, la nave no se detiene; se convierte en un satélite artificial del Sol en una órbita elíptica.</p>

      <h4>La Órbita de Transferencia de Hohmann</h4>
      <p>Propuesta en 1925 por el ingeniero alemán Walter Hohmann, es la trayectoria con <em>el menor consumo de combustible posible</em> para viajar entre dos planetas:</p>
      <ul>
        <li><strong>Primer encendido:</strong> La nave acelera en la dirección de la órbita terrestre, elevando el punto más lejano de su nueva órbita (su afelio) hasta que coincida con la órbita de Marte.</li>
        <li><strong>Caída libre balística:</strong> Los motores se apagan y la nave 'navega' durante unos 6 a 9 meses en una trayectoria semicircular impulsada solo por la gravedad.</li>
        <li><strong>Segundo encendido:</strong> Al llegar al punto de encuentro, la nave frena o acelera para insertarse en la órbita marciana.</li>
      </ul>

      <p><strong>Ventanas de lanzamiento:</strong> Debido a que la Tierra y Marte viajan a velocidades diferentes, esta alineación geométrica óptima solo ocurre una vez cada 26 meses (780 días).</p>
    `
  },
  {
    id: "time_dilation",
    title: "La Dilatación Temporal de Einstein y la Paradoja de los Gemelos",
    icon: "⏳",
    badge: "Relatividad Especial",
    summary: "Cuanto más rápido te mueves a través del espacio, más lento te mueves a través del tiempo respecto a los observadores en reposo.",
    content: `
      <p>En 1905, Albert Einstein publicó la <strong>Teoría de la Relatividad Especial</strong>, demoliendo la idea de que el tiempo es un reloj universal que late igual para todos.</p>

      <h4>El Factor de Lorentz (γ)</h4>
      <p>El ritmo del tiempo para un viajero depende directamente de su velocidad relativa mediante la fórmula matemática:</p>
      <div class="formula-box">
        <code>γ = 1 / √(1 - v² / c²)</code>
      </div>
      <p>Donde <em>v</em> es la velocidad de la nave y <em>c</em> es la velocidad de la luz (≈ 300,000 km/s).</p>

      <h4>Consecuencias asombrosas a velocidades relativistas:</h4>
      <ul>
        <li><strong>A 10% de c (30,000 km/s):</strong> El efecto es sutil; el tiempo en la nave pasa solo un 0.5% más lento.</li>
        <li><strong>A 90% de c (270,000 km/s):</strong> El tiempo pasa <strong>2.29 veces más lento</strong>. Lo que para la Tierra son 10 años, para los tripulantes son solo 4 años y 4 meses.</li>
        <li><strong>A 99% de c:</strong> El tiempo pasa <strong>7.09 veces más lento</strong>.</li>
        <li><strong>A 99.999% de c:</strong> ¡El factor de Lorentz supera 223! Podrías viajar a los confines de la galaxia en unas pocas décadas de tu vida biológica, aunque al regresar a la Tierra habrían transcurrido millones de años y la humanidad podría haberse extinguido.</li>
      </ul>
    `
  },
  {
    id: "alcubierre_warp",
    title: "El Motor Warp de Alcubierre: ¿Ciencia Ficción o Física Real?",
    icon: "🌀",
    badge: "Relatividad General",
    summary: "Una solución geométrica a las ecuaciones de campo de Einstein que permitiría viajar más rápido que la luz sin violar el límite cósmico local.",
    content: `
      <p>La relatividad especial establece que ningún objeto con masa puede acelerar a través del espacio a una velocidad igual o superior a <em>c</em>. Sin embargo, en 1994, el físico teórico mexicano <strong>Miguel Alcubierre Moya</strong> encontró una asombrosa brecha teórica.</p>

      <h4>El truco: Mover el espacio mismo</h4>
      <p>La regla de que nada supera la velocidad de la luz aplica a objetos que se mueven <em>a través</em> del tejido del espacio-tiempo. Pero <strong>el propio tejido del espacio-tiempo puede expandirse o contraerse a cualquier velocidad</strong> (como ocurrió durante la Inflación Cósmica del Big Bang).</p>

      <h4>La Métrica de Curvatura de Alcubierre:</h4>
      <ul>
        <li>La nave genera una <strong>burbuja de curvatura</strong>: contrae el espacio por delante y lo expande por detrás.</li>
        <li>La nave descansa inmóvil en un 'marco de referencia plano' dentro de la burbuja, por lo que <em>no experimenta fuerzas G demoledoras ni dilatación temporal paradójica</em>.</li>
        <li>La burbuja viaja por el espacio transportando la nave a velocidades aparentemente superlumínicas (Warp 1, 5, 10 o más).</li>
      </ul>

      <h4>El Gran Obstáculo Tecnológico:</h4>
      <p>Para crear esta geometría se requiere <strong>materia exótica con densidad de energía negativa</strong>. Físicos como Harold White y Erik Lentz han propuesto refinamientos para reducir la energía teórica necesaria, pero construir un prototipo real sigue estando mucho más allá de nuestra ingeniería actual.</p>
    `
  },
  {
    id: "gravity_assist",
    title: "Asistencia Gravitatoria: El Efecto Tirachinas Cósmico",
    icon: "🎯",
    badge: "Exploración Espacial",
    summary: "Cómo las misiones interplanetarias 'roban' energía orbital a planetas gigantes para acelerar a miles de km/h sin quemar combustible.",
    content: `
      <p>Cuando la NASA lanzó las misiones <strong>Voyager 1 y 2</strong> en 1977, ningún cohete existente tenía la potencia para propulsar directamente una nave hasta los confines del Sistema Solar.</p>

      <h4>¿Cómo funciona la Asistencia Gravitatoria?</h4>
      <p>Imagina que lanzas una pelota de tenis contra el frontal de un tren que viene a toda velocidad hacia ti. La pelota no solo rebotará con la velocidad con la que la lanzaste: rebotará con el <em>doble de la velocidad del tren sumada</em> a la suya.</p>

      <ul>
        <li>Al aproximarse a un planeta masivo como Júpiter desde 'detrás' de su trayectoria orbital, la gravedad del planeta atrae a la nave.</li>
        <li>La nave 'cae' hacia el planeta ganando velocidad cinética.</li>
        <li>Al pasar por el punto más cercano (periapsis), la nave sale despedida con un ángulo modificado y con un aumento colosal de velocidad heliocéntrica.</li>
      </ul>

      <p><strong>Conservación de la energía:</strong> La nave gana velocidad 'robando' una fracción infinitesimal del momento angular orbital del planeta. Júpiter se ralentiza una fracción microscópica (inmedible, menos de una billonésima de milímetro en mil millones de años), ¡pero la nave espacial duplica o triplica su velocidad gratis!</p>
    `
  },
  {
    id: "rocket_equation",
    title: "La Tiranía de la Ecuación del Cohete de Tsiolkovsky",
    icon: "⛽",
    badge: "Propulsión Aeroespacial",
    summary: "Por qué para llevar 1 tonelada de carga útil a otro planeta se necesitan cientos de toneladas de combustible.",
    content: `
      <p>El pionero de la astronáutica rusa <strong>Konstantin Tsiolkovsky</strong> formuló en 1903 la famosa ecuación fundamental del vuelo espacial:</p>
      <div class="formula-box">
        <code>Δv = v_e · ln( m_inicial / m_final )</code>
      </div>

      <h4>El círculo vicioso del combustible:</h4>
      <p>Para acelerar un cohete necesitas combustible. Pero ese combustible tiene masa, lo que significa que necesitas <em>más combustible</em> para acelerar el propio combustible que llevas a bordo, y a su vez más combustible para acelerar ese combustible adicional.</p>

      <ul>
        <li>En un cohete como el Saturno V del programa Apolo, el <strong>85% al 90% del peso total al despegue era combustible</strong> líquido. La cápsula con los astronautas representaba menos del 2% del cohete.</li>
        <li>Para romper esta tiranía, la física busca sistemas con mayor <strong>velocidad de escape de gases (v_e)</strong> e <strong>impulso específico (Isp)</strong>: como los motores iónicos, la propulsión térmica nuclear o la fusión nuclear.</li>
      </ul>
    `
  },
  {
    id: "interstellar_scale",
    title: "La Incomprensible Escala de las Distancias Interestelares",
    icon: "🌌",
    badge: "Cosmología",
    summary: "Por qué cruzar el Sistema Solar es un paseo por el parque comparado con el salto a la estrella más cercana.",
    content: `
      <p>Solemos ver diagramas del Sistema Solar donde los planetas están convenientemente agrupados uno al lado del otro. Esta representación gráfica es engañosa porque en un mapa a escala real, los planetas serían invisibles motas de polvo separadas por kilómetros de vacío.</p>

      <h4>Una analogía a escala humana para comprender el vacío:</h4>
      <ul>
        <li>Si reducimos el <strong>Sol</strong> al tamaño de una pelota de fútbol (22 cm de diámetro):</li>
        <li>La <strong>Tierra</strong> sería una cabeza de alfiler de 2 mm de ancho situada a <strong>24 metros</strong> de distancia de la pelota.</li>
        <li><strong>Marte</strong> estaría a 36 metros.</li>
        <li><strong>Júpiter</strong> sería una canica de 2 cm ubicada a <strong>120 metros</strong>.</li>
        <li><strong>Plutón</strong> estaría a casi <strong>1 kilómetro</strong> de distancia.</li>
        <li><strong>¿Y dónde estaría Próxima Centauri (la estrella más cercana)?</strong> En esta misma escala, ¡estaría a más de <strong>6,400 kilómetros de distancia</strong>! (Equivalente a la distancia en línea recta de Madrid a Nueva York).</li>
      </ul>
      <p>Por eso, mientras que la luz cruza el Sistema Solar en pocas horas, tarda <strong>4.25 años</strong> en llegar a Próxima Centauri.</p>
    `
  }
];
