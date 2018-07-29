class Location {
    constructor(...coords) {
        this.Count = 1;
        this.id = 339;
        this.tag = {
            HideFlags: 63,
            display: {
                Lore: coords.map(coord => coord.toString()),
                Name: "&aLocation"
            }
        }
        this.Damage = 0;
    }
}

module.exports = Location;
