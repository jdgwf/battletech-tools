export function breakLines(
    incomingLine: string,
    lineLength: number
): string[] {

    let rv: string[] = [];

    let splitWords = incomingLine.split(" ");

    let line = "";
    for( let word of splitWords ) {
        if( word.length + line.length <= lineLength ) {
            line += word + " ";
        } else {
            rv.push( line.trim() );
            line = "";
            line += word + " ";
        }
    }
    rv.push( line.trim() );

    return rv;
}