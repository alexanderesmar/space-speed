/**
 * Campo estelar 3D interactivo con efecto Warp Speed
 */

export class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.numStars = 500;
    this.baseSpeed = 0.4;
    this.warpFactor = 1.0; // Se multiplica en velocidad warp (1 = normal, hasta 50 = warp)
    this.targetWarpFactor = 1.0;
    this.animationFrameId = null;

    this.resize();
    this.initStars();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * this.width * 2,
        y: (Math.random() - 0.5) * this.height * 2,
        z: Math.random() * this.width,
        pz: Math.random() * this.width, // Previous z for streak drawing
        color: this.getRandomColor()
      });
    }
  }

  getRandomColor() {
    const colors = ["#ffffff", "#e0e7ff", "#fef08a", "#bae6fd", "#fbcfe8"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  setWarp(isWarp, intensity = 25) {
    this.targetWarpFactor = isWarp ? intensity : 1.0;
  }

  update() {
    // Transición suave del factor warp
    this.warpFactor += (this.targetWarpFactor - this.warpFactor) * 0.05;

    const currentSpeed = this.baseSpeed * this.warpFactor;

    for (let star of this.stars) {
      star.pz = star.z;
      star.z -= currentSpeed * 10;

      if (star.z <= 0) {
        star.x = (Math.random() - 0.5) * this.width * 2;
        star.y = (Math.random() - 0.5) * this.height * 2;
        star.z = this.width;
        star.pz = this.width;
      }
    }
  }

  draw() {
    // Fondo oscuro con leve rastro cuando está en warp
    if (this.warpFactor > 3) {
      this.ctx.fillStyle = 'rgba(7, 9, 19, 0.35)';
    } else {
      this.ctx.fillStyle = 'rgba(7, 9, 19, 0.9)';
    }
    this.ctx.fillRect(0, 0, this.width, this.height);

    for (let star of this.stars) {
      const k = 250 / star.z;
      const x = star.x * k + this.centerX;
      const y = star.y * k + this.centerY;

      if (x < 0 || x > this.width || y < 0 || y > this.height) continue;

      const pk = 250 / star.pz;
      const px = star.x * pk + this.centerX;
      const py = star.y * pk + this.centerY;

      const size = Math.max(0.6, (1 - star.z / this.width) * 2.8);
      const alpha = Math.min(1, (1 - star.z / this.width) * 1.2);

      this.ctx.strokeStyle = star.color;
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = alpha;

      if (this.warpFactor > 2) {
        // Dibujar estela alargada hacia el centro (Efecto túnel hiperespacial)
        this.ctx.lineWidth = Math.min(size * 1.5, 3.5);
        this.ctx.beginPath();
        this.ctx.moveTo(px, py);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      } else {
        // Estrella puntual titilante
        this.ctx.beginPath();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    this.ctx.globalAlpha = 1.0;
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
