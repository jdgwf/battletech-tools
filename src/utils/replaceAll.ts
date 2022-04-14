export function replaceAll(
    haystack: string,
    needle: string,
    replace: string,
    caseSensitive: boolean = true,
    wholeWordOnly: boolean = false,
    noRegex: boolean = false,
): string {

    if(!haystack)
        return haystack;
    if(!needle)
        return haystack;
    if(!replace)
        return haystack;
    if( typeof(haystack) !== "string") {
        //@ts-ignore
        haystack = haystack.join("\n")
    }
    if( noRegex ) {
        if( wholeWordOnly ) {
            needle = " " + needle;
            replace = " " + replace;
        }
        let iterations = 0
        let maxIterations = 1000;
        while( haystack.indexOf( needle ) > -1 ) {
            if( maxIterations < iterations ) {
                console.error("replaceAll - max Iterations reached!")
                break;
            }

            try {
                haystack = haystack.replace(needle, replace);
            }
            catch(e: any) {
                console.error("replaceAll err", haystack, e)
            }

            iterations++;
        }

        return haystack;
    } else {
        needle = needle.replace("(", "\\(");
        needle = needle.replace("_", "\\_");
        needle = needle.replace(")", "\\)");
        if( wholeWordOnly ) {

            if( caseSensitive ) {
                let re = new RegExp("\\b" + needle + "\\b","g");
                return haystack.replace(re, replace);
            } else {
                let re = new RegExp("\\b" + needle + "\\b","gi");
                return haystack.replace(re, replace);
            }

        } else {

            if( caseSensitive ) {
                let re = new RegExp(needle,"gi");
                return haystack.replace(re, replace);
            }else {
                let re = new RegExp(needle,"g");
                return haystack.replace(re, replace);
            }

        }

    }
}