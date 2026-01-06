"use server";

import { ALL_PARTNERS_QUERY } from "@/lib/sanity/queries/partners";
import { uploadImageSanity } from "@/lib/general-functions";
import { writeClient } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { revalidatePath } from "next/cache";
import { ALL_PARTNERS_QUERYResult } from "../../sanity.types";

export const getPartners = async () => {
  try {
    const { data: partners } = await sanityFetch({
      query: ALL_PARTNERS_QUERY,
    });
    return partners as ALL_PARTNERS_QUERYResult;
  } catch (error) {
    throw error;
  }
};

export const createPartner = async (
  partnerName: string,
  partnerNameEng: string,
  imageFile: File
) => {
  // 1 Upload image to sanity asset
  const asset = await uploadImageSanity(imageFile);
  // 2 Create document to sanity
  const newPartner = {
    _type: "partner",
    name: partnerName,
    nameEng: partnerNameEng,
    partnerLogo: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };
  await writeClient.create(newPartner);
  revalidatePath("/admin/partners");
};
