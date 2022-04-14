export function makeRange( start: number, end: number, steps: number = 1): number[] {
    let returnValue: number[] = [];

    for( let count = start; count <= end; count = count + steps ) {
        returnValue.push( count );
    }

    return returnValue;
}