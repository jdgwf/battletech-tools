use wasm_bindgen::prelude::*;
extern crate serde;
extern crate serde_json;


#[derive(Debug, Deserialize, Serialize, Clone)]
#[wasm_bindgen]
pub struct MoveNumber {
    pub move_value: u32,
    pub current_move: u32,
    move_type: String,
}

#[wasm_bindgen]
impl MoveNumber {

    #[wasm_bindgen(constructor)]
    pub fn new() -> MoveNumber {
        MoveNumber {
            move_value: 0,
            current_move: 0,
            move_type: "".to_string(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn move_type( &self ) -> String {
        self.move_type.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_move_type( &mut self, new_val: String) {
         self.move_type = new_val;
    }
}