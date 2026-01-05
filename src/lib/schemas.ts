import type { Models } from "node-appwrite";
import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string().optional(),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be less than 2000 characters"),
});

export const bannerSchema = z.object({
  _id: z.string(),
  title: z
    .string()
    .min(1, "Гарчиг заавал оруулна")
    .max(255, "Гарчиг 255 тэмдэгтээс хэтэрч болохгүй"),
  titleEng: z
    .string()
    .min(1, "Гарчиг англиар заавал оруулна")
    .max(255, "Гарчиг 255 тэмдэгтээс хэтэрч болохгүй"),
  subTitle: z
    .string()
    .min(1, "Дэд гарчиг title заавал оруулна")
    .max(255, "Дэд гарчиг 255 тэмдэгтээс хэтэрч болохгүй"),
  subTitleEng: z
    .string()
    .min(1, "Дэд гарчиг англиар заавал оруулна")
    .max(255, "Дэд гарчиг 255 тэмдэгтээс хэтэрч болохгүй"),
  description: z
    .string()
    .min(1, "Тайлбар заавал оруулна")
    .max(255, "Тайлбар 255 тэмдэгтээс хэтэрч болохгүй"),
  descriptionEng: z
    .string()
    .min(1, "Тайлбар англиар заавал оруулна")
    .max(255, "Тайлбар 255 тэмдэгтээс хэтэрч болохгүй"),
  bannerUrl: z.object({
    asset: z.object({
      _id: z.string().optional(),
      url: z.string(),
    }),
  }),
  publishedAt: z.string().min(1, "Огноо заавал оруулна"),
});

export const standardSchema = z.object({
  $id: z.string().optional(),
  code: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  pdfUrl: z.string().optional(),
  $updatedAt: z.string().optional(),
});

export type BannerType = z.infer<typeof bannerSchema>;

export type StandardType = Models.Row & z.infer<typeof standardSchema>;

// News Schema
export const newsSchema = z.object({
  title: z.string().min(1, "Монгол гарчиг заавал оруулна"),
  titleEng: z.string().min(1, "Англи гарчиг заавал оруулна"),
  publishedAt: z.string().min(1, "Нийтлэх огноо заавал оруулна"),
});

export type NewsType = z.infer<typeof newsSchema>;
