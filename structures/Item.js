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

    setAmount(count) {
        this.Count = count;

        return this;
    }

    setTag(tag) {
        this.tag = tag;

        return this;
    }

    setDamage(damage) {
        this.Damage = damage;

        return this;
    }
}

module.exports = Item;