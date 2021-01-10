import { IEquipmentItem } from "./dataInterfaces";

/*
 * The data here is/may be copyrighted and NOT included in the GPLv3 license.
 */
export const mechISEquipmentMissiles: IEquipmentItem[] = [

	// Missiles
	{
		name: "LRM 5",
		tag: "lrm-5",
		sort: "lrm-5",
		category: "Missile Weapons",
		damage: 1,
		damageAero: 3,
		accuracyModifier: 0,
		cbills: 30000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battleValue: 45,
		battleValueOneShot: 9,
		heat: 2,
		weight: 2,
		range: {
			min: 6,
			short: 7,
			medium: 14,
			long: 21,
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
		ammoPerTon: 24,
		minAmmoTons: 1,
		explosive: false,
		weaponType: [
			// "DB",
			// "AI"
		],
		techRating: "c",
		book: "TM",
		page: 229,
		alphaStrike: {
			heat: 2,
			rangeShort: 0.14,
			rangeMedium: 0.3,
			rangeLong: 0.3,
			rangeExtreme: 0,
			tc: 0,
			notes: [
				"LRM",
				"Indirect Fire"
			]
		}
	},
	{
		name: "Ammo (LRM-5)",
		tag: "ammo-lrm-5",
		sort: "ammo, lrm-5",
		category: "Ammunition",
		damage: 0,
		damageAero: 0,
		accuracyModifier: 0,
		cbills: 30000,
		cbillsOneShot: 1250,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battleValue: 6,
		heat: 1,
		weight: 1,
		range: {
			min: 0,
			short: 0,
			medium: 0,
			long: 0,
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
		ammoPerTon: 24,
		minAmmoTons: 1,
		explosive: true,
		weaponType: [
		],
		techRating: "c",
		book: "TM",
		page: 229,
		alphaStrike: {
			heat: 0,
			rangeShort: 0,
			rangeMedium: 0,
			rangeLong: 0,
			rangeExtreme: 0,
			tc: 0,
			notes: []
		}
	}
];
