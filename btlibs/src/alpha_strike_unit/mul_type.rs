use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[derive(Debug, Clone)]
#[wasm_bindgen]
pub struct MULType {
    pub Id: u32,
    Image: String,
    Name: String,
    pub SortOrder: u32,
}


#[allow(non_snake_case)]
#[wasm_bindgen]
impl MULType {
    #[wasm_bindgen(getter)]
    pub fn Image( &self ) -> String {
        self.Image.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_Image( &mut self, new_val: String) {
         self.Image = new_val;
    }
    #[wasm_bindgen(getter)]
    pub fn Name( &self ) -> String {
        self.Name.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_Name( &mut self, new_val: String) {
         self.Name = new_val;
    }
}