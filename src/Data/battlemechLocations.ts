/*
 * The data here is/may be copyrighted and NOT included in the MIT license.
 */

interface IBattlemechLocation {
    tag: string;
    rear: boolean;
    name: string;
    abbr: string;
}

export const battlemechLocations: IBattlemechLocation[] = [
	{
		tag: "hd",
		rear: false,
		name:  "Head",
		abbr:  "hd",
	},
	{
		tag: "hdr",
		rear: true,
		name: "Head (Rear)",
		abbr: "hd(r)",
	},
	{
		tag: "rt",
		rear: false,
		name:  "Right Torso",
		abbr: "rt",
	},
	{
		tag: "ct",
		rear: false,
		name:  "Center Torso",
		abbr: "ct",
	},
	{
		tag: "lt",
		rear: false,
		name:  "Left Torso",
		abbr: "lt",
	},
	{
		tag: "rtr",
		rear: true,
		name: "Right Torso (Rear)",
		abbr: "rt(r)",
	},
	{
		tag: "ctr",
		rear: true,
		name: "Center Torso (Rear)",
		abbr: "ct(r)",
	},
	{
		tag: "ltr",
		rear: true,
		name: "Left Torso (Rear)",
		abbr: "lt(r)",
	},
	{
		tag: "ra",
		rear: false,
		name: "Right Arm",
		abbr: "ra",
	},
	{
		tag: "la",
		rear: false,
		name: "Left Arm",
		abbr: "la",
	},
	{
		tag: "rl",
		rear: false,
		name: "Right Leg",
		abbr: "rl",
	},
	{
		tag: "ll",
		rear: false,
		name: "Left Leg",
		abbr: "ll",
	}
];
