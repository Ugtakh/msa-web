"use server";

import { writeClient } from "@/sanity/lib/client";
import { generateHTML } from "@tiptap/html";

// --- Tiptap Extensions for HTML Generation ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

export const uploadImage = async (file: File) => {
  try {
    // Sanity assets.upload нь 'file' эсвэл 'buffer' хүлээж авна
    const imageAsset = await writeClient.assets.upload("image", file, {
      filename: file.name,
      contentType: file.type,
    });

    if (!imageAsset || !imageAsset.url) {
      throw new Error("Failed to get URL from Sanity asset");
    }

    return imageAsset.url;
  } catch (error: any) {
    console.error("Sanity Upload Error:", error);
    // Project user not found алдаа гарвал Token эсвэл Project ID-г шалгахыг сануулна
    if (error.message.includes("project user not found")) {
      throw new Error(
        "Sanity Authentication Failed: Check your Write Token permissions."
      );
    }
    throw new Error(error.message || "An error occurred during image upload.");
  }
};

export const saveEditorContent = async (
  contentId: string,
  jsonContent: any
) => {
  try {
    const result = await writeClient
      .patch(contentId)
      .set({
        body: JSON.stringify(jsonContent),
      })
      .commit();
    return result;
  } catch (error) {
    console.error("Save Content Error:", error);
    throw new Error("Failed to save content to Sanity");
  }
};

export const convertToHTML = async (json: any) => {
  if (!json) return "";

  const content = typeof json === "string" ? JSON.parse(json) : json;

  return generateHTML(content, [
    StarterKit.configure({
      // Editor дээр horizontalRule-ийг custom-оор авсан бол энд тохируулна
      horizontalRule: false,
    }),
    Image,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Highlight.configure({ multicolor: true }),
    Typography,
    Superscript,
    Subscript,
  ]);
};
