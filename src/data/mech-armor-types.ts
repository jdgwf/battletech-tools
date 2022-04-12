import { IArmorType } from "./data-interfaces";

/*
 * The data here is/may be copyrighted and NOT included in the GPLv3 license.
 */

export const mechArmorTypes: IArmorType[] = [
	{
		name: "Standard",
		tag: "standard",
		crits: {
			clan: 0,
			is: 0
		},
		armorMultiplier: {
			clan: 16,
			is: 16
		},

		costMultiplier: 10000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: "Ferro Fibrous",
		tag: "ferro-fibrous",
		armorMultiplier: {
			clan: 16 * 1.2,
			is: 16 * 1.12
		},
		crits: {
			clan: 7,
			is: 14
		},
		costMultiplier: 20000,
		introduced: 2571,
		extinct: 2810,
		reintroduced: 3040
	},

	{
		name: "Light Ferro Fibrous",
		tag: "light-ferro-fibrous",
		armorMultiplier: {
			clan: 0,
			is: 7
		},
		crits: {
			clan: 0,
			is: 16 * 1.06,
		},
		costMultiplier: 15000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	},

	{
		name: "Heavy Ferro Fibrous",
		tag: "light-ferro-fibrous",
		armorMultiplier: {
			clan: 0,
			is: 16 * 1.24,
		},
		crits: {
			clan: 0,
			is: 21,
		},
		costMultiplier: 25000,
		introduced: 3069,
		extinct: 0,
		reintroduced: 0
	},

	{
		name: "Stealth",
		tag: "stealth",
		armorMultiplier: {
			clan: 0,
			is: 16,
		},
		crits: {
			clan: 0,
			is: 12,
		},
		critLocs: {
			ra: 2,
			rl: 2,
			rt: 2,
			la: 2,
			ll: 2,
			lt: 2
		},
		costMultiplier: 50000,
		introduced: 3063,
		extinct: 0,
		reintroduced: 0
	}
];
