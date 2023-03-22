export enum ESpecialAbilityType {
    Standard = 1,
    Optional = 1,
}

export function getSpecialAbilityTypeName( type: ESpecialAbilityType ): string {
    switch( type ) {
        case ESpecialAbilityType.Standard:
            return "Standard Special Ability";
        case ESpecialAbilityType.Optional:
            return "Optional Special Ability";
    }
}

export const CONST_AS_SPECIAL_ABILITIES: IASSpecialAbility[] = [
    {
        tag: "AFC",
        name: "Advanced Fire Control",
        summary: ["IndustrialMechs and support vehicles equipped with Advanced Fire Control do not suffer Target Number modifiers for their unit type."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "AMP",
        name: "Amphibious",
        summary: ["This ability makes a non-naval unit capable of water movement. Amphibious units pay a total of 4” per inch of water traversed and move as a surface naval unit in water, except that they freely move in and out of water areas."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "AECM",
        name: "Angel ECM",
        summary: ["An Angel ECM suite has the effects of standard ECM (see p. 77), but is treated as two standard ECM suites if using the ECM/ECCM optional rule (see p. 161)."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "AM",
        name: "Anti-'Mech",
        summary: ["Infantry units with the Anti-’Mech (AM) special ability can make a special attack against any ground units, landed VTOLs and WiGEs, or grounded aerospace units with which they are in base-to-base contact. Anti-’Mech Infantry attacks are treated as a physical attack (see p. 45)."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "AMS",
        name: "Anti-Missile System",
        summary: [" A unit with an AMS reduces the damage by 1 point (to a minimum of 1) from any of the following attacks: standard weapon attack from a unit with the IF, SRM, or LRM special abilities, Indirect Fire attack using the IF special ability, or special weapon attack made using the SRM or LRM special abilities. AMS only works on attacks coming in the front arc, unless mounted in a turret (TUR)."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "ARM",
        name: "Armored Components",
        summary: ["A unit with this ability ignores the first critical hit chance rolled against it during a single Alpha Strike scenario. The first time circumstances arise that would normally generate an opportunity for a critical hit (such as structure damage), the unit’s controlling player must strike off this ability as “spent” for the remainder of the scenario, and the attacker loses his first opportunity to roll for a critical hit."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "ARS",
        name: "Armored Motive System",
        summary: ["A unit with this special ability applies a -1 modifier on the Determining Motive Systems Damage roll (see Motive Systems Damage Table, p. 50)."],
        asce_page: 76,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "BAR",
        name: "Barrier Armor Rating",
        summary: ["The BAR special indicates a unit that is protected by substandard armor (or commercial-grade armor). Successful attacks against such units always trigger a roll for critical hits, regardless of whether or not the structure is damaged."],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "BFC",
        name: "Basic Fire Control",
        summary: ["A support vehicle or IndustrialMech with this ability has an inferior targeting and tracking system, which adds a Target Number modifier of +1 for its attack. (This modifier is listed in the Attack Modifiers Table, see p. 44.)"],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "BHJ",
        name: "BattleMech Harjel",
        summary: ["A ’Mech protected by HarJel ignores the additional “hull breach” critical hit checks required for being attacked while underwater or in a vacuum. All other causes for critical hit rolls still apply as normal."],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "SHLD",
        name: "BattleMech Shield",
        summary: ["Shield-bearing ’Mechs gain some protection against weapon and physical attacks at the expense of their own attack accuracy. To reflect this, shield-equipped units reduce the damage from most weapons and physical attacks by 1 point (to a minimum of 0). Indirect attacks, heat-causing attacks, and area-effect attacks (such as artillery and bombs) are not dampened by the shield and thus deliver full damage. All weapon attacks made by a ’Mech with this ability incur an additional +1 Target Number modifier."],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "BOMB#",
        name: "Bomb",
        summary: [
            "Conventional and aerospace fighters, fixed-wing support vehicles, and some battle armor can carry bombs. The number of bombs these units can carry are equal to the number in the ability’s notation (so a unit with BOMB4 carries up to 4 bombs). For most units, these bombs may be of any type, though battle armor units with this ability may only use cluster bombs (see p. 183). (As a special exception, Arrow IV missiles of all types may be carried as bombs, but a unit that uses Arrow IV bombs must count the first Arrow IV missile carried this way as 2 bombs. All remaining bombs are then counted normally.) Each bomb a unit carries reduces its Thrust value by 1. (Battle armor units with bombs suffer no effects on their Move ratings.)",
            "A bomb-carrying unit’s card should list how many bombs the unit is carrying in the scenario, which must be equal to or less than the number this ability enables it to carry."],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "CARGO#",
        name: "Cargo",
        summary: [
            "An infantry unit with the Cargo special ability can be carried by a unit with infantry transport space (noted by the IT# special ability). For these units, the number in the ability notation indicates the amount of cargo space it needs to be transported. For example, a squad of Elemental battle armor has a CAR5 special ability, and so would need a unit with IT5 (or higher) to transport it."
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "CASE",
        name: "Cellular Ammunition Storage Equipment",
        summary: [
            "Units with this ability can minimize the catastrophic effects of an ammunition explosion and thus can survive Ammo Hit critical hits (see Ammo Hit, p. 50), but will suffer additional damage."
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "CASEII",
        name: "Cellular Ammunition Storage Equipment II",
        summary: [
            "Units with this ability have superior protection against ammunition explosions and can ignore Ammo Hit critical hits (see Ammo Hit, p. 50)."
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "ECM",
        name: "Electronic Countermeasures",
        summary: [
            "In Alpha Strike, an ECM suite’s area of effect covers a 12-inch radius from the unit that has this special ability. Electronics (including active probes and C3 computers) used by units friendly to the ECM-equipped unit will not be affected by this item, nor will an ECM suite affect other scanning and targeting devices (such as basic or advanced fire control, or TAG).",
            "Against hostile electronics, ECM has the following effects:",
            "ECM vs. Active Probes, Drones, Narc, and iNarc Systems:",
            "Active probes, drones, and the Narc/iNarc systems are all covered in the Optional Rules chapter (see p. 136), and will detail the effects of ECM against those systems.",
            "ECM vs. C3 Networks: ECM disrupts most enemy C3 networks, preventing their function depending upon the type of C3 network. If a C3 master unit is isolated from the network because it ventures inside the ECM bubble, the C3 master’s entire network is effectively shut off and loses C3 abilities. If the LOS between the C3 master unit and one or more of the units in its network passes through a hostile ECM radius, only those networked units “cut off ” from the C3 master will lose the benefits of C3. (See C3 Networks, p. 80).",
            "If a C3i-equipped unit is caught within the ECM bubble, or draws its LOS to all partner C3i units through an ECM bubble, only that unit is isolated from the network and loses all C3i abilities.",
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "EE",
        name: "Elementary Engine",
        summary: [
            "Units with EE or FC specials use non-fusion engines for power and must have the SEAL special to operate underwater. Units with elementary engines (EE) may not operate in a vacuum, but units that have both fuel cell engines (FC) and the SEAL special may operate normally in a vacuum.",
            "Heat-tracking units that use either of these engine types will suffer no heat buildup from an Engine Hit critical effect. Instead, for every turn after receiving an Engine Hit critical, if the unit makes a weapon attack, its controlling player must roll 2D6 in the End Phase of that game turn. On a roll of 12, the unit explodes and is destroyed.",
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "FC",
        name: "Fuel Cell Engine",
        summary: [
            "Units with EE or FC specials use non-fusion engines for power and must have the SEAL special to operate underwater. Units with elementary engines (EE) may not operate in a vacuum, but units that have both fuel cell engines (FC) and the SEAL special may operate normally in a vacuum.",
            "Heat-tracking units that use either of these engine types will suffer no heat buildup from an Engine Hit critical effect. Instead, for every turn after receiving an Engine Hit critical, if the unit makes a weapon attack, its controlling player must roll 2D6 in the End Phase of that game turn. On a roll of 12, the unit explodes and is destroyed.",
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "ENE",
        name: "Energy",
        summary: [
            "A unit with this ability has little to no ammo to explode, and ignores Ammo Hit critical hits (see Ammo Hit, p. 50).",
        ],
        asce_page: 77,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "XMEC",
        name: "Extended Mechanized",
        summary: [
            "Battle armor with this special ability may function as mechanized battle armor, and can ride on any type of ground unit (see Transporting Infantry, p. 38).",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "FR",
        name: "Fire Resistant",
        summary: [
            "Units with this ability are not affected by infernos or other weapons that generate heat (HT#/#/#). If the heat-causing weapon deals damage in addition to causing heat, that damage still applies.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "FLK#/#/#/#",
        name: "Flack",
        summary: [
            "If a unit with this ability misses its Attack Roll by 2 points or less when attacking an airborne aerospace unit, VTOL, or WiGE target, the unit will deal damage to its target equal to its FLK rating at the appropriate range bracket.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "HEAT#/#/#/#",
        name: "Heat",
        summary: [
            "Units with this ability apply heat to the target’s Heat scale during the End Phase of the turn in which they deliver a successful weapon attack. If the target is a unit type that does not use a Heat Scale, the heat this ability would normally produce is added to the normal attack damage instead (see Applying Damage, p. 49).",
            "A unit with a Heat value at a range it does not normally deal damage at may make a special weapon attack in place of its standard weapon attack. This only deals the effects of the Heat special ability.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "IF#",
        name: "Indirect Fire",
        summary: [
            "The Indirect Fire special ability allows a unit to attack a target without having a valid LOS to it via arcing missiles over the intervening obstacles, similar to how mortars and artillery work. This attack requires a friendly unit with a valid LOS to act as a spotter. The numerical rating for this ability indicates the amount of damage a successful indirect attack will deliver. Because they attack when other weapons cannot, damage from an indirect attack applies in place of the unit’s normal weapon attack (see Indirect Fire, p. 41).",
            "Units with the IF# and LRM #/#/# specials may make use of all alternate munitions (see p. 143) and Special Pilot Abilities (see pp. 92-101) available to the LRM#/#/# special when making indirect fire attacks, but are limited to using the LRM special ability’s long range value if it is lower than the IF special ability value.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "I-TSM",
        name: "Industrial Triple Strength Myomers",
        summary: [
            "’Mechs with Industrial TSM have enhanced musculature that delivers 1 point of additional damage on a successful standard- or melee-type physical attack, but these units also suffer a +2 Target Number modifier for all physical attacks due to the loss of fine motor control. (Industrial TSM also provides a movement boost, but this is already calculated in the unit’s Alpha Strike stats.)",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "IT#",
        name: "Infantry Transport",
        summary: [
            "The numerical rating associated with this special ability indicates the amount of infantry transport space available. The unit may carry any number of infantry or battle armor units as long as these units’ total cargo requirement does not exceed the transporting unit’s infantry transport rating.",
            "Infantry Transport can be reduced and the same amount of Cargo Transport, Tons (CT#, see p. 84) added to a unit prior to the start of a game.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "JMPW#",
        name: "Weak Jump Jets",
        summary: [
            "This unit has particularly underpowered, weak jump jets. Weak Jump Jets subtract the # from their TMM when using Jumping movement.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "JMPS#",
        name: "Strong Jump Jets",
        summary: [
            "This unit has particularly overpowered, strong jump jets compared to their non-jump movement. Strong Jump Jets add the # to their TMM when using Jumping movement.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "LECM",
        name: "Light ECM",
        summary: [
            "Light ECM functions identically to ECM (see p. 77), but with a reduced radius. Light ECM only creates an ECM bubble with a 2” radius.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "MEC",
        name: "Mechanized",
        summary: [
            "Battle armor with this special ability may function as mechanized battle armor, and can ride on any ground unit type that has the Omni special ability (see Transporting Infantry, p. 38).",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "MEL",
        name: "Melee",
        summary: [
            "This special ability indicates that the ’Mech is equipped with a physical attack weapon, and adds 1 additional point of physical attack damage on a successful Melee-type physical attack (see Resolving Physical Attacks, p. 45).",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "MAS",
        name: "Mimetic Armor System",
        summary: [
            "Mimetic armors are similar to Stealth systems (see p. 79) in that they make a target more difficult to hit with weapon attacks (but not physical attacks). Unlike Stealth, to be effective mimetic armor requires its bearer to remain stationary. If a unit with the MAS special ability is immobile or remained at a standstill during the this turn’s Movement Phase, all non-physical attacks against that unit receive a +3 Target Number modifier for the remainder of the turn. LMAS functions the same way, but provides only a +2 modifier.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },
    {
        tag: "LMAS",
        name: "Light Mimetic Armor System",
        summary: [
            "Mimetic armors are similar to Stealth systems (see p. 79) in that they make a target more difficult to hit with weapon attacks (but not physical attacks). Unlike Stealth, to be effective mimetic armor requires its bearer to remain stationary. If a unit with the MAS special ability is immobile or remained at a standstill during the this turn’s Movement Phase, all non-physical attacks against that unit receive a +3 Target Number modifier for the remainder of the turn. LMAS functions the same way, but provides only a +2 modifier.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "ORO",
        name: "Off-Road",
        summary: [
            "Lacking the rugged suspension of combat vehicles, ground- based support vehicles that use the wheeled (w) movement type must pay 2 inches of additional Move for every non-paved inch they move unless they possess the Off-Road special. This ability is not required for any other unit types, including support vehicles, that use movement modes other than wheeled.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "OMNI",
        name: "Omni",
        summary: [
            "Ground-based Omni units (’Mechs or vehicles) may transport a single battle armor unit using the mechanized battle armor rules (see Transporting Infantry, p. 38).",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "OVL",
        name: "Overheat Long",
        summary: [
            "A unit with this special ability may overheat up to its OV value and apply that value to its Long range damage value as well as the unit’s Short and Medium range damage values. (A unit without this special ability may only apply the damage benefits of its Overheat capabilities to damage delivered in the Short and Medium range brackets.)",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "REAR#/#/#/#",
        name: "Rear Firing Weapons",
        summary: [
            "Although rear-facing weapons are common enough on larger and less flexible units like mobile structures and DropShips, several smaller units also feature secondary weapons mounted in their rear fields of fire. ’Mechs, vehicles, and fighters that possess such weaponry feature the REAR (#/#/#/#) special unit ability to reflect this. As with most other special weapon abilities, the numbers associated with this ability indicate the damage that the unit can inflict at each range bracket.",
            "Ground Units: Any ground unit with rear-facing weapons may decide to use them against any targets that begin the Combat Phase outside of the unit’s normal firing arc. This rear attack is resolved using all of the same rules as a normal weapon attack, but applies an additional +1 Target Number modifier.",
            "Airborne Units: The same rules apply for fighter units as for ground units. However, a fighter may only use its rear-facing weapons against units that are tailing them (see p. 185) and are in range of its rear weapons. Thus, if a fighter has rear-firing weapons that only deliver damage to the Short range bracket, it may only use these weapons against tailing enemies at Short range.",
            "Combining Forward (or Turret) and Rearward Attacks: A unit attempting a REAR attack may still deliver normal forward- firing attacks in the same turn, but its ability to do so is reduced. To reflect this, if a unit makes an attack using the REAR special ability, for every point of REAR damage it can inflict, its forward-arc (or turret-based) damage for that turn must be reduced by the same amount. This damage reduction is applied before the use of any additional damage made possible by overheating.",
            "Additional Restrictions: Overheat damage cannot be applied to REAR attacks, nor can a REAR attack deliberately reduce its damage values to improve forward-firing (or turret-based) weapon attacks. Finally, REAR attacks cannot make use of other special attack abilities, such as heat, indirect fire, flak, or artillery.",
        ],
        asce_page: 78,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "STL",
        name: "Stealth",
        summary: [
            "Though various stealth systems exist in the BattleTech universe, the majority are similar enough in function that Alpha Strike does not distinguish between them. These systems make a target more difficult to hit with weapon attacks (but not physical attacks), based on the range and unit type being targeted.",
            "For attacks made against non-infantry targets with the STL special, apply a +1 Target Number modifier to attacks at Medium range, and an additional +2 modifier at Long range (or greater).",
            "For attacks made against battle armor targets with the STL special, apply a +1 Target Number modifier at Short and Medium range, and an additional +2 modifier at Long range (or greater).",
            "A non-infantry unit with STL is (intentionally) blocking its own emissions with its ECM. Any non-infantry Stealth unit is affected as if in an enemy ECM field (see ECM, p. 77), and cannot affect other units with its own ECM. However, if using the ECM/ECCM optional rules (see p. 161), a unit with AECM may still generate a single field (ECCM only) while the Stealth is on.",
            "Toggling Stealth: To avoid being affected by its own ECM, a non-infantry unit with STL may toggle off its Stealth special ability in the End Phase. Place a mark above or through the Stealth special ability to note that it is off. It may be toggled back on in any subsequent End Phase.",
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "SUBS#/#/#/#",
        name: "Strong Submersible Movement",
        summary: [
            "This unit has particularly overpowered, strong submersible movement compared to their non-submersible movement. Strong submersible movement adds the # to their TMM when using submersible movement.",
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "SUBW#/#/#/#",
        name: "Weak Submersible Movement",
        summary: [
            "This unit has particularly underpowered, weak submersible movement compared to their non-submersible movement. Weak submersible movement subtracts the # from their TMM when using submersible movement.",
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },

    {
        tag: "TOR#",
        name: "Torpedo",
        summary: [
            "Torpedo launchers may only be launched by units in water (or on the surface of a water feature), against targets that are also on or in water (this includes units like hovercraft and airborne WiGEs operating just above the surface of water). Torpedo special ability damage is given in range brackets like a standard weapon attack, and may be fired separately or combined with the standard weapon damage that a submerged unit may deliver in combat.",
            "Torpedo attacks ignore underwater range and damage modifiers that affect other weapons. For example, if a submerged unit, with damage values of 2/2/2 and a TOR 3/3 special, fires at a target that is in its underwater Short range bracket, it will deliver 4 points of total damage on a successful attack. (The base damage of 2 for its normal weapons is halved to 1, but the full TOR damage of 3 applies without reduction.)",
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "TSM",
        name: "Triple Strength Myomer",
        summary: [
            "’Mechs with the Triple-Strength Myomer special ability can move faster and deliver additional damage in standard- and melee- type physical attacks, but only when running hot. Once a unit with TSM overheats, the following rules apply only to its movement and physical attack capabilities. All other rules for overheating and gameplay apply normally.",
            "Movement: When a ’Mech with TSM has a heat scale level of 1 or higher, it gains 2 inches of additional ground Move. If the heat scale is 1, the unit also ignores the loss of 2 inches from overheating, but the overheating effects on Move for heat levels of 2+ remain in effect. (Unlike units with Industrial TSM, units with this ability do not include its movement effects in their normal stats, because the ability is activated only by overheating.)",
            "Physical Attacks: When an overheating unit delivers a successful standard- or melee-type physical attack, it adds 1 point to the damage delivered by the attack. Unlike Industrial TSM, this heat- activated version imposes no additional Target Number modifiers.",
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },


    {
        tag: "TUR#",
        name: "Turret",
        summary: [
            "A unit with a turret has some (or all) of its weapons mounted with a 360-degree field of fire. Damage for all turret-mounted weapons are included in the base damage values for the unit, and then separately for the TUR special ability. Thus, when a unit with a turret wishes to make an attack outside of its normal forward field of fire, it must use the damage values for its TUR special ability in place of the unit’s standard damage values.",
            "Attacks made using the turret cannot be combined with any special attack ability not included in the unit’s TUR special ability.",
            "Some particularly large units—such as mobile structures and very large or super large vehicles—may feature multiple turrets. A unit with multiple turrets may use each turret individually to deliver its attacks (see Exceptionally Large Units, p. 64)."
        ],
        asce_page: 79,
        type: ESpecialAbilityType.Standard,
    },
]

export interface IASSpecialAbility {
    tag: string;
    name: string;
    type: ESpecialAbilityType;
    summary: string[];
    asce_page: number;
    rawTag?: string;
}

