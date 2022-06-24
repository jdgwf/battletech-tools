use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone, Copy)]
pub struct AlphaStrikeDamage {
    short: i32,
    medium: i32,
    long: i32,
    extreme: i32,
    short_minimal: bool,
    medium_minimal: bool,
    long_minimal: bool,
    extreme_minimal: bool,
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