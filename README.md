# 🚀 SpaceSpeed &bull; Calculadora Interactiva de Viaje Espacial y Propulsión

**SpaceSpeed** es una aplicación web educativa e interactiva diseñada para explorar, calcular y visualizar con rigor científico y estética visual futurista los tiempos de viaje interplanetario e interestelar. Permite comparar tecnologías espaciales reales y actuales con conceptos de propulsión teóricos del futuro cercano y motores de ciencia ficción (incluyendo dilatación temporal relativista de Einstein y motores Warp de Alcubierre).

---

## 🌌 Características Destacadas

### 🪐 1. Mecánica Orbital y Sistema Solar en Tiempo Real
- **Cuerpos Celestes Incluidos**: Mercurio, Venus, Tierra, La Luna, Marte, Ceres (Cinturón de Asteroides), Júpiter, Europa, Saturno, Titán, Urano, Neptuno, Plutón y Próxima Centauri (4.25 años luz).
- **Modos de Distancia Orbital**:
  - **Mínima (Oposición)**: Máxima aproximación orbital.
  - **Media (Promedio Real)**: Distancia media probabilística sobre órbitas asíncronas.
  - **Máxima (Conjunción)**: Cuerpos celestes en lados opuestos del Sol.
  - **Órbita de Transferencia de Hohmann**: Trayectoria elíptica balística real gobernada por la gravedad solar.
- **Simulador Gráfico Interactivo (HTML5 Canvas 2D/3D)**:
  - Órbitas reales con zoom interactivo (rueda del ratón) y desplazamiento (arrastrar).
  - Selector de velocidad de simulación: pausar (0x), 0.1x, 0.25x, 0.5x, 1x, 2x y 5x.
  - Alternador de escala visual (Logarítmica / Proporcional).
  - Nave espacial animada con estela de partículas sobre la trayectoria de vuelo calculada.

### ⚡ 2. Catálogo Extenso de Sistemas de Propulsión
- **Referencias Humanas**: Caminando a pie (5 km/h), Avión comercial Boeing 787 (900 km/h).
- **Tecnología Actual & Histórica**:
  - *Apolo 11 / Saturno V*: 10.8 km/s (39,000 km/h).
  - *Sonda New Horizons*: 16.3 km/s (58,500 km/h).
  - *Sonda Voyager 1*: 17.0 km/s (61,200 km/h).
  - *Propulsión Iónica (Dawn / BepiColombo)*: 40 km/s (144,000 km/h).
  - *Parker Solar Probe*: 192.2 km/s (692,000 km/h - la nave más rápida de la historia).
- **Futuro Cercano & Teórico**:
  - *Cohete Térmico Nuclear (NTR / Proyecto DRACO)*: 100 km/s.
  - *Propulsión por Fusión Nuclear (Proyecto Daedalus)*: 0.12 $c$ (36,000 km/s).
  - *Vela Solar Láser (Breakthrough Starshot)*: 0.20 $c$ (60,000 km/s).
  - *Cohete de Antimateria*: 0.50 $c$ (150,000 km/s).
- **Ciencia Ficción & Relatividad**:
  - *Impulso Sub-luz Relativista*: 0.90 $c$ (con dilatación temporal extrema).
  - *Velocidad de la Luz ($c$)*: 300,000 km/s ($1.0\ c$).
  - *Motor Warp de Alcubierre*: Factores Warp 1 ($1c$), Warp 5 ($125c$) y Warp 9.9 ($3,053c$).
  - *Hiperespacio (Star Wars)*: $1,000,000\ c$.
- **Velocidad Personalizada (Custom)**: Control numérico con soporte para unidades `km/s`, `km/h`, `% de c`, `Mach` y múltiplos superlumínicos de $c$.

### ⏳ 3. Física de la Relatividad Especial (Einstein)
- Cálculo en tiempo real del **Factor de Lorentz ($\gamma = 1 / \sqrt{1 - v^2/c^2}$)** a velocidades relativistas ($v \ge 0.01c$).
- Desglose dual:
  - **Tiempo en la Tierra**: Observadores en reposo.
  - **Tiempo para la Tripulación**: Tiempo biológico propio dilatado (demostración de la paradoja de los gemelos).
- Explicación de la **métrica de burbuja Warp de Alcubierre** (donde el espacio se contrae por delante y se expande por detrás sin dilatación temporal interna).

### 🏁 4. Gran Premio Cósmico (Simulador de Carrera)
- Enfrenta en tiempo real hasta 3 sistemas de propulsión distintos en una carrera interplanetaria con pistas paralelas, telemetría en vivo, ranking y podio de llegada.

### 📚 5. Enciclopedia del Viajero Cósmico
- Artículos educativos interactivos sobre:
  - La órbita de transferencia de Hohmann.
  - La dilatación temporal relativista de Einstein.
  - El motor Warp de Alcubierre y energía exótica negativa.
  - La tiranía de la ecuación del cohete de Tsiolkovsky.
  - La asistencia gravitatoria cósmica ("efecto tirachinas").
  - Escalas comparativas inmensas del vacío interestelar.
- Ficha técnica completa de cada planeta y motor.

### 🔊 6. Audio Sintetizado Procedural (Web Audio API)
- Efectos de sonido integrados para acople Warp, clics futuristas, fanfarria de victoria y un drone de ambientación cósmica sin requerir archivos mp3 externos.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico**: Estructura accesible y modular.
- **CSS3 Vanilla**: Sistema de diseño personalizado con estética oscura espacial, efecto glassmorphism, resplandores de neón y animaciones fluidas (sin dependencias de frameworks pesados).
- **JavaScript Moderno (ES6+ Modules)**:
  - Cálculos astronómicos y relativistas modulares.
  - Renderizado en HTML5 Canvas con doble búfer para el simulador orbital y el campo estelar 3D con efecto túnel Warp.
  - Web Audio API para síntesis procedural de sonido.

---

## 🚀 Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/<tu-usuario>/space-speed.git
   cd space-speed
   ```

2. Inicia un servidor web estático (puedes usar cualquier servidor local, por ejemplo con Node.js):
   ```bash
   npx serve -l 3000 .
   ```
   *O con Python:*
   ```bash
   python -m http.server 3000
   ```

3. Abre en tu navegador preferido:
   ```
   http://localhost:3000
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).
