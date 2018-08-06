const items = require("../data/items");

class Item {
    constructor(id) {
        const data = items.find(item => item.type === id || item.text_type === id);
        if (!data) throw new Error("Unknown item.");

        this.Count = 1;
        this.id = data.type;
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