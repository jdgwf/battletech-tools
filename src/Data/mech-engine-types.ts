import { IEngineType } from "./dataInterfaces";

/*
 * The data here is/may be copyrighted and NOT included in the MIT license.
 */

export const mechEngineTypes: IEngineType[] = [
	{
		name: "Standard Fusion",
		tag: "standard",
		criticals: {
			is: {
				ct: 6
			},
			clan: {
				ct: 6
			}
		},
		costMultiplier: 5000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		rating: 0,
	},
	{
		name: "XL Fusion",
		tag: "xl",
		criticals: {
			is: {
				ct: 6,
				lt: 3,
				rt: 3
			}
		},
		costMultiplier: 20000,
		introduced: 2579,
		extinct: 2865,
		reintroduced: 3035,
		rating: 0,
	},
	{
		name: "Clan XL Fusion",
		tag: "clan-xl",
		criticals: {
			clan: {
				ct: 6,
				lt: 2,
				rt: 2
			}
		},
		costMultiplier: 20000,
		introduced: 2827,
		extinct: 0,
		reintroduced: 0,
		rating: 0,
	},
	{
		name: "Light Fusion",
		tag: "light",
		criticals: {
			is: {
				ct: 6,
				lt: 2,
				rt: 2
			}
		},
		costMultiplier: 15000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		rating: 0,
	},
	{
		name: "Compact Fusion",
		tag: "compact",
		criticals: {
			is: {
				ct: 3
			}
		},
		costMultiplier: 10000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		rating: 0,
	}
];
