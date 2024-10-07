import { replaceAll } from "./replaceAll";

export function makeURLSlug( str: string ): string {

    return replaceAll(
        str.trim().toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
        "--",
        "-",
        false,
        false,
        true);
}