class Number {
    constructor(number) {
        this.Count = 1;
        this.id = "minecraft:slime_ball";
        this.tag = {
            HideFlags: 63,
            display: {
                Name: `&c${number.toString()}`
            }
        }
        this.Damage = 0;
    }
}

module.exports = Number;
