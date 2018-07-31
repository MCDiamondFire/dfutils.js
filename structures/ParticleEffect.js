class ParticleEffect {
    constructor(effect) {
        this.Count = 1;
        this.id = 399;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: [`&7${effect}`],
                Name: "&eParticle Effect"
            }
        }
    }
}

module.exports = ParticleEffect;