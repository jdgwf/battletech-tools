use wasm_bindgen::prelude::*;
use uuid::{Uuid};

use crate::pilot::Pilot;
mod alpha_strike_damage;
mod mul_unit;
mod mul_role;
mod mul_tech;
mod mul_type;
mod move_number;
use alpha_strike_damage::AlphaStrikeDamage;
use move_number::MoveNumber;
use mul_unit::MULUnit;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct AlphaStrikeUnit {

    uuid: String,
    original_stats: MULUnit,

    mech_creator_uuid: String,

    classification: String,
    pub cost_cr: u32,

    pub is_aerospace: bool,
    pub is_infantry: bool,
    pub immobile: bool,

    variant: String,
    name: String,
    date_introduced: String,
    era: String,

    tro: String,

    pub show_details: bool,

    pub active: bool,

    pub tonnage: u32,

    unit_type: String,
    pub size: u32,
    pub tmm: u32,

    image_url: String,

    current_move: String,
    current_move_hexes: String,
    current_tmm: String,

    pub armor: u32,
    pub structure: u32,

    pub threshold: u32,

    pub current_to_hit_short: u32,
    pub current_to_hit_medium: u32,
    pub current_to_hit_long: u32,
    pub current_to_hit_extreme: u32,

    pub damage: AlphaStrikeDamage,

    move_value: Vec<MoveNumber>,
    pub jump_move_value: u32,

    pub mul_id: u32,

    abilities: String,

    pub overheat: u32,
    role: String,

    pub base_points: u32,
    pub current_points: u32,
    pub current_heat: u32,

    pub current_damage: AlphaStrikeDamage,

    current_armor: Vec<bool>,
    current_structure: Vec<bool>,
    engine_hits: Vec<bool>,
    fire_control_hits: Vec<bool>,
    mp_control_hits: Vec<bool>,
    weapon_hits: Vec<bool>,

    vehicle_motive_910: Vec<bool>,
    vehicle_motive_11: Vec<bool>,
    vehicle_motive_12: bool,

    _pilot: Pilot,

    custom_name: String,
}