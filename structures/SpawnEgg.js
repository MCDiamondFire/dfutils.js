class SpawnEgg {
    constructor(entity) {
        this.Count = 1;
        this.id = 383;
        this.tag = {
            EntityTag: {
                id: entity.indexOf("minecraft:") >= 0 ? entity : `minecraft:${entity}`
            }
        }
        this.Damage = 0;
    }
}

module.exports = SpawnEgg;
