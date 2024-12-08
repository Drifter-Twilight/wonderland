export function resize(canvas: HTMLCanvasElement, callback: () => void) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  callback && callback()
}