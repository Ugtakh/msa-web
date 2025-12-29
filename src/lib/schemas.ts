
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
    $id: z.string().optional(),
    title: z.string(),
    subTitle: z.string(),
    description: z.string().optional(),
    bgImageUrl: z.string().optional(),
    $updatedAt: z.string().optional(),
    reviewer: z.string().optional(),
});

export const standardSchema = z.object({
    $id: z.string().optional(),
    code: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    pdfUrl: z.string().optional(),
    $updatedAt: z.string().optional()
});

export type BannerType = Models.Row & z.infer<typeof bannerSchema>

export type StandardType = Models.Row & z.infer<typeof standardSchema> 
