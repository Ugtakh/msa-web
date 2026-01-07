"use server";

import { ALL_PARTNERS_QUERY } from "@/lib/sanity/queries/partners";
import { uploadImageSanity } from "@/lib/general-functions";
import { writeClient } from "@/sanity/lib/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { ALL_PARTNERS_QUERYResult } from "../../sanity.types";
import { sanityFetch } from "@/lib/sanity/client";

export const getPartners = async () => {
  try {
    const partners = await sanityFetch({
      query: ALL_PARTNERS_QUERY,
      tags: ["partners"],
      revalidate: 120,
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
  revalidateTag("partners", "max");
  await writeClient.create(newPartner);
  revalidatePath("/admin/partners");
};
