use wasm_bindgen::prelude::*;
extern crate serde;
extern crate serde_json;


use crate::pilot::Pilot;
use crate::alpha_strike_unit::alpha_strike_damage::AlphaStrikeDamage;
use crate::alpha_strike_unit::move_number::MoveNumber;
use crate::alpha_strike_unit::mul_tech::MULTech;
use crate::alpha_strike_unit::mul_role::MULRole;
use crate::alpha_strike_unit::mul_type::MULType;

#[allow(non_snake_case)]
#[derive(Debug, Serialize, Deserialize, Clone)]
#[wasm_bindgen]
pub struct MULUnit {
    mechCreatorUUID: String,

    FormatedTonnage: String, // typo in MUL
    GroupName: String,
    BFAbilities: String,
    pub BFArmor: u32,
    pub BFDamageExtreme: u32,
    pub BFDamageLong: u32,
    pub BFDamageMedium: u32,
    pub BFDamageShort: u32,
    BFMove: String,
    pub BFOverheat: u32,
    pub BFPointValue: u32,
    pub BFSize: u32,
    pub BFStructure: u32,
    pub BFTMM: u32,
    pub BFThreshold: u32,
    BFType: String,
    pub BattleValue: u32,
    Class: String,

    pub Cost: u32,
    DateIntroduced: String,
    EraIcon:String,
    pub EraId: u32,
    pub EraStart: u32,
    pub Id: u32,
    ImageUrl: String,
    IsFeatured: bool,
    IsPublished: bool,
    Name: String,
    RS: String,
    pub RSId: u32,
    pub Release: u32,
    Role: MULRole,
    Rules: String,
    pub Skill: u32,
    TRO: String,
    pub TROId: u32,
    Technology: MULTech,
    pub Tonnage: u32,
    Type: MULType,
    Variant: String,

    pub BFDamageShortMinimumTEMPORARY: bool,
    pub BFDamageMediumMinimumTEMPORARY: bool,
    pub BFDamageLongMinimumTEMPORARY: bool,
    pub BFDamageExtremeMinimumTEMPORARY: bool,

    // Additional Fields we use internally

    customName: String,
    currentArmor: Vec<bool>,
    currentStructure: Vec<bool>,
    engineHits: Vec<bool>,
    fireControlHits: Vec<bool>,
    mpControlHits: Vec<bool>,
    weaponHits: Vec<bool>,
    vehicleMotive910: Vec<bool>,
    vehicleMotive11: Vec<bool>,
    pub vehicleMotive12: bool,


    classification: String,
    pub costCR: u32,
    pub mulID: u32,
    pub currentHeat: u32,
    pub damage: AlphaStrikeDamage,
    variant: String,
    dateIntroduced: String,
    name: String,
    pub tonnage: u32,
    tro: String,
    role: String,
    pub threshold: u32,
    pilot: Pilot,

    move_value: Vec<MoveNumber>,
    pub jumpMove: u32,
    pub structure: u32,
    pub armor: u32,
    unit_type: String,
    pub size: u32,
    pub showDetails: bool,
    abilities: String,
    pub overheat: u32,
    pub basePoints: u32,
    pub currentSkill: u32,

    uuid: String,
}

#[wasm_bindgen]
#[allow(non_snake_case)]
impl MULUnit {

    #[wasm_bindgen(constructor)]
    pub fn new() -> MULUnit {
        MULUnit {
            mechCreatorUUID: "".to_string(),

            FormatedTonnage: "".to_string(), // typo in MUL
            GroupName: "".to_string(),
            BFAbilities: "".to_string(),
            BFArmor: 0,
            BFDamageExtreme: 0,
            BFDamageLong: 0,
            BFDamageMedium: 0,
            BFDamageShort: 0,
            BFMove: "".to_string(),
            BFOverheat: 0,
            BFPointValue: 0,
            BFSize: 0,
            BFStructure: 0,
            BFTMM: 0,
            BFThreshold: 0,
            BFType: "".to_string(),
            BattleValue: 0,
            Class: "".to_string(),

            Cost: 0,
            DateIntroduced: "".to_string(),
            EraIcon: "".to_string(),
            EraId: 0,
            EraStart: 0,
            Id: 0,
            ImageUrl: "".to_string(),
            IsFeatured: false,
            IsPublished: false,
            Name: "".to_string(),
            RS: "".to_string(),
            RSId: 0,
            Release: 0,
            Role: MULRole::new(),
            Rules: "".to_string(),
            Skill: 0,
            TRO: "".to_string(),
            TROId: 0,
            Technology: MULTech::new(),
            Tonnage: 0,
            Type: MULType::new(),
            Variant: "".to_string(),

            BFDamageShortMinimumTEMPORARY: false,
            BFDamageMediumMinimumTEMPORARY: false,
            BFDamageLongMinimumTEMPORARY: false,
            BFDamageExtremeMinimumTEMPORARY: false,

            // Additional Fields we use internally

            customName: "".to_string(),
            currentArmor: Vec::new(),
            currentStructure: Vec::new(),
            engineHits: Vec::new(),
            fireControlHits: Vec::new(),
            mpControlHits: Vec::new(),
            weaponHits: Vec::new(),
            vehicleMotive910: Vec::new(),
            vehicleMotive11: Vec::new(),
            vehicleMotive12: false,


            classification: "".to_string(),
            costCR: 0,
            mulID: 0,
            currentHeat: 0,
            damage: AlphaStrikeDamage::new(),
            variant: "".to_string(),
            dateIntroduced: "".to_string(),
            name: "".to_string(),
            tonnage: 0,
            tro: "".to_string(),
            role: "".to_string(),
            threshold: 0,
            pilot: Pilot::new(),

            move_value: Vec::new(),
            jumpMove: 0,
            structure: 0,
            armor: 0,
            unit_type: "".to_string(),
            size: 0,
            showDetails: false,
            abilities: "".to_string(),
            overheat: 0,
            basePoints: 0,
            currentSkill: 0,

            uuid: "".to_string(),
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
    pub fn abilities( &self ) -> String {
        self.abilities.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_abilities( &mut self, new_val: String) {
         self.abilities = new_val;
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
    pub fn role( &self ) -> String {
        self.role.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_role( &mut self, new_val: String) {
         self.role = new_val;
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
    pub fn name( &self ) -> String {
        self.name.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_name( &mut self, new_val: String) {
         self.name = new_val;
    }


    #[wasm_bindgen(getter)]
    pub fn Name( &self ) -> String {
        self.Name.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_Name( &mut self, new_val: String) {
         self.Name = new_val;
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
    pub fn FormatedTonnage( &self ) -> String {
        self.FormatedTonnage.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_FormatedTonnage( &mut self, new_val: String) {
         self.FormatedTonnage = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn GroupName( &self ) -> String {
        self.GroupName.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_GroupName( &mut self, new_val: String) {
         self.GroupName = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn BFAbilities( &self ) -> String {
        self.BFAbilities.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_BFAbilities( &mut self, new_val: String) {
         self.BFAbilities = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn BFMove( &self ) -> String {
        self.BFMove.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_BFMove( &mut self, new_val: String) {
         self.BFMove = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn BFType( &self ) -> String {
        self.BFType.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_BFType( &mut self, new_val: String) {
         self.BFType = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn Class( &self ) -> String {
        self.Class.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_Class( &mut self, new_val: String) {
         self.Class = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn Variant( &self ) -> String {
        self.Variant.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_Variant( &mut self, new_val: String) {
         self.Variant = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn RS( &self ) -> String {
        self.RS.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_RS( &mut self, new_val: String) {
         self.RS = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn Rules( &self ) -> String {
        self.Rules.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_Rules( &mut self, new_val: String) {
         self.Rules = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn ImageUrl( &self ) -> String {
        self.ImageUrl.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_ImageUrl( &mut self, new_val: String) {
         self.ImageUrl = new_val;
    }

    #[wasm_bindgen(getter)]
    pub fn dateIntroduced( &self ) -> String {
        self.dateIntroduced.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_dateIntroduced( &mut self, new_val: String) {
         self.dateIntroduced = new_val;
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
    pub fn customName( &self ) -> String {
        self.customName.clone()
    }
    #[wasm_bindgen(setter)]
    pub fn set_customName( &mut self, new_val: String) {
         self.customName = new_val;
    }

}
