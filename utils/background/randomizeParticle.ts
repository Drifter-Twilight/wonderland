import {} from 'leafer-ui'
import type { Particle } from './registrationElement'

export function randomizeParticle(p: Particle) {
  p.x = Math.random() * window.innerWidth;
  p.y = Math.random() * window.innerHeight;
  p.z = Math.random() * 1500 + 500;
  return p;
}