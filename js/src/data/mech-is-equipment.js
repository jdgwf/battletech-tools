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
		tag: "small-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
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
			'en-US': "Binary Lazer Cannon",
			'de-DE': "de - Binary Laser Cannon",
		},
		tag: "blazer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 12,
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
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
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
		tag: "large-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
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
	/*
		BALLISTIC WEAPONS
	*/
	// Machine Guns
	{
		name: {
			'en-US': "Machine Gun",
			'de-DE': "de - Machine Gun",
		},
		tag: "machine-gun",
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
		ammo_per_ton: 200,
		min_ammo_tons: 0.5,
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
	},
	{
		name: {
			'en-US': "Ammo (Machine Gun)",
			'de-DE': "de - Ammo (Machine Gun)",
		},
		tag: "ammo-machine-gun",
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