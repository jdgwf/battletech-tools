use crate::pilot::Pilot;
use crate::alpha_strike_unit::alpha_strike_damage::AlphaStrikeDamage;
use crate::alpha_strike_unit::move_number::MoveNumber;
use crate::alpha_strike_unit::mul_tech::MULTech;
use crate::alpha_strike_unit::mul_role::MULRole;
use crate::alpha_strike_unit::mul_type::MULType;

#[allow(non_snake_case)]
pub struct MULUnit {
    mechCreatorUUID: String,

    FormatedTonnage: String, // typo in MUL
    GroupName: String,
    BFAbilities: String,
    BFArmor: i32,
    BFDamageExtreme: i32,
    BFDamageLong: i32,
    BFDamageMedium: i32,
    BFDamageShort: i32,
    BFMove: String,
    BFOverheat: i32,
    BFPointValue: i32,
    BFSize: i32,
    BFStructure: i32,
    BFTMM: i32,
    BFThreshold: i32,
    BFType: String,
    BattleValue: i32,
    Class: String,

    Cost: i32,
    DateIntroduced: String,
    EraIcon:String,
    EraId: i32,
    EraStart: i32,
    Id: i32,
    ImageUrl: String,
    IsFeatured: bool,
    IsPublished: bool,
    Name: String,
    RS: String,
    RSId: i32,
    Release: i32,
    Role: MULRole,
    Rules: String,
    Skill: i32,
    TRO: String,
    TROId: i32,
    Technology: MULTech,
    Tonnage: i32,
    Type: MULType,
    Variant: String,

    BFDamageShortMinimumTEMPORARY: bool,
    BFDamageMediumMinimumTEMPORARY: bool,
    BFDamageLongMinimumTEMPORARY: bool,
    BFDamageExtremeMinimumTEMPORARY: bool,

    customName: String,
    // currentSkill: i32,

    currentArmor: Vec<bool>,
    currentStructure: Vec<bool>,
    engineHits: Vec<bool>,
    fireControlHits: Vec<bool>,
    mpControlHits: Vec<bool>,
    weaponHits: Vec<bool>,
    vehicleMotive910: Vec<bool>,
    vehicleMotive11: Vec<bool>,
    vehicleMotive12: bool,

    // Additional Fields we use internally
    classification: String,
    costCR: i32,
    mulID: i32,
    currentHeat: i32,
    damage: AlphaStrikeDamage,
    variant: String,
    dateIntroduced: String,
    name: String,
    tonnage: i32,
    tro: String,
    role: String,
    threshold: i32,
    pilot: Pilot,

    r#move: Vec<MoveNumber>,
    jumpMove: i32,
    structure: i32,
    armor: i32,
    r#type: String,
    size: i32,
    showDetails: bool,
    abilities: String,
    overheat: i32,
    basePoints: i32,
    currentSkill: i32,

    uuid: String,
}