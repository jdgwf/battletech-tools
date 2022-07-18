use wasm_bindgen::prelude::*;
extern crate serde;
extern crate serde_json;

#[wasm_bindgen]
#[derive(Debug, Clone, Serialize, Deserialize, Copy)]
pub struct AlphaStrikeDamage {
    pub short: u32,
    pub medium: u32,
    pub long: u32,
    pub extreme: u32,
    pub short_minimal: bool,
    pub medium_minimal: bool,
    pub long_minimal: bool,
    pub extreme_minimal: bool,
}

impl AlphaStrikeDamage {
    pub fn new() -> AlphaStrikeDamage {
        AlphaStrikeDamage {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0,
            short_minimal: false,
            medium_minimal: false,
            long_minimal: false,
            extreme_minimal: false,
        }
    }
}