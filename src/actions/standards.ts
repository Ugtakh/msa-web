"use server";

import { writeClient } from "@/sanity/lib/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { uploadPdfSanity } from "@/lib/general-functions";
import { ALL_STANDARDS_QUERY } from "@/lib/sanity/queries/standards";
import { ALL_STANDARDS_QUERYResult } from "../../sanity.types";
import { sanityFetch } from "@/lib/sanity/client";

export const getStandards = async () => {
  try {
    const partners = await sanityFetch({
      query: ALL_STANDARDS_QUERY,
      tags: ["standards"],
      revalidate: 120,
    });
    return partners as ALL_STANDARDS_QUERYResult;
  } catch (error) {
    throw error;
  }
};

export const createStandard = async (
  name: string,
  nameEng: string,
  code: string,
  category: string,
  pdfFile: File
) => {
  // 1 Upload pdf file to sanity asset
  const asset = await uploadPdfSanity(pdfFile);
  // 2 Create document to sanity
  const newStandard = {
    _type: "standard",
    name,
    nameEng,
    code,
    category,
    standardPdf: {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
  };
  revalidateTag("standards", "max");
  await writeClient.create(newStandard);
  revalidatePath("/admin/standards");
};
