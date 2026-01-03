"use server";

import { NEWS_QUERY_BY_ID } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/sanity/lib/live";

export const getNewsByid = async (id: string) => {
  try {
    const product = await sanityFetch({
      query: NEWS_QUERY_BY_ID,
      params: { _id: id },
    });

    return product.data;
  } catch (error) {
    // console.error(error);
  }
};
