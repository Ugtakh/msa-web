"use server";

import { writeClient } from "@/sanity/lib/client";
import { revalidatePath } from "next/cache";
import { uploadPdfSanity } from "@/lib/general-functions";
import { ALL_STANDARDS_QUERY } from "@/lib/sanity/queries/standards";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_STANDARDS_QUERYResult } from "../../sanity.types";

export const getStandards = async () => {
  try {
    const { data: partners } = await sanityFetch({
      query: ALL_STANDARDS_QUERY,
    });
    return partners as ALL_STANDARDS_QUERYResult;
  } catch (error) {
    throw error;
  }
};

export const createStandard = async (name: string, pdfFile: File) => {
  // 1 Upload pdf file to sanity asset
  const asset = await uploadPdfSanity(pdfFile);
  // 2 Create document to sanity
  const newStandard = {
    _type: "standard",
    name,
    standardPdf: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };
  await writeClient.create(newStandard);
  revalidatePath("/admin/standards");
};
