import { defineQuery } from "next-sanity";

/**
 * Get all standard
 */
export const ALL_STANDARDS_QUERY = defineQuery(`*[
    _type == "standard"
    ] | order(cratedAt asc) {
    _id,
    name,
    nameEng,
    code,
    category,
    "standardPdf":standardPdf{
        asset->{
        _id,
        url
        }
    }
}`);
