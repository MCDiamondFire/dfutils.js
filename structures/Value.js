class Value {
    constructor(name) {
        this.Count = 1;
        this.id = 260;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: ["&7A variable type that cannot be", "&7modified. It changes based on", "&7the statistics of the plot and the", "&7players on it.", "", "&dValues:", "&b> &7Statistic (right click while holding)", "&b> &7Value target (sneak + right click while holding)"],
                Name: name
            }
        }
    }
}

module.exports = Value;