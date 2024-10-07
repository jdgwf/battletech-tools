export function joinListWithEndLabel(
    items: string[] | number[],
    lastJoinLabel: string = "and",
): string {
    let rv: string = "";

    if( items.length > 1 ) {

        for( let itemIndex in items ) {
            if( +itemIndex === items.length - 1 ) {
                if( +itemIndex > 0 ) {
                    if( items.length > 2 ) {
                        rv += ", "
                    } else {
                        rv += " "
                    }
                    if( lastJoinLabel ) {
                        rv += lastJoinLabel + " ";
                    }
                }
            } else {

                if( +itemIndex > 0 ) {
                    if( items.length > 2 ) {
                        rv += ", "
                    }
                }
            }
            rv += items[itemIndex].toString();
        }

    } else if( items.length === 1 ) {
        rv = items[0].toString()
    }

    return rv;
}