export function exportCleanJSON(obj: any) {
    var cleaned = JSON.stringify(obj, null, 4);

    // return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
    //     return match.replace(/"/g, "");
    // });
    return cleaned.replace(/"([^"]+)":/g, '$1:');;
}