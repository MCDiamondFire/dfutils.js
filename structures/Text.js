const utf8 = require("utf8");

class Text {
    constructor(value) {
        this.Count = 1;
        this.id = 340;
        this.tag = {
            HideFlags: 63,
            display: {
                Name: value
            }
        }
        this.Damage = 0;
    }
}

module.exports = Text;
