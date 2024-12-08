class Particle {
  public x: number
  public y: number
  public z: number
  public pastZ: number

  constructor(x?: number, y?: number, z?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
  }
}

let canvasWidth: number, canvasHeight: number;
let centerX: number, centerY: number;
let mouseX: number, mouseY: number;
let speed = DEFAULT_SPEED;
let targetSpeed = DEFAULT_SPEED;
let particles: Particle[] = [];

export function drawHome(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  canvasWidth = canvas.width
  canvasHeight = canvas.height

  

  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles[i] = randomizeParticle(new Particle());
    particles[i].z -= 500 * Math.random();
  }

  let flag = false
  canvas.addEventListener('mousedown', function (e) {
    targetSpeed = BOOST_SPEED;
    flag = false

    shake(canvas)
  }, false);

  canvas.addEventListener('mouseup', function (d) {
    targetSpeed = DEFAULT_SPEED;
    flag = true

    stopShake(canvas)
  }, false);

  document.addEventListener('resize', () => resize(canvas, () => {
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;

    context.fillStyle = 'rgb(255, 255, 255)';
    loop()
  }));
  resize(canvas, () => {
    centerX = canvasWidth / 2;
    centerY = canvasHeight / 2;

    context.fillStyle = 'rgb(255, 255, 255)';
    loop()
  });

  mouseX = centerX;
  mouseY = centerY;

  function loop() {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    speed += speed >= 300 ? 0 : flag ? (targetSpeed - (speed * 70)) * 0.01 : (targetSpeed - speed) * 0.01;

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
        randomizeParticle(p);
        continue;
      }

      cx = centerX - (mouseX - centerX) * 1.25;
      cy = centerY - (mouseY - centerY) * 1.25;

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

      context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
      context.arc(px, py, pr, a1, a2, true);
      context.lineTo(x + r * cos(a2), y + r * sin(a2));
      context.arc(x, y, r, a2, a1, true);
      context.closePath();
    }
    context.fill();

    flag = false

    requestAnimationFrame(loop)
  }

  loop()

}


