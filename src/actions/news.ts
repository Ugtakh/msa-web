"use server";

import { sanityFetch } from "@/lib/sanity/client";
import { NEWS_QUERY_BY_IDResult } from "./../../sanity.types";
import { NEWS_QUERY_BY_ID, ALL_ARTICLE_QUERY } from "@/lib/sanity/queries/news";

import { uploadImageSanity } from "@/lib/general-functions";
import { writeClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";

export const getNewsByid = async (id: string) => {
  try {
    const news = await sanityFetch({
      query: NEWS_QUERY_BY_ID,
      params: { _id: id },
      revalidate: 120,
    });

    return news;
  } catch (error) {
    throw error;
  }
};

export const createNews = async (news: any, imageFile: File) => {
  const asset = await uploadImageSanity(imageFile);

  const newsDoc = {
    _type: "news",
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
    publishedAt: new Date(news.publishedAt),
  };
  await writeClient.create(newsDoc);
  revalidatePath("/admin/news");
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
  revalidatePath("/admin/news");
};

export const createNewsNew = async (news: any, imageFile: File) => {
  const asset = await uploadImageSanity(imageFile);

  const newsDoc = {
    _type: "news",
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
  revalidatePath("/admin/news");
};

export const getArticles = async () => {
  try {
    const news = await sanityFetch({
      query: ALL_ARTICLE_QUERY,
    });

    return news;
  } catch (error) {
    throw error;
  }
};
