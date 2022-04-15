import { stringify } from "querystring";
import { IRulesLevelOption } from "../data/data-interfaces";

const { XMLParser } = require( "fast-xml-parser" );

export interface ISSWBasicInfo {
    model: string;
    name: string;
    tonnage: number;
    rules_level_ssw: number;
    rules_level: IRulesLevelOption | null;
    cbill_cost: number;
    bv2: number;
    bfvalue: number;
    omnimech: boolean;
    motive_type: string;
    mech_type: string;
    tech_base: string;
    era_ssw: number;
    production_era_ssw: number;
    source: string;
    year: number;
}

export function getSSWXMLBasicInfo(
    ssw_xml: string,
): ISSWBasicInfo | null {

    const options = {
        ignoreAttributes : false
    };
    const parser = new XMLParser(options);
    let jObj = parser.parse(ssw_xml);

    // console.log( "battlemech.importSSWXML() jObj", jObj)
    if( jObj && jObj.mech ) {

        let rv: ISSWBasicInfo = {
            model: "",
            name: "",
            tonnage: 0,
            rules_level_ssw: 0,
            rules_level: null,
            cbill_cost: 0,
            bv2: 0,
            bfvalue: 0,
            omnimech: false,
            motive_type: "",
            mech_type: "",
            era_ssw: 0,
            tech_base: "",
            production_era_ssw: 0,
            source: "",
            year: 0,
        }
        if( jObj.mech["@_model" ] ) {
            rv.model = jObj.mech["@_model" ];
        }
        if( jObj.mech["@_name" ] ) {
            rv.name = jObj.mech["@_name" ];
        }
        if( jObj.mech["@_omnimech"] ) {
            // this._omnimech = jObj.mech["@_omnimech" ];
            if( jObj.mech["@_omnimech" ] && jObj.mech["@_omnimech" ] === "TRUE")
            rv.omnimech = true;
        }
        if( jObj.mech["@_solaris7id"] ) {

        }
        if( jObj.mech["@_solaris7imageid"] ) {

        }
        if( jObj.mech["@_sswimage"] ) {

        }
        if( jObj.mech["@_tons"] ) {
            rv.tonnage = +jObj.mech["@_tons"];
        }
        if( jObj.mech.battle_value ) {
            rv.bv2 = +jObj.mech.battle_value;
        }
        if( jObj.mech.cost ) {
            rv.cbill_cost = Math.round(+jObj.mech.cost);
        }
        if( jObj.mech.rules_level ) {
            rv.rules_level_ssw = +jObj.mech.rules_level
        }

        if( jObj.mech.mech_type ) {
            rv.mech_type = jObj.mech.mech_type
        }
        if( jObj.mech.motive_type ) {
            rv.motive_type = jObj.mech.motive_type
        }
                if( jObj.mech.motive_type ) {
            rv.motive_type = jObj.mech.motive_type
        }
        if( jObj.mech.techbase && jObj.mech.techbase["#text"]) {
            rv.tech_base = jObj.mech.techbase["#text"]
        }
        if( jObj.mech.year && jObj.mech.year["#text"]) {
            rv.year = jObj.mech.year["#text"]
        }
        if( jObj.mech.era ) {
            rv.era_ssw = +jObj.mech.era
        }
        if( jObj.mech.productionera && jObj.productionera ) {
            rv.production_era_ssw = +jObj.productionera
        }
        if( jObj.mech.baseloadout && jObj.mech.baseloadout.source) {
            rv.source = jObj.mech.baseloadout.source;
        }
        if( jObj.mech.baseloadout && jObj.mech.baseloadout.battleforce && jObj.mech.baseloadout.battleforce["@_pv"]) {
            rv.bfvalue = +jObj.mech.baseloadout.battleforce["@_pv"];
        }
        return rv;
    }


    return null;

}