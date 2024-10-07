import fs from 'fs';

export async function createSSWDataFile(
    data: string[],
    constVariableName: string,
    dataFilePath: string,
    dataFileName: string,
) {

    let fileContents = `/*
    The data here is/may be copyrighted and NOT included in the GPLv3 license.
    This data is blatantly and lovingly copied from the Solaris Skunk Werks project at https://github.com/Solaris-Skunk-Werks/SSW-Master
*/
`


    fileContents += "export const " + constVariableName + ": string[] = [\n";

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