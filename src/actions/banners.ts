"use server";

import { Query } from "node-appwrite";
import { createSessionClient } from "@/lib/appwrite/client";
import type { BannerType } from "@/lib/schemas";
import { getPreviewUrl } from "@/lib/getPreviewUrl";

export const getBanners = async () => {};

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
    console.log("UPLOAD-ERR", error);
    return null;
  }
};
