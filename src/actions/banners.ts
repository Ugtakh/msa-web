"use server";

import { writeClient } from "@/sanity/lib/client";
import { createSessionClient } from "@/lib/appwrite/client";
import { getPreviewUrl } from "@/lib/getPreviewUrl";
import { BannerType } from "@/lib/schemas";
import { uploadImageSanity } from "@/lib/general-functions";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BANNERS_QUERY } from "@/lib/sanity/queries/banner";
import { revalidatePath } from "next/cache";

export const getBanners = async () => {
  const { data: banners } = await sanityFetch({ query: ALL_BANNERS_QUERY });
  return banners;
};

export const createBanner = async (banner: BannerType, imageFile: File) => {
  // 1 Upload image to sanity asset
  const asset = await uploadImageSanity(imageFile);
  // 2 Create document to sanity
  const newBanner = {
    _type: "banner",
    title: banner.title,
    titleEng: banner.titleEng,
    subTitle: banner.subTitle,
    subTitleEng: banner.subTitleEng,
    description: banner.description,
    descriptionEng: banner.descriptionEng,
    bannerUrl: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    publishedAt: new Date(banner.publishedAt),
  };
  await writeClient.create(newBanner);
  revalidatePath("/admin/banners");
};

export const updateBannerById = async (
  _id: string,
  banner: BannerType,
  imageFile: File | null
) => {
  let asset = null;
  if (imageFile) {
    // 1 Upload image to sanity asset
    asset = await uploadImageSanity(imageFile);
  }
  const { bannerUrl, ...updatedBanner } = banner;
  const updatedNew = {
    ...updatedBanner,
    publishedAt: new Date(banner.publishedAt),
  };

  await writeClient.patch(_id).set(updatedNew).commit();
  revalidatePath("/admin/banners");
};
export const deleteBannerById = async (_id: string) => {
  await writeClient.delete(_id);
  revalidatePath("/admin/banners");
};

export const uploadBannerImage = async (formData: FormData) => {
  const { storage, getID } = await createSessionClient();
  const fileId = getID();
  const file = formData.get("image") as File;
  try {
    await storage.createFile({
      bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? "",
      file: file,
      fileId: fileId,
    });
    const previewUrl = getPreviewUrl(fileId);
    return { previewUrl };
  } catch (error) {
    return error;
  }
};
