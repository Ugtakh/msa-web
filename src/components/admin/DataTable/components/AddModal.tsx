"use client";

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
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bannerSchema, BannerType } from "@/lib/schemas";
import { createBanner } from "@/actions/banners";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/format-date";
import { ChevronDownIcon, Loader } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

export function AddModal() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<BannerType>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      _id: "",
      title: "",
      titleEng: "",
      subTitle: "",
      subTitleEng: "",
      description: "",
      descriptionEng: "",
      bannerUrl: {
        asset: {
          url: "no-url",
        },
      },
      publishedAt: "",
    },
  });

  useEffect(() => {
    form.setValue("_id", "123");
    form.setValue("bannerUrl", {
      asset: {
        url: "no-url",
      },
    });
  }, []);

  const onSubmit = async (data: BannerType) => {
    console.log("D");
    if (!imageFile) {
      alert("Зураг заавал оруулна");
      return;
    }
    startTransition(async () => {
      await createBanner(data, imageFile);
      form.reset();
      setIsOpen(false);
      setPreview(null);
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setImageFile(selectedFile);
  };

  console.log(form.formState.errors);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>+ нэмэх</Button>
      </DialogTrigger>
      <DialogContent className="bg-white h-10/12">
        <DialogHeader>
          <DialogTitle className="text-secondary">Баннер нэмэх</DialogTitle>
          <DialogDescription className="text-secondary">
            Талбаруудыг бүгдийг бөглөнө.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full gap-3 text-secondary overflow-hidden"
        >
          <div className="grid gap-3 h-full overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                placeholder="Гарчиг ..."
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг англи</Label>
              <Input
                id="title"
                placeholder="Гарчиг ..."
                {...form.register("titleEng")}
              />
              {form.formState.errors.titleEng && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.titleEng.message}
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
              {form.formState.errors.subTitle && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.subTitle.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subTitle">Дэд гарчиг англи</Label>
              <Input
                id="subTitle"
                placeholder="Гарчиг ..."
                {...form.register("subTitleEng")}
              />
              {form.formState.errors.subTitleEng && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.subTitleEng.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desctiption">Тайлбар</Label>
              <Textarea
                id="description"
                cols={20}
                className="w-full"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descriptionEng">Тайлбар англи</Label>
              <Textarea
                id="description"
                cols={20}
                className="w-full"
                {...form.register("descriptionEng")}
              />
              {form.formState.errors.descriptionEng && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.descriptionEng.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Огноо
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="bg-white">
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {form.getValues("publishedAt")
                      ? formatDate("en", form.getValues("publishedAt") || "")
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 bg-white"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={
                      new Date(form.getValues("publishedAt") || "2026-01-01")
                    }
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      console.log("SD", date);
                      form.setValue(
                        "publishedAt",
                        date?.toLocaleDateString() || ""
                      );
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.publishedAt && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.publishedAt.message}
                </p>
              )}
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
              <div className="h-30 overflow-hidden flex justify-center mb-5">
                {preview && (
                  <Image
                    src={preview || ""}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="h-full w-auto object-contain text-center"
                  />
                )}
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
              <Button
                variant="outline"
                className="hover:cursor-pointer"
                disabled={isLoading}
              >
                Болих
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="hover:cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <Loader className="animate-spin w-10, h-10" /> Хадгалж
                  байна...
                </span>
              ) : (
                "Хадгалах"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
