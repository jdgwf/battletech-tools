import { IJumpJet } from "./dataInterfaces";

/*
 * The data here is/may be copyrighted and NOT included in the GPLv3 license.
 */
export const mechJumpJetTypes: IJumpJet[] = [
	{
		name: "Standard Jump Jets",
		tag: "standard",
		weight_multiplier: {
			light: 0.5,
			medium: 1,
			heavy: 2
		},
		criticals: 1,
		costMultiplier: 200,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0
	},

	{
		name:  "Improved Jump Jets",
		tag: "improved",
		weight_multiplier: {
			light: 1,
			medium: 2,
			heavy: 4
		},
		criticals: 2,
		costMultiplier: 500,
		introduced: 3050,
		extinct: 0,
		reintroduced: 0
	}
];
