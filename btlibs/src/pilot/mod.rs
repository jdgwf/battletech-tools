use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct Pilot {

    name: String,
    piloting: u8,
    gunnery: u8,
    wounds: u8,
    alpha_strike_abilities: Vec<u8>,

}