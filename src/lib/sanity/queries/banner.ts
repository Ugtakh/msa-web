import { defineQuery } from "next-sanity";

/**
 * Get all banners
 */
export const ALL_BANNERS_QUERY = defineQuery(`*[
  _type == "banner"
] | order(title asc) {
  _id,
  title,
  titleEng,
  subTitle,
  subTitleEng,
  description,
  descriptionEng,
  "bannerUrl": bannerUrl{
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);
