import { IEquipmentItem } from "./data-interfaces";

/*
* The data here is/may be copyrighted and NOT included in the GPLv3 license.
*/
export const mechClanEquipmentEnergy: IEquipmentItem[] = [
    {
        isAmmo: true,
        name: "Ammo (Plasma Cannon)",
        tag: "ammo-plasma-cannon",
        sort: "ammo-plasma, cannon",
        category: "Energy Weapons",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 0,
        introduced: 3069,
        extinct: 0,
        reintroduced: 0,
        battleValue: 21,
        heat: 0,
        weight: 3,
        range: {
            min: 0,
            short: 6,
            medium: 12,
            long: 18
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P"
        ],
        techRating: "e",
        book: "TM",
        page: 234,
        alphaStrike: {
            heat: 18,
            rangeShort: 1.52,
            rangeMedium: 1.52,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 0
    },
    {
        isAmmo: true,
        name: "Ammo (Vehicle Flamer)",
        tag: "ammo-vehicle-flamer",
        sort: "ammo, flamer, vehicle",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 1000,
        introduced: 1950,
        extinct: 0,
        reintroduced: 0,
        battleValue: 1,
        heat: 0,
        weight: 1,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 20,
        minAmmoTons: 1,
        explosive: true,
        weaponType: [
            "X"
        ],
        techRating: "b",
        book: "TM",
        page: 218,
        alphaStrike: {
            heat: 0,
            rangeShort: 0,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: []
        },
        heatAero: 0
    },
    {
        name: "ER Large Laser",
        tag: "er-large-laser",
        sort: "laser, er, 3, large",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: 0,
        cbills: 200000,
        introduced: 2620,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 248,
        heat: 12,
        weight: 4,
        range: {
            min: 0,
            short: 8,
            medium: 15,
            long: 25
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "c",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 12,
            rangeShort: 1,
            rangeMedium: 1,
            rangeLong: 1,
            rangeExtreme: 1,
            tc: true,
            notes: []
        },
        heatAero: 12,
        rangeAero: "e"
    },
    {
        name: "ER Medium Laser",
        tag: "er-medium-laser",
        sort: "laser, er, 2, medium",
        category: "Energy Weapons",
        damage: 7,
        damageAero: 7,
        accuracyModifier: 0,
        cbills: 80000,
        introduced: 3058,
        extinct: 0,
        reintroduced: 0,
        battleValue: 108,
        heat: 5,
        weight: 1,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 5,
            rangeShort: 0.7,
            rangeMedium: 0.7,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 5,
        rangeAero: "m"
    },
    {
        name: "ER Micro Laser",
        tag: "er-micro-laser",
        sort: "laser, er, 1, micro",
        category: "Energy Weapons",
        damage: 2,
        damageAero: 2,
        accuracyModifier: 0,
        cbills: 10000,
        introduced: 3060,
        extinct: 0,
        reintroduced: 0,
        battleValue: 7,
        heat: 1,
        weight: 0.25,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 1,
            rangeShort: 0.2,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 1,
        rangeAero: "s"
    },
    {
        name: "ER PPC",
        tag: "er-ppc",
        sort: "ppc, er",
        category: "Energy Weapons",
        damage: 15,
        damageAero: 15,
        accuracyModifier: 0,
        cbills: 300000,
        introduced: 2751,
        extinct: 2860,
        reintroduced: 3037,
        battleValue: 412,
        heat: 15,
        weight: 6,
        range: {
            min: 0,
            short: 7,
            medium: 14,
            long: 23
        },
        space: {
            battlemech: 2,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 2,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "f",
        book: "TM",
        page: 233,
        alphaStrike: {
            heat: 15,
            rangeShort: 1.5,
            rangeMedium: 1.5,
            rangeLong: 1.5,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 15,
        rangeAero: "l"
    },
    {
        name: "ER Small Laser",
        tag: "er-small-laser",
        sort: "laser, er, 1, small",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: 0,
        cbills: 11250,
        introduced: 3058,
        extinct: 0,
        reintroduced: 0,
        battleValue: 31,
        heat: 2,
        weight: 0.5,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 6
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 2,
            rangeShort: 0.5,
            rangeMedium: 0.5,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 2,
        rangeAero: "s"
    },
    {
        name: "Heavy Large Laser",
        tag: "large-heavy-laser",
        sort: "laser, heavy, 3, large",
        category: "Energy Weapons",
        damage: 16,
        damageAero: 16,
        accuracyModifier: 1,
        cbills: 250000,
        introduced: 3059,
        extinct: 0,
        reintroduced: 0,
        battleValue: 244,
        heat: 18,
        weight: 6,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 2,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 2,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 18,
            rangeShort: 1.52,
            rangeMedium: 1.52,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 18,
        rangeAero: "m"
    },
    {
        name: "Large Pulse Laser",
        tag: "large-pulse-laser",
        sort: "laser, pulse, 3, large",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: -2,
        cbills: 175000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 265,
        heat: 10,
        weight: 7,
        range: {
            min: 0,
            short: 6,
            medium: 14,
            long: 20
        },
        space: {
            battlemech: 2,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 2,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 10,
            rangeShort: 1.1,
            rangeMedium: 1.1,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10,
        rangeAero: "l"
    },
    {
        name: "Heavy Medium Laser",
        tag: "medium-heavy-laser",
        sort: "laser, heavy, 2, medium",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: 1,
        cbills: 100000,
        introduced: 3059,
        extinct: 0,
        reintroduced: 0,
        battleValue: 76,
        heat: 7,
        weight: 2,
        range: {
            min: 0,
            short: 3,
            medium: 6,
            long: 9
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 7,
            rangeShort: 0.95,
            rangeMedium: 0.95,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 7,
        rangeAero: "s"
    },
    {
        name: "Medium Pulse Laser",
        tag: "medium-pulse-laser",
        sort: "laser, pulse, 2, medium",
        category: "Energy Weapons",
        damage: 7,
        damageAero: 7,
        accuracyModifier: -2,
        cbills: 60000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 111,
        heat: 4,
        weight: 2,
        range: {
            min: 0,
            short: 4,
            medium: 8,
            long: 12
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 4,
            rangeShort: 0.77,
            rangeMedium: 0.77,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 4,
        rangeAero: "m"
    },
    {
        name: "Micro Pulse Laser",
        tag: "micro-pulse-laser",
        sort: "laser, pulse, 1, micro",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: -2,
        cbills: 12500,
        introduced: 3060,
        extinct: 0,
        reintroduced: 0,
        battleValue: 12,
        heat: 1,
        weight: 0.5,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P",
            "AI"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 1,
            rangeShort: 0.33,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                "Point Defense"
            ]
        },
        heatAero: 1,
        rangeAero: "s"
    },
    {
        name: "Plasma Cannon",
        tag: "plasma-cannon",
        sort: "plasma, cannon",
        category: "Energy Weapons",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 320000,
        introduced: 3069,
        extinct: 0,
        reintroduced: 0,
        battleValue: 170,
        heat: 7,
        weight: 3,
        range: {
            min: 0,
            short: 6,
            medium: 12,
            long: 18
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P"
        ],
        techRating: "e",
        book: "TM",
        page: 234,
        alphaStrike: {
            heat: 18,
            rangeShort: 1.52,
            rangeMedium: 1.52,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 7,
        rangeAero: "m"
    },
    {
        name: "Heavy Small Laser",
        tag: "small-heavy-laser",
        sort: "laser, heavy, 1, small",
        category: "Energy Weapons",
        damage: 6,
        damageAero: 6,
        accuracyModifier: 1,
        cbills: 20000,
        introduced: 3059,
        extinct: 0,
        reintroduced: 0,
        battleValue: 15,
        heat: 3,
        weight: 1,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.57,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                "Point Defense"
            ]
        },
        heatAero: 3,
        rangeAero: "s"
    },
    {
        name: "Small Pulse Laser",
        tag: "small-pulse-laser",
        sort: "laser, pulse, 1, small",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: -2,
        cbills: 16000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 24,
        heat: 2,
        weight: 1,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 6
        },
        space: {
            battlemech: 1,
            protomech: 1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "P",
            "AI"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 2,
            rangeShort: 0.33,
            rangeMedium: 0.33,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                ""
            ]
        },
        heatAero: 2,
        rangeAero: "s"
    },
    {
        name: "Flamer",
        tag: "standard-flamer",
        category: "Energy Weapons",
        sort: "flamer",
        damage: 2,
        damageAero: 2,
        accuracyModifier: 0,
        cbills: 7500,
        introduced: 2025,
        extinct: 0,
        reintroduced: 0,
        battleValue: 6,
        heat: 3,
        weight: 1,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 0,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE",
            "H"
        ],
        techRating: "b",
        book: "TM",
        page: 218,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.2,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: [
                "Heat",
                "Point Defense"
            ]
        },
        heatAero: 3,
        rangeAero: "s"
    },
    {
        name: "Vehicle Flamer",
        tag: "vehicle-flamer",
        category: "Energy Weapons",
        sort: "flamer, vehicle",
        damage: 2,
        damageAero: 2,
        accuracyModifier: 0,
        cbills: 7500,
        introduced: 1950,
        extinct: 0,
        reintroduced: 0,
        battleValue: 5,
        heat: 3,
        weight: 0.5,
        range: {
            min: 0,
            short: 1,
            medium: 2,
            long: 3
        },
        space: {
            battlemech: 1,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 1,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 20,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE",
            "H"
        ],
        techRating: "b",
        book: "TM",
        page: 218,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.2,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: [
                "Heat",
                "Point Defense"
            ]
        },
        heatAero: 3,
        rangeAero: "s"
    }
]