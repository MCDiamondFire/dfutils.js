const values = require("../values");
const targets = require("../valueTargets");

class Value {
    constructor(name) {
        this.Count = 1;
        this.id = 260;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: ["&7A variable type that cannot be", "&7modified. It changes based on", "&7the statistics of the plot and the", "&7players on it.", "", "&dValues:", "&b> &7Statistic (right click while holding)", "&b> &7Value target (sneak + right click", "&7while holding)"],
                Name: values[name]
            }
        }
    }

    setTarget(target) {
        this.tag.display.Lore = [targets[target]];
    }
}

module.exports = Value;