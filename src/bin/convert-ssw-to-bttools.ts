import { BattleMech, IBattleMechExport } from "../classes/battlemech";
import fs from 'fs';
import { getSSWXMLBasicInfo } from "../utils/getSSWXMLBasicInfo";
import { createSSWDataFile } from "../utils/createSSWDataFile";


function convertSSWToJeffBattleTechTools(
    xml_string: string
): IBattleMechExport {
    let bm = new BattleMech();
    bm.importSSWXML(xml_string);

    return bm.export();
}

async function importDirectory( dir: string ): Promise<string[]> {
    if( await fs.existsSync(dir) ) {
        let files = await fs.readdirSync(dir)

        let dataFiles: string[] = [];
        for( let file of files) {

            if( await fs.existsSync(dir + file) ) {
                let fileContents = await fs.readFileSync(dir + file, 'utf8');
                let data = getSSWXMLBasicInfo(fileContents);


                if( data ) {

                    if( data?.rules_level_ssw === 0 && data.mech_type === "BattleMech") {
                        // console.log("data", data)
                        dataFiles.push( fileContents );
                    }
                }

            } else {
                console.error("No Such file", dir + file);
            }
        }

        return dataFiles;

    } else {
        console.error("No Such directory", dir)
        return [];
    }
}

async function goThroughDirectories() {
    let dataFiles: string[] = [];
    dataFiles = dataFiles.concat( await importDirectory("./SSW-Master/RS 3039u/") );
    dataFiles = dataFiles.concat( await importDirectory("./SSW-Master/RS 3050U/Inner Sphere/") );

    if( dataFiles.length > 0 ) {
        await createSSWDataFile(
            dataFiles,
            "sswMechs",
            "./src/data/ssw/",
            "sswMechs.ts",
        );
    }
    console.log("dataFiles", dataFiles.length)

    process.exit();
}

goThroughDirectories();