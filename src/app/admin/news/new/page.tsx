"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { newsSchema, NewsType } from "@/lib/schemas";
import { toast } from "sonner";
import { createNews } from "@/actions/news";

export default function NewNewsPage() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);
  const [contentEng, setContentEng] = useState<any>(null);
  const [isSubmitting, startTransition] = useTransition();

  const form = useForm<NewsType>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      titleEng: "",
      publishedAt: new Date().toISOString().slice(0, 16),
    },
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setImageFile(selectedFile);
  };

  const handleContentChange = useCallback((value: any) => {
    setContent(value);
  }, []);

  const handleContentEngChange = useCallback((value: any) => {
    setContentEng(value);
  }, []);

  const onSubmit = async (data: NewsType) => {
    try {
      if (!imageFile) {
        toast.error("Зураг заавал оруулна уу");
        return;
      }

      if (!content || content.length === 0) {
        toast.error("Монгол контент заавал оруулна уу");
        return;
      }
      const newsDoc = {
        _type: "article",
        title: data.title,
        titleEng: data.titleEng,
        thumbnailUrl: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "",
          },
        },
        content: content,
        contentEng: contentEng,
        publishedAt: data.publishedAt,
      };
      startTransition(async () => {
        await createNews(newsDoc, imageFile);
        toast.success("Мэдээ амжилттай нэмэгдлээ!");
        router.push("/admin/news");
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Шинэ мэдээ нэмэх</CardTitle>
            <Button
              variant="outline"
              onClick={() => router.push("/admin/news")}
              className="bg-white"
            >
              Буцах
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Гарчиг (Монгол) <span className="text-red-500">*</span>
              </Label>
              <Input
                // id="title"
                placeholder="Мэдээний гарчиг..."
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="titleEng">
                Гарчиг (Англи) <span className="text-red-500">*</span>
              </Label>
              <Input
                // id="titleEng"
                placeholder="News title..."
                {...form.register("titleEng")}
              />
              {form.formState.errors.titleEng && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.titleEng.message}
                </p>
              )}
            </div>

            {/* Нүүр зураг */}
            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">
                Нүүр зураг <span className="text-red-500">*</span>
              </Label>
              <Input
                id="thumbnailUrl"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              {preview && (
                <div className="relative w-full h-64 mt-4 rounded-md overflow-hidden border">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Portable Text Editor - Монгол */}
            <div className="space-y-2">
              <Label htmlFor="content">
                Контент (Монгол) <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col border max-h-96 overflow-y-auto">
                {/* <BlockEditor value={content} onChange={handleContentChange} /> */}
                <SimpleEditor
                  content={content}
                  onUpdate={handleContentChange}
                />
              </div>
            </div>

            {/* Portable Text Editor - English */}
            <div className="space-y-2">
              <Label htmlFor="content">
                Контент (Англи) <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-col border max-h-96 overflow-y-auto">
                {/* <BlockEditor value={content} onChange={handleContentChange} /> */}
                <SimpleEditor
                  content={contentEng}
                  onUpdate={handleContentEngChange}
                />
              </div>
            </div>

            {/* Нийтлэх огноо */}
            <div className="space-y-2">
              <Label htmlFor="publishedAt">
                Нийтлэх огноо <span className="text-red-500">*</span>
              </Label>
              <Input
                id="publishedAt"
                type="date"
                {...form.register("publishedAt")}
              />
              {form.formState.errors.publishedAt && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.publishedAt.message}
                </p>
              )}
            </div>

            {/* Товчлууд */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/news")}
                disabled={isSubmitting}
                className="flex-1 bg-white"
              >
                Болих
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
