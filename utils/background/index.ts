import { Particle } from './particle'

let canvasWidth: number, canvasHeight: number;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;
let particles: Particle[] = [];

export function drawHome(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  canvasWidth = canvas.width
  canvasHeight = canvas.height

  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = getRandom(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  function loop() {
    context.save();

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    // speed += (targetSpeed - speed) * 0.01;

    let p;
    let cx, cy;
    let rx, ry;
    let f, x, y, r;
    let pf, px, py, pr;
    let a, a1, a2;

    let halfPi = Math.PI * 0.5;
    let atan2 = Math.atan2;
    let cos = Math.cos;
    let sin = Math.sin;

    context.beginPath();
    for (let i = 0; i < PARTICLE_NUM; i++) {
      p = particles[i];

      p.pastZ = p.z;
      p.z -= speed;

      if (p.z <= 0) {
        getRandom(p);
        continue;
      }
      cx = canvasWidth / 2;
      cy = canvasHeight / 2;

      rx = p.x - cx;
      ry = p.y - cy;

      f = 500 / p.z;
      x = cx + rx * f;
      y = cy + ry * f;
      r = PARTICLE_BASE_RADIUS * f;

      pf = 500 / p.pastZ;
      px = cx + rx * pf;
      py = cy + ry * pf;
      pr = PARTICLE_BASE_RADIUS * pf;

      a = atan2(py - y, px - x);
      a1 = a + halfPi;
      a2 = a - halfPi;

      context.fillStyle = 'rgb(255, 255, 255)';

      context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
      context.arc(px, py, pr, a1, a2, true);
      context.lineTo(x + r * cos(a2), y + r * sin(a2));
      context.arc(x, y, r, a2, a1, true);
      context.closePath();
    }
    context.fill();

    requestAnimationFrame(loop)
  }

  loop()
}