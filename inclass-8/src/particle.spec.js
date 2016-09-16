import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5], acceleration: [1.0, 1.0] })
        const { velocity } = update(p, 1.0)
        expect(velocity).to.eql([1.5, 0.5])
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p = particle({ position: [-100, 900], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position[0]).to.be.at.least(0)
        expect(position[0]).to.be.at.most(800)
        expect(position[1]).to.be.at.least(0)
        expect(position[1]).to.be.at.most(800)
    })

})
