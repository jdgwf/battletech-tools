import { IASMULUnit } from "../../classes/alpha-strike-unit";

export class AppSettings {
    uiTheme: string = "";
    equipmentFilter: string = "";
    installEquipCategory: string = "";

    alphasStrikeCachedSearchResults: IASMULUnit[] = [];
    alphaStrikeSearchTerm: string = "";
    alphaStrikeInPlayCardMode: boolean = false;
    alphaStrikeSearchRules: string = "";
    alphaStrikeSearchTech: string = "";
    alphaStrikeSearchEra: string = "";

    equipmentEditorFile: string = "";

    constructor( io: IAppSettingsExport | null ) {
        this.import(io);
    }

    import( io: IAppSettingsExport | null ) {
        if( io ) {
            if ( typeof( io.uiTheme ) != "undefined" ) {
                this.uiTheme = io.uiTheme;
            }

            if ( typeof( io.equipmentFilter ) != "undefined" ) {
                this.equipmentFilter = io.equipmentFilter;
            }

            if ( typeof( io.installEquipCategory ) != "undefined" ) {
                this.installEquipCategory = io.installEquipCategory;
            }

            if ( typeof( io.alphasStrikeCachedSearchResults ) != "undefined" ) {
                this.alphasStrikeCachedSearchResults = io.alphasStrikeCachedSearchResults;
            }

            if ( typeof( io.alphaStrikeSearchRules ) != "undefined" ) {
                this.alphaStrikeSearchRules = io.alphaStrikeSearchRules;
            }

            if ( typeof( io.alphaStrikeSearchTerm ) != "undefined" ) {
                this.alphaStrikeSearchTerm = io.alphaStrikeSearchTerm;
            }

            if ( typeof( io.alphaStrikeInPlayCardMode ) != "undefined" ) {
                this.alphaStrikeInPlayCardMode = io.alphaStrikeInPlayCardMode;
            }

            if ( typeof( io.equipmentEditorFile ) != "undefined" ) {
                this.equipmentEditorFile = io.equipmentEditorFile;
            }

            if ( typeof( io.alphaStrikeSearchEra ) != "undefined" ) {
                this.alphaStrikeSearchEra = io.alphaStrikeSearchEra;
            }

            if ( typeof( io.alphaStrikeSearchTech ) != "undefined" ) {
                this.alphaStrikeSearchTech = io.alphaStrikeSearchTech;
            }
        }
    }

    export(): IAppSettingsExport {
        return {
            uiTheme: this.uiTheme,
            equipmentFilter: this.equipmentFilter,
            installEquipCategory: this.installEquipCategory,
            alphasStrikeCachedSearchResults: this.alphasStrikeCachedSearchResults,
            alphaStrikeSearchTerm: this.alphaStrikeSearchTerm,
            alphaStrikeInPlayCardMode: this.alphaStrikeInPlayCardMode,
            equipmentEditorFile: this.equipmentEditorFile,
            alphaStrikeSearchRules: this.alphaStrikeSearchRules,
            alphaStrikeSearchEra: this.alphaStrikeSearchEra,
            alphaStrikeSearchTech: this.alphaStrikeSearchTech,
        }
    }
}


export interface IAppSettingsExport {
    uiTheme: string;
    equipmentFilter: string;
    installEquipCategory: string;

    alphasStrikeCachedSearchResults: IASMULUnit[];
    alphaStrikeSearchTerm: string;
    alphaStrikeSearchRules: string;
    alphaStrikeSearchTech: string;
    alphaStrikeSearchEra: string;
    alphaStrikeInPlayCardMode: boolean;

    equipmentEditorFile: string;
}