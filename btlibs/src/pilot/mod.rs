use wasm_bindgen::prelude::*;
use crate::alpha_strike_unit::alpha_strike_abilities::ASPilotAbility;
extern crate serde;
extern crate serde_json;


#[wasm_bindgen]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Pilot {

    name: String,
    pub piloting: u8,
    pub gunnery: u8,
    pub wounds: u8,
    alpha_strike_abilities: Vec<u8>,

}

#[wasm_bindgen]
impl Pilot {

    #[wasm_bindgen(constructor)]
    pub fn new() -> Pilot {
        Pilot {
            name: "".to_string(),
            piloting: 5,
            gunnery: 4,
            wounds: 5,
            alpha_strike_abilities: Vec::new(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn name( &self ) -> String {
        self.name.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_name( &mut self, new_val: String) {
         self.name = new_val;
    }

    // pub fn get_pilot_abilities( &self ) -> Vec<ASPilotAbility> {
    //     let mut rv: Vec<ASPilotAbility> = Vec::new();

    //     for id in self.alpha_strike_abilities {
    //         for abi in get_ability_list() {
    //             if abi.id == id  {
    //                 rv.push( abi );
    //                 break;
    //             }
    //         }
    //     }

    //     rv.clone()
    // }
}