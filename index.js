const { writeFile } = require("fs");
const { exec } = require("child_process");

const Item = require("./structures/Item");
const LocationItem = require("./structures/Location");
const NumberItem = require("./structures/Number");
const PotionEffectItem = require("./structures/PotionEffect");
const SpawnEggItem = require("./structures/SpawnEgg");
const TextItem = require("./structures/Text");
const VarItem = require("./structures/Var");

const targets = require("./targets.json");

const json = { CodeData: [] };

class Player {
    on(event, fn) {
        if (event === "join") {
            json.CodeData.push({
                Function: "Join",
                Name: "PLAYER_EVENT"
            });
        } else if(event === "quit") {
            json.CodeData.push({
                Function: "Quit",
                Name: "PLAYER_EVENT"
            });
        }
        
        fn();
    }

    sendMessage(options, ...items) {
        const target = options.target && targets.players.includes(options.target) ? options.target : null;
        if (!target) items.push(options);

        json.CodeData.push({
            Function: "SendMessage",
            Target: target || "Default",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        })
    }
}

class Entity {
    on(event, fn) {
        switch(event.toLowerCase()) {
            case "mobDmgMob":
                json.CodeData.push({
                    Function: "MobDmgMob",
                    Name: "ENTITY_EVENT"
                });

            fn();
        }
    }

    setArmor(options, ...items) {
        const target = options.target && targets.entities.includes(options.target) ? options.target : null;
        if (!target) items.push(options);

        json.CodeData.push({
            Function: "SetArmor",
            Target: target || "Default",
            ChestItems: items,
            Name: "ENTITY_ACTION"
        });
    }
}

class Game {
    spawnMob({ entity, location, health, name, potionEffects }) {
        let items = [];

        items.push(entity);
        items.push(location);
        if (health) items.push(health);
        if (name) items.push(name);
        if (potionEffects) items = items.concat(potionEffects);

        json.CodeData.push({
            Function: "SpawnMob",
            ChestItems: items,
            Name: "GAME_ACTION"
        })
    }
}

function selectObject(options, ...items) {
    const data = {
        Function: options.filter,
        ConditionalNot: options.not ? 1 : 0,
        ChestItems: items,
        Name: "SELECT_OBJECT"
    };

    if (options.subfilter) data.SubFunction = options.subfilter;

    json.CodeData.push(data);
}

function callFunction(name) {
    json.CodeData.push({
        DynamicFunction: name,
        Name: "CALL_FUNCTION"
    })
}

function createFunction(name, item) {
    json.CodeData.push({
        ChestItems: [item],
        DynamicFunction: name,
        Name: "FUNCTION"
    });
}

function setAuthor(name) {
    json.Author = name;
}

function compile(directory = __dirname) {
    const start = Date.now();

    console.log("Compiling...");

    writeFile(`program.json`, JSON.stringify(json), (err, data) => {
        if (err) throw err;

        exec(`java -jar converter.jar ${directory}`);
    });
}

exports.Player = Player;
exports.Entity = Entity;
exports.Game = Game;

exports.selectObject = selectObject;
exports.callFunction = callFunction;
exports.createFunction = createFunction;

exports.setAuthor = setAuthor;
exports.compile = compile;

exports.Item = Item;
exports.LocationItem = LocationItem;
exports.NumberItem = NumberItem;
exports.PotionEffectItem = PotionEffectItem;
exports.SpawnEggItem = SpawnEggItem;
exports.TextItem = TextItem;
exports.VarItem = VarItem;
