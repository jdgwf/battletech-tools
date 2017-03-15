/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechISEquipment = Array(
	/*
		ENERGY WEAPONS
	*/
	// Standard Lasers
	{
		name: {
			'en-US': "Small Laser",
			'de-DE': "de - Small Laser",
		},
		sort: "laser, 0, small",
		tag: "small-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		ammo_battlevalue: 0,
		heat: 1,
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
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 1,
			range_short: 0.3,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Medium Laser",
			'de-DE': "de - Medium Laser",
		},
		tag: "medium-laser",
		sort: "laser, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 40000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 46,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		page: 227,
		alpha_strike: {
			heat: 3,
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
			'en-US': "Large Laser",
			'de-DE': "de - Large Laser",
		},
		tag: "large-laser",
		sort: "laser, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
		damage_aero: 8,
		accuracy_modifier: 0,
		cbills: 100000,
		introduced: 2316,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		ammo_battlevalue: 0,
		heat: 8,
		weight: 5,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		tech_rating: "c",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 8,
			range_short: 0.8,
			range_medium: 0.8,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Binary Laser Cannon",
			'de-DE': "de - Binary Laser Cannon",
		},
		tag: "blazer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 12,
		damage_aero: 12,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2812,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 222,
		ammo_battlevalue: 0,
		heat: 16,
		weight: 9,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
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
		tech_rating: "d",
		book: "TO",
		page: 319,
		alpha_strike: {
			heat: 16,
			range_short: 1.2,
			range_medium: 1.2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// ER Lasers
	{
		name: {
			'en-US': "ER Small Laser",
			'de-DE': "de - ER Small Laser",
		},
		tag: "er-small-laser",
		sort: "laser, er, 0, small",
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
		battlevalue: 17,
		ammo_battlevalue: 0,
		heat: 2,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 5,
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
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 3,
			range_short: 0.3,
			range_medium: 0.3,
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
		sort: "laser, er, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 80000,
		introduced: 3058,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 62,
		ammo_battlevalue: 0,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 4,
			medium: 8,
			long: 12,
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
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 5,
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
			'en-US': "ER Large Laser",
			'de-DE': "de - ER Large Laser",
		},
		tag: "er-large-laser",
		sort: "laser, er, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
		damage_aero: 8,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2620,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 163,
		ammo_battlevalue: 0,
		heat: 12,
		weight: 5,
		range_min: {
			min: 0,
			short: 7,
			medium: 14,
			long: 19,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		tech_rating: "c",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 12,
			range_short: 0.8,
			range_medium: 0.8,
			range_long: 0.8,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Standard Pulse Lasers
	{
		name: {
			'en-US': "Small Pulse Laser",
			'de-DE': "de - Small Pulse Laser",
		},
		tag: "small-pulse-laser",
		sort: "laser, pulse, 0, small",
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
		battlevalue: 12,
		ammo_battlevalue: 0,
		heat: 2,
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
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 2,
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
			'en-US': "Medium Pulse Laser",
			'de-DE': "de - Medium Pulse Laser",
		},
		tag: "medium-pulse-laser",
		sort: "laser, pulse, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
		damage_aero: 6,
		accuracy_modifier: -2,
		cbills: 60000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 48,
		ammo_battlevalue: 0,
		heat: 4,
		weight: 2,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
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
		page: 226,
		alpha_strike: {
			heat: 4,
			range_short: 0.66,
			range_medium: 0.66,
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
		sort: "laser, pulse, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
		damage_aero: 9,
		accuracy_modifier: -2,
		cbills: 175000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 119,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 0,
			short: 3,
			medium: 7,
			long: 10,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
			range_short: 0.99,
			range_medium: 0.99,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// X-Pulse Lasers
	{
		name: {
			'en-US': "Small X-Pulse Laser",
			'de-DE': "de - Small X-Pulse Laser",
		},
		tag: "small-x-pulse-laser",
		sort: "laser, x-pulse, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: -2,
		cbills: 31000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 21,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 5,
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
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 3,
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
			'en-US': "Medium X-Pulse Laser",
			'de-DE': "de - Medium X-Pulse Laser",
		},
		tag: "medium-x-pulse-laser",
		sort: "laser, x-pulse, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
		damage_aero: 6,
		accuracy_modifier: -2,
		cbills: 110000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 71,
		ammo_battlevalue: 0,
		heat: 6,
		weight: 2,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 6,
			range_short: 0.66,
			range_medium: 0.66,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large X-Pulse Laser",
			'de-DE': "de - Large X-Pulse Laser",
		},
		tag: "large-x-pulse-laser",
		sort: "laser, x-pulse, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
		damage_aero: 9,
		accuracy_modifier: -2,
		cbills: 175000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 119,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 0,
			short: 3,
			medium: 7,
			long: 10,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 14,
			range_short: 0.99,
			range_medium: 0.99,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Variable-Speed Pulse Lasers
	{
		name: {
			'en-US': "Small Variable-Speed Pulse Laser",
			'de-DE': "de - Small Variable-Speed Pulse Laser",
		},
		tag: "small-vspl",
		sort: "laser, vspl, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 5,
			medium: 4,
			long: 3,
			aero_short: 4,
			aero_medium: 0,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 60000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 2,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
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
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 3,
			range_short: 0.575,
			range_medium: 0.378,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Medium Variable-Speed Pulse Laser",
			'de-DE': "de - Medium Variable-Speed Pulse Laser",
		},
		tag: "medium-vspl",
		sort: "laser, vspl, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 9,
			medium: 7,
			long: 5,
			aero_short: 7,
			aero_medium: 0,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 200000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 56,
		ammo_battlevalue: 0,
		heat: 7,
		weight: 4,
		range_min: {
			min: 0,
			short: 2,
			medium: 5,
			long: 9,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 6,
			range_short: 1.035,
			range_medium: 0.648,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large Variable-Speed Pulse Laser",
			'de-DE': "de - Large Variable-Speed Pulse Laser",
		},
		tag: "large-vspl",
		sort: "laser, vspl, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 11,
			medium: 9,
			long: 7,
			aero_short: 10,
			aero_medium: 7,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 456000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 9,
		range_min: {
			min: 0,
			short: 4,
			medium: 8,
			long: 15,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
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
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 14,
			range_short: 1.265,
			range_medium: 0.863,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Bombast Laser",
			'de-DE': "de - Bombast Laser",
		},
		tag: "bombast-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 12,
		damage_aero: 12,
		accuracy_modifier: 3,
		cbills: 200000,
		introduced: 3064,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 137,
		ammo_battlevalue: 0,
		heat: 12,
		weight: 7,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
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
		book: "TO",
		page: 320,
		alpha_strike: {
			heat: 12,
			range_short: 1.02,
			range_medium: 1.02,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// PPCs
	{
		name: {
			'en-US': "Light PPC",
			'de-DE': "de - Light PPC",
		},
		tag: "light-ppc",
		sort: "ppc, 0, light",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 150000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 88,
		ammo_battlevalue: 0,
		heat: 5,
		weight: 3,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 5,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "PPC",
			'de-DE': "de - PPC",
		},
		tag: "standard-ppc",
		sort: "ppc, 1, standard",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 176,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
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
		tech_rating: "d",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 10,
			range_short: 0.75,
			range_medium: 1,
			range_long: 1,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Heavy PPC",
			'de-DE': "de - Heavy PPC",
		},
		tag: "heavy-ppc",
		sort: "ppc, 2, heavy",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 15,
		damage_aero: 15,
		accuracy_modifier: 0,
		cbills: 250000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 317,
		ammo_battlevalue: 0,
		heat: 15,
		weight: 10,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
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
		page: 234,
		alpha_strike: {
			heat: 15,
			range_short: 1.125,
			range_medium: 1.5,
			range_long: 1.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Snub-Nose PPC",
			'de-DE': "de - Snub-Nose PPC",
		},
		tag: "snub-nose-ppc",
		sort: "ppc, snub-nose",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 10,
			medium: 8,
			long: 5,
			aero_short: 10,
			aero_medium: 8,
			aero_long: 0
		},
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2784,
		extinct: 2790,
		reintroduced: 3067,
		battlevalue: 165,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 6,
		range_min: {
			min: 0,
			short: 9,
			medium: 13,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
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
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 0.65,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
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
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2751,
		extinct: 2860,
		reintroduced: 3037,
		battlevalue: 229,
		ammo_battlevalue: 0,
		heat: 15,
		weight: 7,
		range_min: {
			min: 0,
			short: 7,
			medium: 14,
			long: 23,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
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
		page: 233,
		alpha_strike: {
			heat: 15,
			range_short: 1,
			range_medium: 1,
			range_long: 1,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Plasma Rifle
	{
		name: {
			'en-US': "Plasma Rifle",
			'de-DE': "de - Plasma Rifle",
		},
		tag: "plasma-rifle",
		sort: "plasmarifle",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 260000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 210,
		ammo_battlevalue: 26,
		heat: 10,
		weight: 6,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "e",
		book: "TM",
		page: 235,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Heat"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Plasma Rifle)",
			'de-DE': "de - Ammo (Plasma Rifle)",
		},
		tag: "ammo-plasma-rifle",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 10000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 26,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 235,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
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
			'en-US': "ER Flamer",
			'de-DE': "de - ER Flamer",
		},
		tag: "er-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 16,
		ammo_battlevalue: 1,
		heat: 4,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 5,
			long: 7,
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
		tech_rating: "d",
		book: "TO",
		page: 312,
		alpha_strike: {
			heat: 4,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
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
		battlevalue: 5,
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
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Coolant)",
			'de-DE': "de - Ammo (Vehicle Flamer Coolant)",
		},
		tag: "ammo-vehicle-flamer-coolant",
		sort: "ammo, flamer, vehicle, coolant",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 3000,
		introduced: 2050,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
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
		tech_rating: "c",
		book: "TO",
		page: 316,
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
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Inferno)",
			'de-DE': "de - Ammo (Vehicle Flamer Inferno)",
		},
		tag: "ammo-vehicle-flamer-inferno",
		sort: "ammo, flamer, vehicle, inferno",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 2400,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 2,
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
		tech_rating: "d",
		book: "TO",
		page: 316,
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
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Water)",
			'de-DE': "de - Ammo (Vehicle Flamer Water)",
		},
		tag: "ammo-vehicle-flamer-water",
		sort: "ammo, flamer, vehicle, water",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 500,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
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
		tech_rating: "a",
		book: "TO",
		page: 316,
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
	},
	{
		name: {
			'en-US': "Heavy Flamer",
			'de-DE': "de - Heavy Flamer",
		},
		tag: "heavy-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		sort: "flamer, heavy",
		damage: 4,
		damage_aero: 4,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 1,
		heat: 5,
		weight: 1.5,
		range_min: {
			min: 0,
			short: 2,
			medium: 3,
			long: 4,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "c",
		book: "TO",
		page: 312,
		alpha_strike: {
			heat: 5,
			range_short: 0.4,
			range_medium: 0.4,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer)",
			'de-DE': "de - Ammo (Heavy Flamer)",
		},
		tag: "ammo-heavy-flamer",
		sort: "ammo, flamer, heavy",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 2000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 2,
		ammo_battlevalue: 1,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 2,
			medium: 3,
			long: 4,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "c",
		book: "TO",
		page: 312,
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
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Coolant)",
			'de-DE': "de - Ammo (Heavy Flamer Coolant)",
		},
		tag: "ammo-heavy-flamer-coolant",
		sort: "ammo, flamer, heavy, coolant",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 3000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 2,
		heat: 5,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "c",
		book: "TO",
		page: 361,
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
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Inferno)",
			'de-DE': "de - Ammo (Heavy Flamer Inferno)",
		},
		tag: "ammo-heavy-flamer-inferno",
		sort: "ammo, flamer, heavy, inferno",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 4,
		heat: 5,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "d",
		book: "TO",
		page: 361,
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
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Water)",
			'de-DE': "de - Ammo (Heavy Flamer Water)",
		},
		tag: "ammo-heavy-flamer-water",
		sort: "ammo, flamer, heavy, water",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 2,
		heat: 5,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "a",
		book: "TO",
		page: 362,
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
	},
	/*
		BALLISTIC WEAPONS
	*/
	// Standard Autocannons
	// Note: ACs referred to internally as a-d instead of numerically to avoid sort and partial
	// match problems
	// AC/2
	{
		name: {
			'en-US': "Autocannon/2",
			'de-DE': "de - Autocannon/2",
		},
		tag: "standard-autocannon-a",
		sort: "Autocannon/a",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 75000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 37,
		heat: 1,
		weight: 6,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2)",
			'de-DE': "de - Ammo (AC/2)",
		},
		tag: "ammo-standard-autocannon-a",
		sort: "ammo, Autocannon/a",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		min_ammo_tons: 0,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Armor-Piercing)",
			'de-DE': "de - Ammo (AC/2 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-a-armor-piercing",
		sort: "ammo, Autocannon/a, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Caseless)",
			'de-DE': "de - Ammo (AC/2 Caseless)",
		},
		tag: "ammo-standard-autocannon-a-caseless",
		sort: "ammo, Autocannon/a, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Flak)",
			'de-DE': "de - Ammo (AC/2 Flak)",
		},
		tag: "ammo-standard-autocannon-a-flak",
		sort: "ammo, Autocannon/a, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 2310,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Flechette)",
			'de-DE': "de - Ammo (AC/2 Flechette)",
		},
		tag: "ammo-standard-autocannon-a-flechette",
		sort: "ammo, Autocannon/a, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Precision)",
			'de-DE': "de - Ammo (AC/2 Precision)",
		},
		tag: "ammo-standard-autocannon-a-precision",
		sort: "ammo, Autocannon/a, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/2 Tracer)",
			'de-DE': "de - Ammo (AC/2 Tracer)",
		},
		tag: "ammo-standard-autocannon-a-tracer",
		sort: "ammo, Autocannon/a, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	// AC/5
	{
		name: {
			'en-US': "Autocannon/5",
			'de-DE': "de - Autocannon/5",
		},
		tag: "standard-autocannon-b",
		sort: "Autocannon/b",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 125000,
		introduced: 2250,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 70,
		heat: 1,
		weight: 8,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 0,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5)",
			'de-DE': "de - Ammo (AC/5)",
		},
		tag: "ammo-standard-autocannon-b",
		sort: "ammo, Autocannon/b",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4500,
		introduced: 2250,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Armor-Piercing)",
			'de-DE': "de - Ammo (AC/5 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-b-armor-piercing",
		sort: "ammo, Autocannon/b, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 18000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Caseless)",
			'de-DE': "de - Ammo (AC/5 Caseless)",
		},
		tag: "ammo-standard-autocannon-b-caseless",
		sort: "ammo, Autocannon/b, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Flak)",
			'de-DE': "de - Ammo (AC/5 Flak)",
		},
		tag: "ammo-standard-autocannon-b-flak",
		sort: "ammo, Autocannon/b, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 2310,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Flechette)",
			'de-DE': "de - Ammo (AC/5 Flechette)",
		},
		tag: "ammo-standard-autocannon-b-flechette",
		sort: "ammo, Autocannon/b, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Precision)",
			'de-DE': "de - Ammo (AC/5 Precision)",
		},
		tag: "ammo-standard-autocannon-b-precision",
		sort: "ammo, Autocannon/b, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 27000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/5 Tracer)",
			'de-DE': "de - Ammo (AC/5 Tracer)",
		},
		tag: "ammo-standard-autocannon-b-tracer",
		sort: "ammo, Autocannon/b, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
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
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// AC/10
	{
		name: {
			'en-US': "Autocannon/10",
			'de-DE': "de - Autocannon/10",
		},
		tag: "standard-autocannon-c",
		sort: "Autocannon/c",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		heat: 3,
		weight: 12,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 7,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 7,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 0,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10)",
			'de-DE': "de - Ammo (AC/10)",
		},
		tag: "ammo-standard-autocannon-c",
		sort: "ammo, Autocannon/c",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Armor-Piercing)",
			'de-DE': "de - Ammo (AC/10 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-c-armor-piercing",
		sort: "ammo, Autocannon/c, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 24000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Caseless)",
			'de-DE': "de - Ammo (AC/10 Caseless)",
		},
		tag: "ammo-standard-autocannon-c-caseless",
		sort: "ammo, Autocannon/c, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Flak)",
			'de-DE': "de - Ammo (AC/10 Flak)",
		},
		tag: "ammo-standard-autocannon-c-flak",
		sort: "ammo, Autocannon/c, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Flechette)",
			'de-DE': "de - Ammo (AC/10 Flechette)",
		},
		tag: "ammo-standard-autocannon-c-flechette",
		sort: "ammo, Autocannon/c, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Precision)",
			'de-DE': "de - Ammo (AC/10 Precision)",
		},
		tag: "ammo-standard-autocannon-c-precision",
		sort: "ammo, Autocannon/c, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 30000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/10 Tracer)",
			'de-DE': "de - Ammo (AC/10 Tracer)",
		},
		tag: "ammo-standard-autocannon-c-tracer",
		sort: "ammo, Autocannon/c, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Autocannon/20",
			'de-DE': "de - Autocannon/20",
		},
		tag: "standard-autocannon-d",
		sort: "Autocannon/d",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 20,
		damage_aero: 20,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 178,
		heat: 7,
		weight: 14,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 10,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 10,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 0,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20)",
			'de-DE': "de - Ammo (AC/20)",
		},
		tag: "ammo-standard-autocannon-d",
		sort: "ammo, Autocannon/d",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 10000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Armor-Piercing)",
			'de-DE': "de - Ammo (AC/20 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-d-armor-piercing",
		sort: "ammo, Autocannon/d, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 40000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 2,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Caseless)",
			'de-DE': "de - Ammo (AC/20 Caseless)",
		},
		tag: "ammo-standard-autocannon-d-caseless",
		sort: "ammo, Autocannon/d, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Flak)",
			'de-DE': "de - Ammo (AC/20 Flak)",
		},
		tag: "ammo-standard-autocannon-d-flak",
		sort: "ammo, Autocannon/d, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Flechette)",
			'de-DE': "de - Ammo (AC/20 Flechette)",
		},
		tag: "ammo-standard-autocannon-d-flechette",
		sort: "ammo, Autocannon/d, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Precision)",
			'de-DE': "de - Ammo (AC/20 Precision)",
		},
		tag: "ammo-standard-autocannon-d-precision",
		sort: "ammo, Autocannon/d, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 60000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 2,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (AC/20 Tracer)",
			'de-DE': "de - Ammo (AC/20 Tracer)",
		},
		tag: "ammo-standard-autocannon-d-tracer",
		sort: "ammo, Autocannon/d, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
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
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Light Autocannon/2",
			'de-DE': "de - Light Autocannon/2",
		},
		tag: "light-autocannon-2",
		sort: "Light Autocannon/2",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 100000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 30,
		heat: 0,
		weight: 4,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2)",
			'de-DE': "de - Ammo (Light Autocannon/2)",
		},
		tag: "ammo-light-autocannon-2",
		sort: "ammo, Light Autocannon/2",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Armor-Piercing)",
			'de-DE': "de - Ammo (Light Autocannon/2 Armor-Piercing)",
		},
		tag: "ammo-light-autocannon-2-armor-piercing",
		sort: "ammo, Light Autocannon/2, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Caseless)",
			'de-DE': "de - Ammo (Light Autocannon/2 Caseless)",
		},
		tag: "ammo-light-autocannon-2-caseless",
		sort: "ammo, Light Autocannon/2, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Flak)",
			'de-DE': "de - Ammo (Light Autocannon/2 Flak)",
		},
		tag: "ammo-light-autocannon-2-flak",
		sort: "ammo, Light Autocannon/2, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Flechette)",
			'de-DE': "de - Ammo (Light Autocannon/2 Flechette)",
		},
		tag: "ammo-light-autocannon-2-flechette",
		sort: "ammo, Light Autocannon/2, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Precision)",
			'de-DE': "de - Ammo (Light Autocannon/2 Precision)",
		},
		tag: "ammo-light-autocannon-2-precision",
		sort: "ammo, Light Autocannon/2, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Tracer)",
			'de-DE': "de - Ammo (Light Autocannon/2 Tracer)",
		},
		tag: "ammo-light-autocannon-2-tracer",
		sort: "ammo, Light Autocannon/2, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 0,
		weight: 1,
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
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
		{
		name: {
			'en-US': "Light Autocannon/5",
			'de-DE': "de - Light Autocannon/5",
		},
		tag: "light-autocannon-5",
		sort: "Light Autocannon/5",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 150000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 62,
		heat: 0,
		weight: 5,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
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
			'en-US': "Ammo (Light Autocannon/5)",
			'de-DE': "de - Ammo (Light Autocannon/5)",
		},
		tag: "ammo-light-autocannon-5",
		sort: "ammo, Light Autocannon/5",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Armor-Piercing)",
			'de-DE': "de - Ammo (Light Autocannon/5 Armor-Piercing)",
		},
		tag: "ammo-light-autocannon-5-armor-piercing",
		sort: "ammo, Light Autocannon/5, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 18000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Caseless)",
			'de-DE': "de - Ammo (Light Autocannon/5 Caseless)",
		},
		tag: "ammo-light-autocannon-5-caseless",
		sort: "ammo, Light Autocannon/5, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Flak)",
			'de-DE': "de - Ammo (Light Autocannon/5 Flak)",
		},
		tag: "ammo-light-autocannon-5-flak",
		sort: "ammo, Light Autocannon/5, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Flechette)",
			'de-DE': "de - Ammo (Light Autocannon/5 Flechette)",
		},
		tag: "ammo-light-autocannon-5-flechette",
		sort: "ammo, Light Autocannon/5, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Precision)",
			'de-DE': "de - Ammo (Light Autocannon/5 Precision)",
		},
		tag: "ammo-light-autocannon-5-precision",
		sort: "ammo, Light Autocannon/5, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 27000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Tracer)",
			'de-DE': "de - Ammo (Light Autocannon/5 Tracer)",
		},
		tag: "ammo-light-autocannon-5-tracer",
		sort: "ammo, Light Autocannon/5, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
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
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Gauss Rifles
	{
		name: {
			'en-US': "Gauss Rifle",
			'de-DE': "de - Gauss Rifle",
		},
		tag: "gauss-rifle",
		// Sort standard gauss rifle to the top
		sort: "gauss rifle, a",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 15,
		damage_aero: 15,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2590,
		extinct: 2865,
		reintroduced: 3040,
		battlevalue: 320,
		heat: 1,  
		weight: 15,
		range_min: {
			min: 2,
			short: 7,
			medium: 15,
			long: 22,
		},
		space: {
			battlemech: 7,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 7,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		gauss: true,
		weapon_type: Array(
			"DB"
		),
		tech_rating: "e",
		book: "TM",
		page: 219,
		alpha_strike: {
			heat: 1,
			range_short: 1.245,
			range_medium: 1.5,
			range_long: 1.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Gauss)",
			'de-DE': "de - Ammo (Gauss)",
		},
		tag: "ammo-gauss-rifle",
		sort: "ammo, gauss rifle, a",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 20000,
		introduced: 2590,
		extinct: 2865,
		reintroduced: 3040,
		battlevalue: 40,
		heat: 1,
		weight: 1,
		range_min: {
			min: 2,
			short: 7,
			medium: 15,
			long: 22,
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
		ammo_per_ton: 8,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB"
		),
		tech_rating: "e",
		book: "TM",
		page: 219,
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
	},
	// Machine Guns
	{
		name: {
			'en-US': "Machine Gun",
			'de-DE': "de - Machine Gun",
		},
		tag: "machine-gun",
		sort: "machine gun",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 0,
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
		ammo_per_ton: 0,
		min_ammo_tons: 0.5,
		explosive: false,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "b",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 0,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (MG)",
			'de-DE': "de - Ammo (MG)",
		},
		tag: "ammo-machine-gun",
		sort: "ammo, machine gun",
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
		heat: 1,
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
		ammo_per_ton: 200,
		min_ammo_tons: 0.5,
		explosive: true,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "b",
		book: "TM",
		page: 227,
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
	}
);
