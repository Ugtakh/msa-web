"use server";

import { NEWS_QUERY_BY_ID, ALL_ARTICLE_QUERY } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_ARTICLE_QUERYResult } from "../../sanity.types";

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

export const getArticles = async () => {
  try {
    const product = await sanityFetch({
      query: ALL_ARTICLE_QUERY,
    });

    return product.data as ALL_ARTICLE_QUERYResult;
  } catch (error) {
    // console.error(error);
  }
};

export const updateArticleById = async () => {
  try {
    const product = await sanityFetch({
      query: ALL_ARTICLE_QUERY,
    });

    return product.data as ALL_ARTICLE_QUERYResult;
  } catch (error) {
    // console.error(error);
  }
};
