import { defineQuery } from "next-sanity";

export const ALL_STATISTICS_QUERY = defineQuery(`{
  "banners": count(*[_type == "banner"]),
  "partners": count(*[_type == "partner"]),
  "news": count(*[_type == "news"]),
  "standards": count(*[_type == "standard"])
}`);
