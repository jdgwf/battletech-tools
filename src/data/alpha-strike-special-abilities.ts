export const CONST_AS_SPECIAL_ABILITIES: IASSpecialAbility[] = [
    {
        tag: "AFC",
        name: "Advanced Fire Control",
        summary: "IndustrialMechs and support vehicles equipped with Advanced Fire Control do not suffer Target Number modifiers for their unit type.",
        asce_page: 26,
    },
    {
        tag: "AMP",
        name: "Amphibious",
        summary: "This ability makes a non-naval unit capable of water movement. Amphibious units pay a total of 4” per inch of water traversed and move as a surface naval unit in water, except that they freely move in and out of water areas.",
        asce_page: 26,
    },
    {
        tag: "AECM",
        name: "Angel ECM",
        summary: "An Angel ECM suite has the effects of standard ECM (see p. 77), but is treated as two standard ECM suites if using the ECM/ECCM optional rule (see p. 161).",
        asce_page: 26,
    },
    {
        tag: "AM",
        name: "Anti-'Mech",
        summary: "Infantry units with the Anti-’Mech (AM) special ability can make a special attack against any ground units, landed VTOLs and WiGEs, or grounded aerospace units with which they are in base-to-base contact. Anti-’Mech Infantry attacks are treated as a physical attack (see p. 45).",
        asce_page: 26,
    },
    {
        tag: "AMS",
        name: "Anti-Missile System",
        summary: " A unit with an AMS reduces the damage by 1 point (to a minimum of 1) from any of the following attacks: standard weapon attack from a unit with the IF, SRM, or LRM special abilities, Indirect Fire attack using the IF special ability, or special weapon attack made using the SRM or LRM special abilities. AMS only works on attacks coming in the front arc, unless mounted in a turret (TUR).",
        asce_page: 26,
    },
    {
        tag: "ARM",
        name: "Armored Components",
        summary: "A unit with this ability ignores the first critical hit chance rolled against it during a single Alpha Strike scenario. The first time circumstances arise that would normally generate an opportunity for a critical hit (such as structure damage), the unit’s controlling player must strike off this ability as “spent” for the remainder of the scenario, and the attacker loses his first opportunity to roll for a critical hit.",
        asce_page: 26,
    },
    {
        tag: "ARS",
        name: "Armored Motive System",
        summary: "A unit with this special ability applies a -1 modifier on the Determining Motive Systems Damage roll (see Motive Systems Damage Table, p. 50).",
        asce_page: 26,
    },

]

export interface IASSpecialAbility {
    tag: string;
    name: string;
    summary: string;
    asce_page: number;
}