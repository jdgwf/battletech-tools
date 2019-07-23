export interface IArmorType {
	tag: String;
	name: String;
	crits: {
		clan: Number;
		is: Number;
	},
	armorMultiplier: {
		clan: Number;
		is: Number;
	},
	costMultiplier: Number;
	introduced: Number;
	extinct: Number;
	reintroduced: Number;
	critLocs?: {
		ra?: Number;
		rl?: Number;
		rt?: Number;
		la?: Number;
		ll?: Number;
		lt?: Number;
	}
}


export interface IEngineOption {
	name: String;
	rating: Number;
	weight: {
		ice: Number;
		cell: Number;
		fission: Number;
		comp: Number;
		standard: Number;
		light: Number;
		xl: Number;
	}
}

export interface ICritialLocations {
	hd?: Number,
	ct?: Number,
	ra?: Number,
	rt?: Number,
	rl?: Number,
	la?: Number,
	lt?: Number,
	ll?: Number,
}

export interface IEngineType {
	tag: String;
	name: String;
	costMultiplier: Number;
	introduced: Number;
	extinct: Number;
	reintroduced: Number;
	criticals?: {
		is?: ICritialLocations;
		clan?: ICritialLocations;
	}
}

export interface IDamagePerRange {
    short: Number;
    medium: Number;
    long: Number;
    aeroShort: Number;
    aeroMedium: Number;
    aeroLong: Number;
}

export interface IAccuracyModifier {
    short: Number;
    medium: Number;
    long: Number;
}

export interface IRangeNumbers {
    min?: Number;
    short: Number;
    medium: Number;
    long: Number;
    exterme?: Number;
}


export interface IEquipmentItem {
    name: String;
    tag: String;
    sort: String;
    category: String;
    damage?: Number | IDamagePerRange;
    damageAero?: Number;
    damagePerCluster?: Number;
    damageClusters?: Number;
    accuracyModifier?: Number | IAccuracyModifier;
    ammoBattleValue?: number;
    accuracyModifiier?: Number;
    cbills: Number;
    introduced: Number;
    extinct?: Number;
    reintroduced?: Number;
    battlevalue?: Number;
    heat: Number;
    weight: Number;
    range: IRangeNumbers,
    space: {
        battlemech: Number;
        protomech: Number;
        combatVehicle: Number;
        supportVehicle: Number;
        aerospaceFighter: Number;
        smallCraft: Number;
        dropShip: Number;
    },
    ammoPerTon?: Number;
    minAmmoTons?: Number;
    explosive?: Boolean;
    weaponType?: String[];
    techRating?: String;
    book: String;
    page: Number;
    alphaStrike: {
        heat: Number;
        rangeShort: Number;
        rangeMedium: Number;
        rangeLong: Number;
        rangeExtreme: Number;
        tc: Number;
        notes: String[];
    };
    battleValuePerItemDamage?: Number;
    requiresHandActuator?: Boolean;

    weightDivisior?: Number;
    damageDivisior?: Number;
    criticalsDivisior?: Number;

    variableSize?: Boolean;
    isMelee?: Boolean;
    costPerItemTon?: Number;
}

export interface IGyro {
    name: String;
    tag: String;
    weight_multiplier: Number;
    criticals: Number;
    costMultiplier: Number;
    introduced: Number;
    extinct: Number;
    reintroduced: Number;
}

export interface IHeatSync {
    name: String;
    tag: String;
    dissipation: Number;
    crits: {
        clan: Number;
        is: Number;
    },

    cost: Number;
    introduced: Number;
    extinct: Number;
    reintroduced: Number;
}

export interface IInternalStructurePerTon {
    tonnage: Number;
    head: Number;
    centerTorso: Number;
    rlTorso: Number;
    rlArm: Number;
    rlLeg: Number;
}

export interface IInternalStructure {
    name: String;
    tag: String;
    crits: {
        clan: Number;
        is: Number;
    },
    perTon: {[key: number]: IInternalStructurePerTon};

    cost: Number;
    introduced: Number;
    extinct: Number;
    reintroduced: Number;
}

export interface IJumpJet {
    name: String;
    tag: String;
    weight_multiplier: {
        light: Number;
        medium: Number;
        heavy: Number;
    },
    criticals: Number;
    costMultiplier: Number;
    introduced: Number;
    extinct: Number;
    reintroduced: Number;
}

export interface IMechType {
    id: Number;
    class: String;
    name: String;
}

export interface ITechOptions {
	id: Number;
	tag: String;
	name: String;
}