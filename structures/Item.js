const items = require("../items.json");

class Item {
    constructor(id) {
        const { type } = items.find(item => item.type === id || item.text_type === id);
        if (!type) throw new Error("Unknown item.");

        this.Count = 1;
        this.id = type;
        this.tag = { };
        this.damage = 0
    }

    setAmounth(count) {
        this.Count = count;
    }

    setTag(tag) {
        this.tag = tag;
    }

    setDamage(damage) {
        this.Damage = Damage;
    }
}

module.exports = Item;