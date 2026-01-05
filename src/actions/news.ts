"use server";

import { NEWS_QUERY_BY_ID, ALL_ARTICLE_QUERY } from "@/lib/sanity/queries/news";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_ARTICLE_QUERYResult, Article } from "../../sanity.types";
import { NewsType } from "@/lib/schemas";
import { uploadImageSanity } from "@/lib/uploadImage";
import { writeClient } from "@/sanity/lib/client";

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

export const createNews = async (news: any, imageFile: File) => {
  const asset = await uploadImageSanity(imageFile);

  const newsDoc = {
    _type: "article",
    title: news.title,
    titleEng: news.titleEng,
    thumbnailUrl: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    content: news.content,
    contentEng: news.contentEng,
    publishedAt: new Date(news.publishedAt || ""),
  };
  await writeClient.create(newsDoc);
};

export const updateNewsById = async (
  _id: string,
  news: any,
  imageFile: File | null
) => {
  let asset = null;
  if (imageFile) {
    asset = await uploadImageSanity(imageFile);
  }

  const { thumbnailUrl, ...updatedNews } = news;
  const updateDoc = {
    ...updatedNews,
    publishedAt: new Date(news.publishedAt),
  };
  await writeClient.patch(_id).set(updateDoc).commit();
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
