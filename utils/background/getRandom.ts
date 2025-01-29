import type { Particle } from './particle'

export function getRandom(particle: Particle) {
  particle.x = window.innerWidth * Math.random()
  particle.y = window.innerHeight * Math.random()
  particle.z = 2000 * Math.random()

  return particle
}