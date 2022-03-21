import { IEquipmentItem } from "./data-interfaces";

/*
* The data here is/may be copyrighted and NOT included in the GPLv3 license.
*/
export const mechISEquipmentEnergy: IEquipmentItem[] = [
    {
        isAmmo: true,
        name: "Ammo (Heavy Flamer)",
        tag: "ammo-heavy-flamer",
        sort: "ammo, flamer, heavy",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 2000,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 1,
        heat: 0,
        weight: 1,
        range: {
            min: 0,
            short: 2,
            medium: 3,
            long: 4
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: true,
        weaponType: [
            "X"
        ],
        techRating: "c",
        book: "TO",
        page: 312,
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
        isAmmo: true,
        name: "Ammo (Heavy Flamer Coolant)",
        tag: "ammo-heavy-flamer-coolant",
        sort: "ammo, flamer, heavy, coolant",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 3000,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 2,
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: true,
        weaponType: [
            "X"
        ],
        techRating: "c",
        book: "TO",
        page: 361,
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
        isAmmo: true,
        name: "Ammo (Heavy Flamer Inferno)",
        tag: "ammo-heavy-flamer-inferno",
        sort: "ammo, flamer, heavy, inferno",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 5000,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 4,
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: true,
        weaponType: [
            "X"
        ],
        techRating: "d",
        book: "TO",
        page: 361,
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
        isAmmo: true,
        name: "Ammo (Heavy Flamer Water)",
        tag: "ammo-heavy-flamer-water",
        sort: "ammo, flamer, heavy, water",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 500,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 2,
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: true,
        weaponType: [
            "X"
        ],
        techRating: "a",
        book: "TO",
        page: 362,
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
        isAmmo: true,
        name: "Ammo (Plasma Rifle)",
        tag: "ammo-plasma-rifle",
        sort: "ammo, plasma rifle",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 10000,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 26,
        heat: 0,
        weight: 1,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DB",
            "AI"
        ],
        techRating: "e",
        book: "TM",
        page: 235,
        alphaStrike: {
            heat: 10,
            rangeShort: 1,
            rangeMedium: 1,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: [
                "Heat"
            ]
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
        isAmmo: true,
        name: "Ammo (Vehicle Flamer Coolant)",
        tag: "ammo-vehicle-flamer-coolant",
        sort: "ammo, flamer, vehicle, coolant",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 3000,
        introduced: 2050,
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
        techRating: "c",
        book: "TO",
        page: 316,
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
        isAmmo: true,
        name: "Ammo (Vehicle Flamer Inferno)",
        tag: "ammo-vehicle-flamer-inferno",
        sort: "ammo, flamer, vehicle, inferno",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 5000,
        introduced: 2400,
        extinct: 0,
        reintroduced: 0,
        battleValue: 2,
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
        techRating: "d",
        book: "TO",
        page: 316,
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
        isAmmo: true,
        name: "Ammo (Vehicle Flamer Water)",
        tag: "ammo-vehicle-flamer-water",
        sort: "ammo, flamer, vehicle, water",
        category: "Ammunition",
        damage: 0,
        notes: "",
        damageAero: 0,
        accuracyModifier: 0,
        cbills: 500,
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
        techRating: "a",
        book: "TO",
        page: 316,
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
        name: "Binary Laser Cannon",
        tag: "blazer",
        sort: "Laser, binary",
        category: "Energy Weapons",
        damage: 12,
        damageAero: 12,
        accuracyModifier: 0,
        cbills: 200000,
        introduced: 2812,
        extinct: 0,
        reintroduced: 0,
        battleValue: 222,
        heat: 16,
        weight: 9,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 4,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 4,
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
        techRating: "d",
        book: "TO",
        page: 319,
        alphaStrike: {
            heat: 16,
            rangeShort: 1.2,
            rangeMedium: 1.2,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 16
    },
    {
        name: "Bombast Laser",
        tag: "bombast-laser",
        sort: "laser, bombast",
        category: "Energy Weapons",
        damage: 12,
        damageAero: 12,
        accuracyModifier: 3,
        cbills: 200000,
        introduced: 3064,
        extinct: 0,
        reintroduced: 0,
        battleValue: 137,
        heat: 12,
        weight: 7,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 3,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 3,
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
        book: "TO",
        page: 320,
        alphaStrike: {
            heat: 12,
            rangeShort: 1.02,
            rangeMedium: 1.02,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 12
    },
    {
        name: "ER Flamer",
        tag: "er-flamer",
        category: "Energy Weapons",
        damage: 2,
        sort: "flamer, er",
        damageAero: 2,
        accuracyModifier: 0,
        cbills: 15000,
        introduced: 3070,
        extinct: 0,
        reintroduced: 0,
        battleValue: 1,
        heat: 4,
        weight: 1,
        range: {
            min: 0,
            short: 3,
            medium: 5,
            long: 7
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
        techRating: "d",
        book: "TO",
        page: 312,
        alphaStrike: {
            heat: 4,
            rangeShort: 0.2,
            rangeMedium: 0.2,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: [
                "Heat"
            ]
        },
        heatAero: 4
    },
    {
        name: "ER Large Laser",
        tag: "er-large-laser",
        sort: "laser, er, 2, large",
        category: "Energy Weapons",
        damage: 8,
        damageAero: 8,
        accuracyModifier: 0,
        cbills: 200000,
        introduced: 2620,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 163,
        heat: 12,
        weight: 5,
        range: {
            min: 0,
            short: 7,
            medium: 14,
            long: 19
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        techRating: "c",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 12,
            rangeShort: 0.8,
            rangeMedium: 0.8,
            rangeLong: 0.8,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 12
    },
    {
        name: "ER Medium Laser",
        tag: "er-medium-laser",
        sort: "laser, er, 1, medium",
        category: "Energy Weapons",
        damage: 5,
        damageAero: 5,
        accuracyModifier: 0,
        cbills: 80000,
        introduced: 3058,
        extinct: 0,
        reintroduced: 0,
        battleValue: 62,
        heat: 5,
        weight: 1,
        range: {
            min: 0,
            short: 4,
            medium: 8,
            long: 12
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
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 5,
            rangeShort: 0.5,
            rangeMedium: 0.5,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 5
    },
    {
        name: "Extended-Range PPC",
        tag: "er-ppc",
        sort: "ppc, er",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: 0,
        cbills: 300000,
        introduced: 2751,
        extinct: 2860,
        reintroduced: 3037,
        battleValue: 229,
        heat: 15,
        weight: 7,
        range: {
            min: 0,
            short: 7,
            medium: 14,
            long: 23
        },
        space: {
            battlemech: 3,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 3,
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
        page: 233,
        alphaStrike: {
            heat: 15,
            rangeShort: 1,
            rangeMedium: 1,
            rangeLong: 1,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 15
    },
    {
        name: "ER Small Laser",
        tag: "er-small-laser",
        sort: "laser, er, 0, small",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: 0,
        cbills: 11250,
        introduced: 3058,
        extinct: 0,
        reintroduced: 0,
        battleValue: 17,
        heat: 2,
        weight: 0.5,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 5
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
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.3,
            rangeMedium: 0.3,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 2
    },
    {
        name: "Heavy Flamer",
        tag: "heavy-flamer",
        category: "Energy Weapons",
        sort: "flamer, heavy",
        damage: 4,
        damageAero: 4,
        accuracyModifier: 0,
        cbills: 11250,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 1,
        heat: 5,
        weight: 1.5,
        range: {
            min: 0,
            short: 2,
            medium: 3,
            long: 4
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
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE",
            "H"
        ],
        techRating: "c",
        book: "TO",
        page: 312,
        alphaStrike: {
            heat: 5,
            rangeShort: 0.4,
            rangeMedium: 0.4,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: false,
            notes: [
                "Heat"
            ]
        },
        heatAero: 5
    },
    {
        name: "Heavy PPC",
        tag: "heavy-ppc",
        sort: "ppc, 2, heavy",
        category: "Energy Weapons",
        damage: 15,
        damageAero: 15,
        accuracyModifier: 0,
        cbills: 250000,
        introduced: 3067,
        extinct: 0,
        reintroduced: 0,
        battleValue: 317,
        heat: 15,
        weight: 10,
        range: {
            min: 3,
            short: 6,
            medium: 12,
            long: 18
        },
        space: {
            battlemech: 4,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 4,
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
        page: 234,
        alphaStrike: {
            heat: 15,
            rangeShort: 1.125,
            rangeMedium: 1.5,
            rangeLong: 1.5,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 15
    },
    {
        name: "Large Laser",
        tag: "large-laser",
        sort: "laser, 2, large",
        category: "Energy Weapons",
        damage: 8,
        damageAero: 8,
        accuracyModifier: 0,
        cbills: 100000,
        introduced: 2316,
        extinct: 0,
        reintroduced: 0,
        battleValue: 123,
        heat: 8,
        weight: 5,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        techRating: "c",
        book: "TM",
        page: 227,
        alphaStrike: {
            heat: 8,
            rangeShort: 0.8,
            rangeMedium: 0.8,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 8
    },
    {
        name: "Large Pulse Laser",
        tag: "large-pulse-laser",
        sort: "laser, pulse, 2, large",
        category: "Energy Weapons",
        damage: 9,
        damageAero: 9,
        accuracyModifier: -2,
        cbills: 175000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 119,
        heat: 10,
        weight: 7,
        range: {
            min: 0,
            short: 3,
            medium: 7,
            long: 10
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
            rangeShort: 0.99,
            rangeMedium: 0.99,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10
    },
    {
        name: "Large Variable-Speed Pulse Laser",
        tag: "large-vspl",
        sort: "laser, vspl, 2, large",
        category: "Energy Weapons",
        damage: {
            short: 11,
            medium: 9,
            long: 7,
            aeroShort: 10,
            aeroMedium: 7,
            aeroLong: 0
        },
        accuracyModifier: {
            short: -3,
            medium: -2,
            long: -1
        },
        cbills: 456000,
        introduced: 3070,
        extinct: 0,
        reintroduced: 0,
        battleValue: 123,
        heat: 10,
        weight: 9,
        range: {
            min: 0,
            short: 4,
            medium: 8,
            long: 15
        },
        space: {
            battlemech: 4,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 4,
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
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 14,
            rangeShort: 1.265,
            rangeMedium: 0.863,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10
    },
    {
        name: "Large X-Pulse Laser",
        tag: "large-x-pulse-laser",
        sort: "laser, x-pulse, 2, large",
        category: "Energy Weapons",
        damage: 9,
        damageAero: 9,
        accuracyModifier: -2,
        cbills: 175000,
        introduced: 3057,
        extinct: 0,
        reintroduced: 0,
        battleValue: 119,
        heat: 10,
        weight: 7,
        range: {
            min: 0,
            short: 3,
            medium: 7,
            long: 10
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 14,
            rangeShort: 0.99,
            rangeMedium: 0.99,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10
    },
    {
        name: "Light PPC",
        tag: "light-ppc",
        sort: "ppc, 0, light",
        category: "Energy Weapons",
        damage: 5,
        damageAero: 5,
        accuracyModifier: 0,
        cbills: 150000,
        introduced: 3067,
        extinct: 0,
        reintroduced: 0,
        battleValue: 88,
        heat: 5,
        weight: 3,
        range: {
            min: 3,
            short: 6,
            medium: 12,
            long: 18
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        techRating: "e",
        book: "TM",
        page: 234,
        alphaStrike: {
            heat: 5,
            rangeShort: 0.375,
            rangeMedium: 0.5,
            rangeLong: 0.5,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 5
    },
    {
        name: "Medium Laser",
        tag: "medium-laser",
        sort: "laser, 1, medium",
        category: "Energy Weapons",
        damage: 5,
        damageAero: 5,
        accuracyModifier: 0,
        cbills: 40000,
        introduced: 2300,
        extinct: 0,
        reintroduced: 0,
        battleValue: 46,
        heat: 3,
        weight: 1,
        range: {
            min: 0,
            short: 3,
            medium: 6,
            long: 9
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
        page: 227,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.5,
            rangeMedium: 0.5,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 3
    },
    {
        name: "Medium Pulse Laser",
        tag: "medium-pulse-laser",
        sort: "laser, pulse, 1, medium",
        category: "Energy Weapons",
        damage: 6,
        damageAero: 6,
        accuracyModifier: -2,
        cbills: 60000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 48,
        heat: 4,
        weight: 2,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 6
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
        page: 226,
        alphaStrike: {
            heat: 4,
            rangeShort: 0.66,
            rangeMedium: 0.66,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 4
    },
    {
        name: "Medium Variable-Speed Pulse Laser",
        tag: "medium-vspl",
        sort: "laser, vspl, 1, medium",
        category: "Energy Weapons",
        damage: {
            short: 9,
            medium: 7,
            long: 5,
            aeroShort: 7,
            aeroMedium: 0,
            aeroLong: 0
        },
        accuracyModifier: {
            short: -3,
            medium: -2,
            long: -1
        },
        cbills: 200000,
        introduced: 3070,
        extinct: 0,
        reintroduced: 0,
        battleValue: 56,
        heat: 7,
        weight: 4,
        range: {
            min: 0,
            short: 2,
            medium: 5,
            long: 9
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 6,
            rangeShort: 1.035,
            rangeMedium: 0.648,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 7
    },
    {
        name: "Medium X-Pulse Laser",
        tag: "medium-x-pulse-laser",
        sort: "laser, x-pulse, 1, medium",
        category: "Energy Weapons",
        damage: 6,
        damageAero: 6,
        accuracyModifier: -2,
        cbills: 110000,
        introduced: 3057,
        extinct: 0,
        reintroduced: 0,
        battleValue: 71,
        heat: 6,
        weight: 2,
        range: {
            min: 0,
            short: 3,
            medium: 6,
            long: 9
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
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 6,
            rangeShort: 0.66,
            rangeMedium: 0.66,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 6
    },
    {
        name: "Plasma Rifle",
        tag: "plasma-rifle",
        sort: "plasmarifle",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: 0,
        cbills: 260000,
        introduced: 3068,
        extinct: 0,
        reintroduced: 0,
        battleValue: 210,
        heat: 10,
        weight: 6,
        range: {
            min: 0,
            short: 5,
            medium: 10,
            long: 15
        },
        space: {
            battlemech: 2,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 2,
            aerospaceFighter: 1,
            smallCraft: 1,
            dropShip: 1
        },
        ammoPerTon: 10,
        minAmmoTons: 1,
        explosive: false,
        weaponType: [
            "DE",
            "H"
        ],
        techRating: "e",
        book: "TM",
        page: 235,
        alphaStrike: {
            heat: 10,
            rangeShort: 1,
            rangeMedium: 1,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                "Heat"
            ]
        },
        heatAero: 10
    },
    {
        name: "Small Laser",
        sort: "laser, 0, small",
        tag: "small-laser",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: 0,
        cbills: 11250,
        introduced: 2300,
        extinct: 0,
        reintroduced: 0,
        battleValue: 9,
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
        page: 227,
        alphaStrike: {
            heat: 1,
            rangeShort: 0.3,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 1
    },
    {
        name: "Small Pulse Laser",
        tag: "small-pulse-laser",
        sort: "laser, pulse, 0, small",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: -2,
        cbills: 16000,
        introduced: 2609,
        extinct: 2950,
        reintroduced: 3037,
        battleValue: 12,
        heat: 2,
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
            "P",
            "AI"
        ],
        techRating: "e",
        book: "TM",
        page: 226,
        alphaStrike: {
            heat: 2,
            rangeShort: 0.33,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                "Point Defense"
            ]
        },
        heatAero: 2
    },
    {
        name: "Small Variable-Speed Pulse Laser",
        tag: "small-vspl",
        sort: "laser, vspl, 0, small",
        category: "Energy Weapons",
        damage: {
            short: 5,
            medium: 4,
            long: 3,
            aeroShort: 4,
            aeroMedium: 0,
            aeroLong: 0
        },
        accuracyModifier: {
            short: -3,
            medium: -2,
            long: -1
        },
        cbills: 60000,
        introduced: 3070,
        extinct: 0,
        reintroduced: 0,
        battleValue: 22,
        heat: 3,
        weight: 2,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 6
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
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.575,
            rangeMedium: 0.378,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 3
    },
    {
        name: "Small X-Pulse Laser",
        tag: "small-x-pulse-laser",
        sort: "laser, x-pulse, 0, small",
        category: "Energy Weapons",
        damage: 3,
        damageAero: 3,
        accuracyModifier: -2,
        cbills: 31000,
        introduced: 3057,
        extinct: 0,
        reintroduced: 0,
        battleValue: 21,
        heat: 3,
        weight: 1,
        range: {
            min: 0,
            short: 2,
            medium: 4,
            long: 5
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
            "P",
            "AI"
        ],
        techRating: "e",
        book: "TO",
        page: 321,
        alphaStrike: {
            heat: 3,
            rangeShort: 0.33,
            rangeMedium: 0,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: [
                "Point Defense"
            ]
        },
        heatAero: 3
    },
    {
        name: "Snub-Nose PPC",
        tag: "snub-nose-ppc",
        sort: "ppc, snub-nose",
        category: "Energy Weapons",
        damage: {
            short: 10,
            medium: 8,
            long: 5,
            aeroShort: 10,
            aeroMedium: 8,
            aeroLong: 0
        },
        accuracyModifier: 0,
        cbills: 300000,
        introduced: 2784,
        extinct: 2790,
        reintroduced: 3067,
        battleValue: 165,
        heat: 10,
        weight: 6,
        range: {
            min: 0,
            short: 9,
            medium: 13,
            long: 15
        },
        space: {
            battlemech: 2,
            protomech: -1,
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
        techRating: "e",
        book: "TM",
        page: 234,
        alphaStrike: {
            heat: 10,
            rangeShort: 1,
            rangeMedium: 0.65,
            rangeLong: 0,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10
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
        heatAero: 3
    },
    {
        name: "PPC",
        tag: "standard-ppc",
        sort: "ppc, 1, standard",
        category: "Energy Weapons",
        damage: 10,
        damageAero: 10,
        accuracyModifier: 0,
        cbills: 200000,
        introduced: 2460,
        extinct: 0,
        reintroduced: 0,
        battleValue: 176,
        heat: 10,
        weight: 7,
        range: {
            min: 3,
            short: 6,
            medium: 12,
            long: 18
        },
        space: {
            battlemech: 3,
            protomech: -1,
            combatVehicle: 1,
            supportVehicle: 3,
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
        techRating: "d",
        book: "TM",
        page: 234,
        alphaStrike: {
            heat: 10,
            rangeShort: 0.75,
            rangeMedium: 1,
            rangeLong: 1,
            rangeExtreme: 0,
            tc: true,
            notes: []
        },
        heatAero: 10
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
        heatAero: 3
    }
]