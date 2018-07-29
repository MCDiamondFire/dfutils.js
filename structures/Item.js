const items = require("../items.json");

class Item {
    constructor(count, id, metadata = {}, damage = 0) {
        const { type } = items.find(item => item.meta === damage && (item.type === id || item.text_type === id));
        if (!type) throw new Error("Unknown item.");

        this.Count = count;
        this.id = type;
        this.tag = metadata;
        this.Damage = damage;
    }
}

module.exports = Item;