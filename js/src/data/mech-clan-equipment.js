/*
 * The data here is/may be copyrighted and NOT included in the MIT license.
 */
var mechClanEquipment = Array(
	{
		name: {
			'en-US': "Extended-Range PPC",
			'de-DE': "de - Extended-Range PPC",
		},
		tag: "er-ppc",
		sort: "ppc, er",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 15,
		damage_aero: 15,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2751,
		extinct: 2860,
		reintroduced: 3037,
		battlevalue: 412,
		ammo_battlevalue: 0,
		heat: 15,
		weight: 6,
		range_min: {
			min: 0,
			short: 7,
			medium: 14,
			long: 23,
		},
		space: {
			battlemech: 2,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "f",
		book: "TM",
		page: 233,
		alpha_strike: {
			heat: 15,
			range_short: 1.5,
			range_medium: 1.5,
			range_long: 1.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// ER Lasers
	{
		name: {
			'en-US': "ER Micro Laser",
			'de-DE': "de - ER Micro Laser",
		},
		tag: "er-micro-laser",
		sort: "laser, er, 1, micro",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 10000,
		introduced: 3060,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 7,
		ammo_battlevalue: 0,
		heat: 1,
		weight: 0.25,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},{
		name: {
			'en-US': "ER Small Laser",
			'de-DE': "de - ER Small Laser",
		},
		tag: "er-small-laser",
		sort: "laser, er, 1, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 3058,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 31,
		ammo_battlevalue: 0,
		heat: 2,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 2,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "ER Medium Laser",
			'de-DE': "de - ER Medium Laser",
		},
		tag: "er-medium-laser",
		sort: "laser, er, 2, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 7,
		damage_aero: 7,
		accuracy_modifier: 0,
		cbills: 80000,
		introduced: 3058,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 108,
		ammo_battlevalue: 0,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 5,
			range_short: 0.7,
			range_medium: 0.7,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "ER Large Laser",
			'de-DE': "de - ER Large Laser",
		},
		tag: "er-large-laser",
		sort: "laser, er, 3, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2620,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 248,
		ammo_battlevalue: 0,
		heat: 12,
		weight: 4,
		range_min: {
			min: 0,
			short: 8,
			medium: 15,
			long: 25,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 12,
			range_short: 1,
			range_medium: 1,
			range_long: 1,
			range_extreme: 1,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Pulse Lasers
	{
		name: {
			'en-US': "Micro Pulse Laser",
			'de-DE': "de - Micro Pulse Laser",
		},
		tag: "micro-pulse-laser",
		sort: "laser, pulse, 1, micro",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: -2,
		cbills: 12500,
		introduced: 3060,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 12,
		ammo_battlevalue: 0,
		heat: 1,
		weight: .5,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 1,
			range_short: 0.33,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Small Pulse Laser",
			'de-DE': "de - Small Pulse Laser",
		},
		tag: "small-pulse-laser",
		sort: "laser, pulse, 1, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: -2,
		cbills: 16000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 24,
		ammo_battlevalue: 0,
		heat: 2,
		weight: 1,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 2,
			range_short: 0.33,
			range_medium: 0.33,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				""
			)
		}
	},
	{
		name: {
			'en-US': "Medium Pulse Laser",
			'de-DE': "de - Medium Pulse Laser",
		},
		tag: "medium-pulse-laser",
		sort: "laser, pulse, 2, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 7,
		damage_aero: 7,
		accuracy_modifier: -2,
		cbills: 60000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 111,
		ammo_battlevalue: 0,
		heat: 4,
		weight: 2,
		range_min: {
			min: 0,
			short: 4,
			medium: 8,
			long: 12,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 4,
			range_short: 0.77,
			range_medium: 0.77,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large Pulse Laser",
			'de-DE': "de - Large Pulse Laser",
		},
		tag: "large-pulse-laser",
		sort: "laser, pulse, 3, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: -2,
		cbills: 175000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 265,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 0,
			short: 6,
			medium: 14,
			long: 20,
		},
		space: {
			battlemech: 2,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 10,
			range_short: 1.1,
			range_medium: 1.1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Flamers
	{
		name: {
			'en-US': "Flamer",
			'de-DE': "de - Flamer",
		},
		tag: "standard-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 7500,
		introduced: 2025,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 6,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 3,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat",
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Vehicle Flamer",
			'de-DE': "de - Vehicle Flamer",
		},
		tag: "vehicle-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		sort: "flamer, vehicle",
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 7500,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 3,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat",
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer)",
			'de-DE': "de - Ammo (Vehicle Flamer)",
		},
		tag: "ammo-vehicle-flamer",
		sort: "ammo, flamer, vehicle",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 1,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},{
		name: {
			'en-US': "Heavy Small Laser",
			'de-DE': "de - Heavy Small Laser",
		},
		tag: "small-heavy-laser",
		sort: "laser, heavy, 1, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
		damage_aero: 6,
		accuracy_modifier: 1,
		cbills: 20000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 3,
			range_short: 0.57,
			range_medium: 0.0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Heavy Medium Laser",
			'de-DE': "de - Heavy Medium Laser",
		},
		tag: "medium-heavy-laser",
		sort: "laser, heavy, 2, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 1,
		cbills: 100000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 76,
		ammo_battlevalue: 0,
		heat: 7,
		weight: 2,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 7,
			range_short: 0.95,
			range_medium: 0.95,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Heavy Large Laser",
			'de-DE': "de - Heavy Large Laser",
		},
		tag: "large-heavy-laser",
		sort: "laser, heavy, 3, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 16,
		damage_aero: 16,
		accuracy_modifier: 1,
		cbills: 250000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 244,
		ammo_battlevalue: 0,
		heat: 18,
		weight: 6,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: 1,
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 18,
			range_short: 1.52,
			range_medium: 1.52,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Plasma Cannon",
			'de-DE': "de - Plasma Cannon",
		},
		tag: "plasma-cannon",
		sort: "plasma, cannon",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 320000,
		introduced: 3069,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 170,
		ammo_battlevalue: 21,
		heat: 7,
		weight: 3,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 18,
			range_short: 1.52,
			range_medium: 1.52,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Plasma Cannon)",
			'de-DE': "de - Ammo (Plasma Cannon)",
		},
		tag: "ammo-plasma-cannon",
		sort: "ammo-plasma, cannon",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 0,
		introduced: 3069,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 170,
		ammo_battlevalue: 21,
		heat: 7,
		weight: 3,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 18,
			range_short: 1.52,
			range_medium: 1.52,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	}

);
