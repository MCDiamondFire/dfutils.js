const { writeFile, unlinkSync } = require("fs");
const { exec } = require("child_process");

const Item = require("./structures/Item");
const LocationItem = require("./structures/Location");
const NumberItem = require("./structures/Number");
const ParticleEffectItem = require("./structures/ParticleEffect");
const PotionEffectItem = require("./structures/PotionEffect");
const SoundEffectItem = require("./structures/SoundEffect");
const SpawnEggItem = require("./structures/SpawnEgg");
const TextItem = require("./structures/Text");
const ValueItem = require("./structures/Value");
const VarItem = require("./structures/Var");

const targets = require("./targets.json");

let json = { CodeData: [] };

function push(data) {
    let cd = json.CodeData;
    let path = `json.CodeData[${cd.length === 0 ? 0 : cd.length - 1}]`;

    if (cd.length === 0) return json.CodeData.push(data);

    for (let i = 0; i < 100; i++) {
        if (cd.length === 0) break;
        if (cd[cd.length - 1].CodeData) {
            cd = cd[cd.length - 1].CodeData;
            path += `.CodeData[${cd.length === 0 ? 0 : cd.length - 1}]`;
        } else break;
    }

    eval(path.replace(/\[\d+\]+$/, "")).push(data);
}

function addSpacer() {
    let cd = json.CodeData;
    let path = `json.CodeData[${cd.length === 0 ? 0 : cd.length - 1}]`;

    for (let i = 0; i < Infinity; i++) {
        if (cd.length === 0) break;
        if (cd[cd.length - 1].CodeData) {
            cd = cd[cd.length - 1].CodeData;
            path += `.CodeData[${cd.length === 0 ? 0 : cd.length - 1}]`;
        } else break;
    }

    eval(path.replace(/\.CodeData\[\d+\]+$/, "").replace(/\[\d+\]+$/, "")).push("SPACER");
}

class Player {
    on(event, fn) {
        push({
            Function: event,
            Name: "PLAYER_EVENT"
        });

        fn();
    }

    setTarget(target) {
        this.target = targets.entities.includes(target) ? target : null;

        return this;
    }

    _reset() {
        this.target = null;
    }

    give(...items) {
        push(this.target ? {
            Function: "GiveItems",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "GiveItems",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setItems(...items) {
        push(this.target ? {
            Function: "SetItems",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetItems",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setArmor(...items) {
        push(this.target ? {
            Function: "SetArmor",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetArmor",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setOffhand(...items) {
        push(this.target ? {
            Function: "SetOffhand",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetOffhand",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    removeItems(...items) {
        push(this.target ? {
            Function: "RemoveItem",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RemoveItem",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    clearInv(...items) {
        push(this.target ? {
            Function: "ClearInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ClearInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    showChestMenu(...items) {
        push(this.target ? {
            Function: "ShowInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ShowInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    expandChestMenu(...items) {
        push(this.target ? {
            Function: "ExpandInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ExpandInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    savePlayerInv(...items) {
        push(this.target ? {
            Function: "SaveInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SaveInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    loadSavedInv(...items) {
        push(this.target ? {
            Function: "LoadInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "LoadInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setHotbarSlot(...items) {
        push(this.target ? {
            Function: "SetSlot",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetSlot",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    giveRandomItem(...items) {
        push(this.target ? {
            Function: "GiveRngItem",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "GiveRngItem",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    closeMenus(...items) {
        push(this.target ? {
            Function: "CloseInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "CloseInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    sendMessage(...items) {
        push(this.target ? {
            Function: "SendMessage",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SendMessage",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    sendDialogue(...items) {
        push(this.target ? {
            Function: "SendDialogue",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SendDialogue",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    sendMsgWithHover(...items) {
        push(this.target ? {
            Function: "SendHover",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SendHover",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    clearChat(...items) {
        push(this.target ? {
            Function: "ClearChat",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ClearChat",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    playSound(...items) {
        push(this.target ? {
            Function: "PlaySound",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "PlaySound",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    playSoundSequence(...items) {
        push(this.target ? {
            Function: "PlaySoundSeq",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "PlaySoundSeq",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    stopAllSounds(...items) {
        push(this.target ? {
            Function: "StopSound",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "StopSound",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    playParticleEffect(...items) {
        push(this.target ? {
            Function: "PlayEffect",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "PlayEffect",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    sendTitle(...items) {
        push(this.target ? {
            Function: "SendTitle",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SendTitle",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setChatTag(...items) {
        push(this.target ? {
            Function: "SetChatTag",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetChatTag",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    addBossBar(...items) {
        push(this.target ? {
            Function: "BossBar",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "BossBar",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    clearBossBars(...items) {
        push(this.target ? {
            Function: "ClearBars",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ClearBars",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    sendActionBar(...items) {
        push(this.target ? {
            Function: "ActionBar",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ActionBar",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setChatColor(...items) {
        push(this.target ? {
            Function: "ChatColor",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ChatColor",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    teleport(...items) {
        push(this.target ? {
            Function: "Teleport",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Teleport",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    randomTeleport(...items) {
        push(this.target ? {
            Function: "RngTeleport",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RngTeleport",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    tpSequence(...items) {
        push(this.target ? {
            Function: "TpSequence",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "TpSequence",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    launchUp(...items) {
        push(this.target ? {
            Function: "LaunchUp",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "LaunchUp",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    launchForward(...items) {
        push(this.target ? {
            Function: "LaunchFwd",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "LaunchFwd",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    launchToward(...items) {
        push(this.target ? {
            Function: "launchToward",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "launchToward",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    ride(...items) {
        push(this.target ? {
            Function: "RideEntity",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RideEntity",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    damage(...items) {
        push(this.target ? {
            Function: "Damage",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Damage",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    heal(...items) {
        push(this.target ? {
            Function: "Heal",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Heal",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    giveEffect(...items) {
        push(this.target ? {
            Function: "GiveEffect",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "GiveEffect",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    removeEffect(...items) {
        push(this.target ? {
            Function: "RemoveEffect",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RemoveEffect",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    clearEffects(...items) {
        push(this.target ? {
            Function: "ClearEffects",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ClearEffects",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setXPLevel(...items) {
        push(this.target ? {
            Function: "SetXPLvl",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetXPLvl",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setXPProg(...items) {
        push(this.target ? {
            Function: "SetXPProg",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetXPProg",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }
    
    setHungerBar(...items) {
        push(this.target ? {
            Function: "SetFoodLevel",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetFoodLevel",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setSaturation(...items) {
        push(this.target ? {
            Function: "SetSaturation",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetSaturation",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setMaxHealth(...items) {
        push(this.target ? {
            Function: "SetMaxHealth",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetMaxHealth",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setAttackSpeed(...items) {
        push(this.target ? {
            Function: "SetAttackSpeed",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetAttackSpeed",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setOnFire(...items) {
        push(this.target ? {
            Function: "SetFire",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetFire",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }
    
    setFlightSpeed(...items) {
        push(this.target ? {
            Function: "FlightSpeed",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "FlightSpeed",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setWalkSpeed(...items) {
        push(this.target ? {
            Function: "WalkSpeed",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "WalkSpeed",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    launchProjectile(...items) {
        push(this.target ? {
            Function: "LaunchProj",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "LaunchProj",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    removeArrows(...items) {
        push(this.target ? {
            Function: "RmArrows",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RmArrows",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    mobDisguise(...items) {
        push(this.target ? {
            Function: "MobDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "MobDisguise",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    playerDisguise(...items) {
        push(this.target ? {
            Function: "PlayerDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "PlayerDisguise",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    blockDisguise(...items) {
        push(this.target ? {
            Function: "BlockDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "BlockDisguise",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    undisguise(...items) {
        push(this.target ? {
            Function: "Undisguise",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Disguise",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    hideOwnDisguise(...items) {
        push(this.target ? {
            Function: "hideOwnDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "hideOwnDisguise",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enablePVP(...items) {
        push(this.target ? {
            Function: "EnablePVP",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "EnablePVP",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disablePVP(...items) {
        push(this.target ? {
            Function: "DisablePVP",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "DisablePVP",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setTime(...items) {
        push(this.target ? {
            Function: "SetTime",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "SetTime",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableFlight(...items) {
        push(this.target ? {
            Function: "EnableFlight",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "EnableFlight",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableFlight(...items) {
        push(this.target ? {
            Function: "DisableFlight",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "DisableFlight",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableBlockDropping(...items) {
        push(this.target ? {
            Function: "AllowDrops",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "AllowDrops",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableBlockDropping(...items) {
        push(this.target ? {
            Function: "DisallowDrops",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "DisallowDrops",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableKeepInventory(...items) {
        push(this.target ? {
            Function: "KeepInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "KeepInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableKeepInv(...items) {
        push(this.target ? {
            Function: "NoKeepInv",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "NoKeepInv",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setWeatherClear(...items) {
        push(this.target ? {
            Function: "WeatherClear",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "WeatherClear",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }
    
    setWeatherRain(...items) {
        push(this.target ? {
            Function: "WeatherDown",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "WeatherDown",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableProjCollisions(...items) {
        push(this.target ? {
            Function: "ProjColl",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "ProjColl",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableProjCollisions(...items) {
        push(this.target ? {
            Function: "NoProjColl",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "NoProjColl",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }
    
    enableNaturalRegen(...items) {
        push(this.target ? {
            Function: "NatRegen",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "NatRegen",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableNaturalRegen(...items) {
        push(this.target ? {
            Function: "NoNatRegen",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "NoNatRegen",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableBlockPlacing(...items) {
        push(this.target ? {
            Function: "EnableBlocks",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "EnableBlocks",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableBlockPlacing(...items) {
        push(this.target ? {
            Function: "DisableBlocks",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "DisableBlocks",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    enableDeathDrops(...items) {
        push(this.target ? {
            Function: "DeathDrops",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "DeathDrops",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    disableDeathDrops(...items) {
        push(this.target ? {
            Function: "NoDeathDrops",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "NoDeathDrops",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    setGamemode(gamemode) {
        const gamemodes = { survival: "GmSurvival", adventure: "GmAdventure" };
        const gm = gamemodes[gamemode];
        if (!gm) throw new Error("Invalid gamemode");
        push(this.target ? {
            Function: gm,
            Target: this.target,
            Name: "PLAYER_ACTION"
        } : {
            Function: gm,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    rollbackBlocks(...items) {
        push(this.target ? {
            Function: "Rollback",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Rollback",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    respawn(...items) {
        push(this.target ? {
            Function: "Respawn",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Respawn",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    kick(...items) {
        push(this.target ? {
            Function: "Kick",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "Kick",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }

    rewardCredits(...items) {
        push(this.target ? {
            Function: "RewardCredits",
            Target: this.target,
            ChestItems: items,
            Name: "PLAYER_ACTION"
        } : {
            Function: "RewardCredits",
            ChestItems: items,
            Name: "PLAYER_ACTION"
        });

        this._reset();
    }
}

class Entity {
    on(event, fn) {
        push({
            Function: event,
            Name: "ENTITY_EVENT"
        });

        fn();
    }

    setTarget(target) {
        this.target = targets.entities.includes(target) ? target : null;
    }

    _reset() {
        this.target = null;
    }

    setArmor(...items) {
        push(this.target ? {
            Function: "SetArmor",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetArmor",
            ChestItems: items,
            Name: "ENTITY_ACTION"
        });

        this._reset();
    }

    launchProjectile(...items) {
        push(this.target ? {
            Function: "LaunchProj",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "LaunchProj",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    teleport(...items) {
        push(this.target ? {
            Function: "Teleport",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Teleport",
            ChestItems: items,
            Name: "ENTITY_ACTION"
        });

        this._reset();
    }

    tpSequence(...items) {
        push(this.target ? {
            Function: "TpSequence",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "TpSequence",
            ChestItems: items,
            Name: "ENTITY_EVENT"
        });

        this._reset();
    }

    remove(...items) {
        push(this.target ? {
            Function: "Remove",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Remove",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    setName(...items) {
        push(this.target ? {
            Function: "SetName",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetName",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    hideName(...items) {
        push(this.target ? {
            Function: "HideName",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "HideName",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    showName(...items) {
        push(this.target ? {
            Function: "ShowName",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "ShowName",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    damage(...items) {
        push(this.target ? {
            Function: "Damage",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Damage",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    heal(...items) {
        push(this.target ? {
            Function: "Heal",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Heal",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    giveEffect(...items) {
        push(this.target ? {
            Function: "GiveEffect",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "GiveEffect",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    removeName(...items) {
        push(this.target ? {
            Function: "RemoveEffect",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "RemoveEffect",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    launchUp(...items) {
        push(this.target ? {
            Function: "LaunchUp",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "LaunchUp",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    launchForward(...items) {
        push(this.target ? {
            Function: "LaunchFwd",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "LaunchFwd",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    launchToward(...items) {
        push(this.target ? {
            Function: "LaunchToward",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "LaunchToward",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    mobDisguise(...items) {
        push(this.target ? {
            Function: "MobDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "MobDisguise",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    playerDisguise(...items) {
        push(this.target ? {
            Function: "PlayerDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "PlayerDisguise",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    blockDisguise(...items) {
        push(this.target ? {
            Function: "BlockDisguise",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "BlockDisguise",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    undisguise(...items) {
        push(this.target ? {
            Function: "Undisguise",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Undisguise",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    enableDrops(...items) {
        push(this.target ? {
            Function: "DropItems",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "DropItems",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    disableDrops(...items) {
        push(this.target ? {
            Function: "NoDrops",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "NoDrops",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    setMaxHealth(...items) {
        push(this.target ? {
            Function: "SetMaxHealth",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetMaxHealth",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    enableProjCollisions(...items) {
        push(this.target ? {
            Function: "ProjColl",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "ProjColl",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    disableProjCollisions(...items) {
        push(this.target ? {
            Function: "NoProjColl",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "NoProjColl",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    enableAI(...items) {
        push(this.target ? {
            Function: "EnableAI",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "EnableAI",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    disableAI(...items) {
        push(this.target ? {
            Function: "NoAI",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "NoAI",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    setFire(...items) {
        push(this.target ? {
            Function: "SetFire",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetFire",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    setAge(...items) {
        push(this.target ? {
            Function: "SetAge/Size",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetAge/Size",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    silence(...items) {
        push(this.target ? {
            Function: "Silence",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Silence",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    unsilence(...items) {
        push(this.target ? {
            Function: "Unsilence",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Unsilence",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    enableGravity(...items) {
        push(this.target ? {
            Function: "Gravity",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "Gravity",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    disableGravity(...items) {
        push(this.target ? {
            Function: "NoGravity",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "NoGravity",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    setTarget(...items) {
        push(this.target ? {
            Function: "SetTarget",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "SetTarget",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    ride(...items) {
        push(this.target ? {
            Function: "RideEntity",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "RideEntity",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }

    moveTo(...items) {
        push(this.target ? {
            Function: "MoveTo",
            Target: this.target,
            ChestItems: items,
            Name: "ENTITY_ACTION"
        } : {
            Function: "MoveTo",
            ChestItems: items,
            NAME: "ENTITY_ACTION"
        });

        this._reset();
    }
}

class Game {
    spawnMob({ entity, location, health, name, potionEffects, armor }) {
        let items = [];

        items.push(entity);
        items.push(location);
        if (health) items.push(health);
        if (name) items.push(name);
        if (potionEffects) items = items.concat(potionEffects);

        if (armor && armor.length >= 1) {
            if (armor.length < 4) armor = armor.fill({}, armor.length);

            const emptySlots = (27 - armor.length) - items.length;
            items.fill({}, emptySlots - 1);
        }

        push({
            Function: "SpawnMob",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    spawnItem(...items) {
        push({
            Function: "SpawnItem",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    launchFirework(...items) {
        push({
            Function: "Firework",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    spawnTNT(...items) {
        push({
            Function: "SpawnTNT",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    spawnVehicle(...items) {
        push({
            Function: "SpawnVehicle",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    spawnXPOrb(...items) {
        push({
            Function: "SpawnExpOrb",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    wait(...items) {
        push({
            Function: "Wait",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    startLoop(...items) {
        push({
            Function: "StartLoop",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    stopLoop(...items) {
        push({
            Function: "StopLoop",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    cancelEvent(...items) {
        push({
            Function: "CancelEvent",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    setBlocks(...items) {
        push({
            Function: "SetBlock",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    breakBlock(...items) {
        push({
            Function: "BreakBlock",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    copyBlocks(...items) {
        push({
            Function: "CopyBlocks",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    fillContainer(...items) {
        push({
            Function: "FillHolder",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    emptyContainer(...items) {
        push({
            Function: "EmptyHolder",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    setSign(...items) {
        push({
            Function: "ChangeSign",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    enableBlockDrops(...items) {
        push({
            Function: "BlockDropsOn",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    disableBlockDrops(...items) {
        push({
            Function: "BlockDropsOff",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    showSideBar(...items) {
        push({
            Function: "ShowSidebar",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    hideSidebar(...items) {
        push({
            Function: "HideSidebar",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    setObjective(...items) {
        push({
            Function: "SetScObj",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    setScore(...items) {
        push({
           Function: "SetScore",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    removeScore(...items) {
        push({
            Function: "removeScore",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    clearScoreboard(...items) {
        push({
            Function: "clearScoreboard",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createHologram(...items) {
        push({
            Function: "CreateHologram",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    removeHologram(...items) {
        push({
            Function: "RemoveHologram",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createExplosion(...items) {
        push({
            Function: "Explosion",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    playFireworkEffect(...items) {
        push({
            Function: "FireworkEffect",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    playParticleEffect(...items) {
        push({
            Function: "Particle FX",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleLine(...items) {
        push({
            Function: "PFX Line",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleRay(...items) {
        push({
            Function: "PFX Ray",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticlePath(...items) {
        push({
            Function: "PFX Path",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleCircle(...items) {
        push({
            Function: "PFX Circle",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleSphere(...items) {
        push({
            Function: "PFX Sphere",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleCluster(...items) {
        push({
            Function: "PFX Cluster",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createParticleSpiral(...items) {
        push({
            Function: "PFX Spiral",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createAnimatedLine(...items) {
        push({
            Function: "PFX Line [A]",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createAnimatedCircle(...items) {
        push({
            Function: "PFX Circle [A]",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }

    createAnimatedSpiral(...items) {
        push({
            Function: "PFX Spiral [A]",
            ChestItems: items,
            Name: "GAME_ACTION"
        });
    }
}

function selectObject(options, ...items) {
    const data = {
        Function: options.filter,
        ChestItems: items,
        Name: "SELECT_OBJECT"
    };

    if (options.subfilter) data.SubFunction = options.subfilter;
    if (options.not) data.ConditionalNot = 1;

    push(data);
}

function callFunction(name) {
    push({
        DynamicFunction: name,
        Name: "CALL_FUNCTION"
    })
}

function createFunction(name, item) {
    push({
        ChestItems: [item],
        DynamicFunction: name,
        Name: "FUNCTION"
    });
}

function loop(ticks) {
    if (ticks < 10) throw new Error("Loop must be 10 ticks or higher.");

    push({
        DynamicFunction: ticks.toString(),
        Name: "LOOP"
    })
}

function control(mode) {
    push({
        Function: mode,
        Name: "CONTROL"
    });
}

function setVar(operation, ...items) {
    push({
        Function: operation,
        ChestItems: items,
        Name: "SET_VARIABLE"
    });
}

function ifVar(operation, ...items) {
    push({
        Function: operation,
        ChestItems: items,
        CodeData: [],
        Name: "IF_VARIABLE"
    });
}

function ifPlayer(operation, ...items) {
    push({
        Function: operation,
        ChestItems: items,
        CodeData: [],
        Name: "IF_PLAYER"
    });
}

function ifEntity(operation, ...items) {
    push({
        Function: operation,
        ChestItems: items,
        CodeData: [],
        Name: "IF_ENTITY"
    })
}

function ifGame(operation, ...items) {
    push({
        Function: operation,
        ChestItems: items,
        CodeData: [],
        Name: "IF_GAME"
    })
}

function repeat(options, ...items) {
    const data = {
        Function: options.mode,
        CodeData: [],
        ConditionalNot: options.not ? 1 : 0,
        ChestItems: items,
        Name: "REPEAT"
    };

    if (options.modeFunction) data.SubFunction = options.modeFunction;

    push(data);
}

function elseBlock() {
    push({
        CodeData: [],
        Name: "ELSE"
    })
}

function setAuthor(name) {
    json.Author = name;
}

function compile(name = "compiled.dfcode", directory) {
    return new Promise((resolve, reject) => {
        console.log(`Compiling ${name.replace(".dfcode", "")}...`);
        const start = Date.now();

        console.log("Writing file...");
        writeFile(directory + "\\program.json", JSON.stringify(json).replace(/,"SPACER"/g, "").replace(/"SPACER",/g, ""), (err) => {
            if (err) return reject(err);

            console.log("Converting JSON to NBT...");
            exec(`java -jar converter.jar ${directory} ${name}`, { cwd: __dirname }, (err, stdout, stderr) => {
                if (err) return reject(err);
                if (stderr) return reject(stderr);

                try {
                    unlinkSync(directory + "\\program.json");
                } catch (e) {
                    return null;
                }

                console.log(`Conversion completed in ${Date.now() - start}ms. You can find your code in the ${name} file.`);

                json = { CodeData: [] };
                return resolve();
            }); 
        });
    });
}

exports.Player = Player;
exports.Entity = Entity;
exports.Game = Game;

exports.selectObject = selectObject;
exports.callFunction = callFunction;
exports.createFunction = createFunction;
exports.loop = loop;
exports.control = control;
exports.setVar = setVar;
exports.ifVar = ifVar;
exports.ifPlayer = ifPlayer;
exports.ifEntity = ifEntity;
exports.ifGame = ifGame;
exports.else = elseBlock;
exports.repeat = repeat;

exports.closeStatement = addSpacer;

exports.setAuthor = setAuthor;
exports.compile = compile;

exports.Item = Item;
exports.Location = LocationItem;
exports.Number = NumberItem;
exports.ParticleEffect = ParticleEffectItem
exports.PotionEffect = PotionEffectItem;
exports.SoundEffect = SoundEffectItem;
exports.SpawnEgg = SpawnEggItem;
exports.Text = TextItem;
exports.Value = ValueItem;
exports.Var = VarItem;
