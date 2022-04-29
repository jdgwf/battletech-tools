import fs from 'fs';

async function parseFile( filePath: string ): Promise<string[]> {

    if( await fs.existsSync(filePath) ) {
        let fileContents = await fs.readFileSync(filePath, 'utf8');
        let data = JSON.parse(fileContents);


        return data;

    } else {
        console.error("No Such file", filePath)
        return [];
    }
}

async function compareData() {
    let ammunitionDataSSW = await parseFile("./SSW-Equipment/ammunition.json");
    let equipmentDataSSW = await parseFile("./SSW-Equipment/equipment.json");
    let weaponsDataSSW = await parseFile("./SSW-Equipment/weapons.json");
    let physicalsDataSSW = await parseFile("./SSW-Equipment/physicals.json");
}


compareData();