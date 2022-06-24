use wasm_bindgen::prelude::*;
use uuid::{Uuid};

use crate::pilot::Pilot;
mod alpha_strike_damage;
mod mul_unit;
mod mul_role;
mod mul_tech;
mod mul_type;
pub mod alpha_strike_abilities;
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

#[wasm_bindgen]
impl AlphaStrikeUnit {

    pub fn import(&mut self,  as_def: &MULUnit ) {

        if  as_def.uuid() != "".to_string() {
            self.uuid = as_def.uuid();
        }
    }

    #[wasm_bindgen(constructor)]
    pub fn new() -> AlphaStrikeUnit {

        AlphaStrikeUnit {

            uuid: Uuid::new_v4().to_string(),
            original_stats: MULUnit::new(),

            mech_creator_uuid: "".to_string(),

            classification: "".to_string(),
            cost_cr: 0,

            is_aerospace: false,
            is_infantry: false,
            immobile: false,

            variant: "".to_string(),
            name: "".to_string(),
            date_introduced: "".to_string(),
            era: "".to_string(),

            tro: "".to_string(),

            show_details: false,

            active: true,

            tonnage: 0,

            unit_type: "".to_string(),
            size: 0,
            tmm: 0,

            image_url: "".to_string(),
            current_move: "".to_string(),
            current_move_hexes: "".to_string(),
            current_tmm: "".to_string(),

            armor: 0,
            structure: 0,

            threshold: 0,

            current_to_hit_short: 0,
            current_to_hit_medium: 0,
            current_to_hit_long: 0,
            current_to_hit_extreme: 0,

            damage: AlphaStrikeDamage::new(),

            move_value: Vec::new(),
            jump_move_value: 0,

            mul_id: 0,

            abilities: "".to_string(),

            overheat: 0,
            role: "".to_string(),

            base_points: 0,
            current_points: 0,
            current_heat: 0,

            current_damage: AlphaStrikeDamage::new(),

            current_armor: Vec::new(),
            current_structure: Vec::new(),
            engine_hits: Vec::new(),
            fire_control_hits: Vec::new(),
            mp_control_hits: Vec::new(),
            weapon_hits: Vec::new(),

            vehicle_motive_910: Vec::new(),
            vehicle_motive_11: Vec::new(),
            vehicle_motive_12: false,

            _pilot: Pilot::new(),

            custom_name: "".to_string(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn uuid( &self ) -> String {
        self.uuid.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_uuid( &mut self, new_val: String) {
         self.uuid = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn mech_creator_uuid( &self ) -> String {
        self.mech_creator_uuid.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_mech_creator_uuid( &mut self, new_val: String) {
         self.mech_creator_uuid = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn classification( &self ) -> String {
        self.classification.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_classification( &mut self, new_val: String) {
         self.classification = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn variant( &self ) -> String {
        self.variant.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_variant( &mut self, new_val: String) {
         self.variant = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn name( &self ) -> String {
        self.name.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_name( &mut self, new_val: String) {
         self.name = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn date_introduced( &self ) -> String {
        self.date_introduced.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_date_introduced( &mut self, new_val: String) {
         self.date_introduced = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn era( &self ) -> String {
        self.era.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_era( &mut self, new_val: String) {
         self.era = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn tro( &self ) -> String {
        self.tro.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_tro( &mut self, new_val: String) {
         self.tro = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn unit_type( &self ) -> String {
        self.unit_type.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_unit_type( &mut self, new_val: String) {
         self.unit_type = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn image_url( &self ) -> String {
        self.image_url.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_image_url( &mut self, new_val: String) {
         self.image_url = new_val;
    }



    #[wasm_bindgen(getter)]
    pub fn current_move( &self ) -> String {
        self.current_move.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_current_move( &mut self, new_val: String) {
         self.current_move = new_val;
    }


    #[wasm_bindgen(getter)]
    pub fn current_move_hexes( &self ) -> String {
        self.current_move_hexes.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_current_move_hexes( &mut self, new_val: String) {
         self.current_move_hexes = new_val;
    }


    #[wasm_bindgen(getter)]
    pub fn current_tmm( &self ) -> String {
        self.current_tmm.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_current_tmm( &mut self, new_val: String) {
         self.current_tmm = new_val;
    }


    #[wasm_bindgen(getter)]
    pub fn abilities( &self ) -> String {
        self.abilities.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_abilities( &mut self, new_val: String) {
         self.abilities = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn role( &self ) -> String {
        self.role.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_role( &mut self, new_val: String) {
         self.role = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn custom_name( &self ) -> String {
        self.custom_name.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_custom_name( &mut self, new_val: String) {
         self.custom_name = new_val;
    }

}