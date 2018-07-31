class Var {
    constructor(value, save = false) {
        this.Count = 1;
        this.id = 378;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: save ? ["SAVE"] : [],
                Name: value
            },
            Damage: 0
        }
    }
}

module.exports = Var;
