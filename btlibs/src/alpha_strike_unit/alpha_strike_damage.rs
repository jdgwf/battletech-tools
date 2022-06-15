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