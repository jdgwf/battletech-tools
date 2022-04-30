import { IASMULUnit } from "../../classes/alpha-strike-unit";
import { ESaveDataMode } from "../../dataSaves";

export class AppSettings {
    developerMenu: boolean = false;
    alphaStrikeMeasurementsInHexes: boolean = false;
    uiTheme: string = "";
    equipmentFilter: string = "";
    installEquipCategory: string = "";

    mechRulesFilter: number = 0;
    mechNameFilter: string = "";

    storageLocation: ESaveDataMode = ESaveDataMode.localStorage;

    alphasStrikeCachedSearchResults: IASMULUnit[] = [];
    alphaStrikeSearchTerm: string = "";
    alphaStrikeInPlayCardMode: boolean = false;
    alphaStrikeSearchRules: string = "";
    alphaStrikeSearchTech: string = "";
    alphaStrikeSearchEra: number = 0;

    equipmentEditorFile: string = "";
    asValues: Record<string, number> = {};

    constructor( io: IAppSettingsExport | null ) {
        this.import(io);
    }

    import( io: IAppSettingsExport | null ) {
        if( io ) {
            if ( typeof( io.uiTheme ) !== "undefined" ) {
                this.uiTheme = io.uiTheme;
            }

            if ( typeof( io.alphaStrikeMeasurementsInHexes ) !== "undefined" ) {
                this.alphaStrikeMeasurementsInHexes = io.alphaStrikeMeasurementsInHexes;
            }

            if ( typeof( io.developerMenu ) !== "undefined" ) {
                this.developerMenu = io.developerMenu;
            }
            if ( typeof( io.equipmentFilter ) !== "undefined" ) {
                this.equipmentFilter = io.equipmentFilter;
            }

            if ( typeof( io.installEquipCategory ) !== "undefined" ) {
                this.installEquipCategory = io.installEquipCategory;
            }

            if ( typeof( io.alphasStrikeCachedSearchResults ) !== "undefined" ) {
                this.alphasStrikeCachedSearchResults = io.alphasStrikeCachedSearchResults;
            }

            if ( typeof( io.alphaStrikeSearchRules ) !== "undefined" ) {
                this.alphaStrikeSearchRules = io.alphaStrikeSearchRules;
            }

            if ( typeof( io.alphaStrikeSearchTerm ) !== "undefined" ) {
                this.alphaStrikeSearchTerm = io.alphaStrikeSearchTerm;
            }

            if ( typeof( io.alphaStrikeInPlayCardMode ) !== "undefined" ) {
                this.alphaStrikeInPlayCardMode = io.alphaStrikeInPlayCardMode;
            }

            if ( typeof( io.equipmentEditorFile ) !== "undefined" ) {
                this.equipmentEditorFile = io.equipmentEditorFile;
            }

            if ( typeof( io.alphaStrikeSearchEra ) !== "undefined" && !isNaN(io.alphaStrikeSearchEra) ) {
                this.alphaStrikeSearchEra = +io.alphaStrikeSearchEra;
            }

            if ( typeof( io.alphaStrikeSearchTech ) !== "undefined" ) {
                this.alphaStrikeSearchTech = io.alphaStrikeSearchTech;
            }
            if ( typeof( io.asValues ) !== "undefined" ) {
                this.asValues = io.asValues;
            }
            if ( typeof( io.mechNameFilter ) !== "undefined" ) {
                this.mechNameFilter = io.mechNameFilter;
            }
            if ( typeof( io.mechRulesFilter ) !== "undefined" ) {
                this.mechRulesFilter = io.mechRulesFilter;
            }
        }
    }

    export(): IAppSettingsExport {
        return {
            uiTheme: this.uiTheme,
            developerMenu: this.developerMenu,
            equipmentFilter: this.equipmentFilter,
            installEquipCategory: this.installEquipCategory,
            alphasStrikeCachedSearchResults: this.alphasStrikeCachedSearchResults,
            alphaStrikeSearchTerm: this.alphaStrikeSearchTerm,
            alphaStrikeInPlayCardMode: this.alphaStrikeInPlayCardMode,
            equipmentEditorFile: this.equipmentEditorFile,
            alphaStrikeSearchRules: this.alphaStrikeSearchRules,
            alphaStrikeSearchEra: this.alphaStrikeSearchEra,
            alphaStrikeSearchTech: this.alphaStrikeSearchTech,
            alphaStrikeMeasurementsInHexes: this.alphaStrikeMeasurementsInHexes,
            asValues: this.asValues,

            mechRulesFilter: this.mechRulesFilter,
            mechNameFilter: this.mechNameFilter,
        }
    }
}

export interface IAppSettingsExport {
    uiTheme: string;
    developerMenu: boolean;
    equipmentFilter: string;
    installEquipCategory: string;

    alphasStrikeCachedSearchResults: IASMULUnit[];
    alphaStrikeSearchTerm: string;
    alphaStrikeSearchRules: string;
    alphaStrikeSearchTech: string;
    alphaStrikeSearchEra: number;
    alphaStrikeInPlayCardMode: boolean;
    alphaStrikeMeasurementsInHexes: boolean;

    equipmentEditorFile: string;
    asValues: Record<string, number>;

    mechRulesFilter: number
    mechNameFilter: string
}