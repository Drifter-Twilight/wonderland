import { Leafer } from 'leafer-ui'

let interval: NodeJS.Timeout
function shake(canvas: HTMLCanvasElement) {
  interval = setInterval(() => {
    const randomX = Math.random() * 30 - 15;
    const randomY = Math.random() * 30 - 15;
    canvas.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }, 50);
}

function stopShake(canvas: HTMLCanvasElement) {
  clearInterval(interval);
  canvas.style.transform = 'translate(0, 0)';
}

export {
  shake,
  stopShake
}