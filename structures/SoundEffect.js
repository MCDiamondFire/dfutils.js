class SoundEffect {
    constructor(effect) {
        this.Count = 1;
        this.id = 2257;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: [`&7${effect}`],
                Name: "&9Sound Effect"
            }
        }
    }
}

module.exports = SoundEffect;