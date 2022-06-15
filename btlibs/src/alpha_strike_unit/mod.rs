use crate::pilot::Pilot;
// mod alpha_strike_abilities;
mod alpha_strike_damage;
mod mul_unit;
mod mul_role;
mod mul_tech;
mod mul_type;
mod move_number;
use alpha_strike_damage::AlphaStrikeDamage;
use move_number::MoveNumber;
use mul_unit::MULUnit;
use mul_tech::MULTech;
use mul_role::MULRole;
use mul_type::MULType;
// use move_number;

pub struct AlphaStrikeUnit {

    pub uuid: String,
    pub original_stats: MULUnit,

    pub mech_creator_uuid: String,

    pub classification: String,
    pub cost_cr: u32,

    pub is_aerospace: bool,
    pub is_infantry: bool,
    pub immobile: bool,

    pub variant: String,
    pub name: String,
    pub date_introduced: String,
    pub era: String,

    pub tro: String,

    pub show_details: bool,

    pub active: bool,

    pub tonnage: u32,

    pub r#type: String,
    pub size: u32,
    pub tmm: u32,

    pub image_url: String,

    pub current_move: String,
    pub current_move_hexes: String,
    pub current_tmm: String,

    pub armor: u32,
    pub structure: u32,

    pub threshold: u32,

    pub current_to_hit_short: u32,
    pub current_to_hit_medium: u32,
    pub current_to_hit_long: u32,
    pub current_to_hit_extreme: u32,

    pub damage: AlphaStrikeDamage,

    pub r#move: Vec<MoveNumber>,
    pub jump_move: u32,

    pub mul_id: u32,

    pub abilities: String,

    pub overheat: u32,
    pub role: String,

    pub base_points: u32,
    pub current_points: u32,
    pub current_heat: u32,

    pub current_damage: AlphaStrikeDamage,

    pub current_armor: Vec<bool>,
    pub current_structure: Vec<bool>,
    pub engine_hits: Vec<bool>,
    pub fire_control_hits: Vec<bool>,
    pub mp_control_hits: Vec<bool>,
    pub weapon_hits: Vec<bool>,

    pub vehicle_motive_910: Vec<bool>,
    pub vehicle_motive_11: Vec<bool>,
    pub vehicle_motive_12: bool,

    _pilot: Pilot,

    pub custom_name: String,
}