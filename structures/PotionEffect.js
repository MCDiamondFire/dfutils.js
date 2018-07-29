class PotionEffect {
    constructor(effect, duration, potency) {
        this.Count = 1;
        this.id = 374;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: [`&b${effect.toUpperCase()}`, duration, potency.toString()],
                Name: "&5Potion Effect"
            }
        }
        this.Damage = 0;
    }
}

module.exports = PotionEffect;