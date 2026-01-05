"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bannerSchema, BannerType } from "@/lib/schemas";
import { useClient } from "@sanity/sdk-react";

export function AddModal() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<BannerType>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: "",
      titleEng: "",
      subTitle: "",
      subTitleEng: "",
      description: "",
      descriptionEng: "",
      bannerUrl: {
        _type: "image",
        asset: {
          _ref: "reference",
          _type: "image",
        },
      },
    },
  });

  const onSubmit = async (data: BannerType) => {
    console.log("Validated data:", data);
    // API call / mutation энд хийнэ
    if (!imageFile) {
      alert("Зураг заавал оруулна");
      return;
    }
    // 1️⃣ Upload the asset to Sanity
    const asset = await client.assets.upload("image", imageFile, {
      filename: imageFile.name,
    });
    // 2️⃣ Document create
    await client.create({
      _type: "banner",
      title: data.title,
      titleEng: data.titleEng,
      subTitle: data.subTitle,
      subTitleEng: data.subTitleEng,
      description: data.description,
      descriptionEng: data.descriptionEng,
      bannerUrl: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    });

    // 3️⃣ Cleanup
    form.reset();
    setPreview(null);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setImageFile(selectedFile);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ нэмэх</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-secondary">Баннер нэмэх</DialogTitle>
          <DialogDescription className="text-secondary">
            Талбаруудыг бүгдийг бөглөнө.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 text-secondary"
        >
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                placeholder="Гарчиг ..."
                {...form.register("title")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг англи</Label>
              <Input
                id="title"
                placeholder="Гарчиг ..."
                {...form.register("titleEng")}
              />
              {form.formState.errors.title && (
                <p className="text-red-500">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subTitle">Дэд гарчиг</Label>
              <Input
                id="subTitle"
                placeholder="Гарчиг ..."
                {...form.register("subTitle")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subTitle">Дэд гарчиг англи</Label>
              <Input
                id="subTitle"
                placeholder="Гарчиг ..."
                {...form.register("subTitleEng")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desctiption">Тайлбар</Label>
              <Input
                id="desctiption"
                placeholder="Тайлбар ..."
                {...form.register("description")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descriptionEng">Тайлбар англи</Label>
              <Input
                id="descriptionEng"
                placeholder="Тайлбар ..."
                {...form.register("descriptionEng")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="banner">Зураг</Label>
              <Input
                id="banner"
                name="bannerUrl"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="w-full h-35 overflow-hidden">
                {preview && (
                  <Image
                    src={preview || ""}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-full w-auto object-contain text-center"
                  />
                )}
                {/* {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className=" w-full h-full object-cover"
                  />
                ) : form ? (
                  <Avatar className="rounded-lg w-full h-52">
                    <AvatarImage src={form.bannerUrl} alt="preview - remote" />
                  </Avatar>
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                    Image not selected
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              asChild
              onClick={() => {
                form.reset();
                setPreview(null);
              }}
            >
              <Button variant="outline" className="hover:cursor-pointer">
                Болих
              </Button>
            </DialogClose>
            <Button type="submit" className="hover:cursor-pointer">
              Хадгалах
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
