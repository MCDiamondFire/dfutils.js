const particles = require("../data/particles");

class ParticleEffect {
    constructor(effect) {
        this.Count = 1;
        this.id = "minecraft:nether_star";
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: [particles[effect]],
                Name: "&eParticle Effect"
            }
        }
    }
}

module.exports = ParticleEffect;