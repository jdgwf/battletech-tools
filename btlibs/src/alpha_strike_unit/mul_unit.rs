use wasm_bindgen::prelude::*;

use crate::pilot::Pilot;
use crate::alpha_strike_unit::alpha_strike_damage::AlphaStrikeDamage;
use crate::alpha_strike_unit::move_number::MoveNumber;
use crate::alpha_strike_unit::mul_tech::MULTech;
use crate::alpha_strike_unit::mul_role::MULRole;
use crate::alpha_strike_unit::mul_type::MULType;

#[allow(non_snake_case)]
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct MULUnit {
    mechCreatorUUID: String,

    FormatedTonnage: String, // typo in MUL
    GroupName: String,
    BFAbilities: String,
    pub BFArmor: i32,
    pub BFDamageExtreme: i32,
    pub BFDamageLong: i32,
    pub BFDamageMedium: i32,
    pub BFDamageShort: i32,
    BFMove: String,
    pub BFOverheat: i32,
    pub BFPointValue: i32,
    pub BFSize: i32,
    pub BFStructure: i32,
    pub BFTMM: i32,
    pub BFThreshold: i32,
    BFType: String,
    pub BattleValue: i32,
    Class: String,

    pub Cost: i32,
    DateIntroduced: String,
    EraIcon:String,
    pub EraId: i32,
    pub EraStart: i32,
    pub Id: i32,
    ImageUrl: String,
    IsFeatured: bool,
    IsPublished: bool,
    Name: String,
    RS: String,
    pub RSId: i32,
    pub Release: i32,
    Role: MULRole,
    Rules: String,
    pub Skill: i32,
    TRO: String,
    pub TROId: i32,
    Technology: MULTech,
    pub Tonnage: i32,
    Type: MULType,
    Variant: String,

    pub BFDamageShortMinimumTEMPORARY: bool,
    pub BFDamageMediumMinimumTEMPORARY: bool,
    pub BFDamageLongMinimumTEMPORARY: bool,
    pub BFDamageExtremeMinimumTEMPORARY: bool,

    customName: String,
    currentArmor: Vec<bool>,
    currentStructure: Vec<bool>,
    engineHits: Vec<bool>,
    fireControlHits: Vec<bool>,
    mpControlHits: Vec<bool>,
    weaponHits: Vec<bool>,
    vehicleMotive910: Vec<bool>,
    vehicleMotive11: Vec<bool>,
    pub vehicleMotive12: bool,

    // Additional Fields we use internally
    classification: String,
    pub costCR: i32,
    pub mulID: i32,
    pub currentHeat: i32,
    damage: AlphaStrikeDamage,
    variant: String,
    dateIntroduced: String,
    name: String,
    pub tonnage: i32,
    tro: String,
    role: String,
    pub threshold: i32,
    pilot: Pilot,

    move_value: Vec<MoveNumber>,
    pub jumpMove: i32,
    pub structure: i32,
    pub armor: i32,
    unit_ype: String,
    pub size: i32,
    pub showDetails: bool,
    abilities: String,
    pub overheat: i32,
    pub basePoints: i32,
    pub currentSkill: i32,

    uuid: String,
}