import { IHeatSync } from "./data-interfaces";

/*
 * The data here is/may be copyrighted and NOT included in the GPLv3 license.
 */
export const mechHeatSinkTypes: IHeatSync[] = [
	{
		name:  "Single",
		tag: "single",
		dissipation: 1,
		crits: {
			clan: 1,
			is: 1
		},

		cost: 2000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: "Double",
		tag: "double",
		dissipation: 2,
		crits: {
			clan: 2,
			is: 3
		},
		cost: 6000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	}
];
