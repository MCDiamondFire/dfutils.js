class SpawnEgg {
    constructor(entity) {
        this.Count = 1;
        this.id = "minecraft:spawn_egg";
        this.tag = {
            EntityTag: {
                id: entity.indexOf("minecraft:") >= 0 ? entity : `minecraft:${entity}`
            }
        }
        this.Damage = 0;
    }
}

module.exports = SpawnEgg;
