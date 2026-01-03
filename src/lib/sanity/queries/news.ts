import { defineQuery } from "next-sanity";

export const ALL_NEWS_QUERY = defineQuery(`*[
  _type == "news"
] | order(publishedAt asc) {
  _id,
  title,
  titleEng,
  publishedAt,
  "thumbnailUrl": thumbnailUrl{
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);

export const NEWS_QUERY_BY_ID = defineQuery(`*[
  _type == "news"
  && _id == $_id
][0] {
  "_id": _id,
  title,
  titleEng,
  content,
  contentEng,
  publishedAt,
  "thumbnailUrl": thumbnailUrl{
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);
