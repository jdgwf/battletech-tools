import { IGyro } from "./dataInterfaces";

/*
 * The data here is/may be copyrighted and NOT included in the MIT license.
 */
export const mechGyroTypes: IGyro[] = [
	{
		name: "Standard Gyro",
		tag: "standard",
		weight_multiplier: 1,
		criticals: 4,
		costMultiplier: 300000,
		introduced: 2350,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: "Extra-light (XL) Gyro",
		tag: "xl",
		weight_multiplier: 0.5,
		criticals: 6,
		costMultiplier: 750000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: "Compact Gyro",
		tag: "compact",
		weight_multiplier: 1.5,
		criticals: 2,
		costMultiplier: 400000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: "Heavy Duty Gyro",
		tag: "heavy-duty",
		weight_multiplier: 2,
		criticals: 4,
		costMultiplier: 500000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	}
];
