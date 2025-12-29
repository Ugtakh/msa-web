'use server';

import { Query } from "node-appwrite";
import { createSessionClient } from "@/lib/appwrite/client";
import type { StandardType } from "@/lib/schemas";
import { getPreviewUrl } from "@/lib/getPreviewUrl";

export const getStandarts = async () => {
    try {
        const { tables } = await createSessionClient();
        const { rows, total } = await tables.listRows<StandardType>({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
            tableId: "standards",
            queries: [
                Query.select(["$id", "title", "description", "code", "category", "pdfUrl", "$updatedAt",])
            ]
        });
        return { status: true, message: "Succes", rows, total }
    } catch (error) {
        console.log("error", error)
        return { status: false, message: "Access Denied" };

    }
}

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
}