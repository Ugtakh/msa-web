import { defineQuery } from "next-sanity";

/**
 * Get all partners
 */
export const ALL_PARTNERS_QUERY = defineQuery(`*[
  _type == "partner"
] | order(createdAt asc) {
  _id,
  name,
  "partnerLogo": partnerLogo{
    asset->{
      _id,
      url
    },
  }
}`);
