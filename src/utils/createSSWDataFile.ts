import fs from 'fs';

export async function createSSWDataFile(
    data: string[],
    constVariableName: string,
    dataFilePath: string,
    dataFileName: string,
) {

    let fileContents = "export const " + constVariableName + ": string[] = [\n";

    for( let item of data ) {
        fileContents += "    `" + item + "`,\n"
    }

    fileContents += "\n";
    fileContents += "];\n";


    if( !await fs.existsSync( dataFilePath ) ) {
        await fs.mkdirSync( dataFilePath )
    }

    fs.writeFileSync(  dataFilePath + dataFileName, fileContents )
}