export class Particle {
  public x: number
  public y: number
  public z: number
  public pastZ: number
  public color: string
  public r: number

  constructor(x?: number, y?: number, z?: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
    this.r = PARTICLE_BASE_RADIUS;
    this.color = '#fff';
  }
}