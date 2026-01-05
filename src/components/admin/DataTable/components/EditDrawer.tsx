"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEditDrawer } from "./EditDrawerProvider";
import { formatDate } from "@/lib/format-date";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { uploadBannerImage } from "@/actions/banners";
import { BannerType } from "@/lib/schemas";

function TableCellViewer() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const { isOpen, onOpenChange, selectedBanner } = useEditDrawer();
  const [_, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState<BannerType>({
    _id: "",
    title: selectedBanner?.title || "",
    titleEng: selectedBanner?.title || "",
    subTitle: selectedBanner?.subTitle || "",
    subTitleEng: selectedBanner?.subTitleEng || "",
    description: selectedBanner?.description || "",
    descriptionEng: selectedBanner?.descriptionEng || "",
    bannerUrl: selectedBanner?.bannerUrl || {
      _type: "image",
      asset: {
        _ref: "reference",
        _type: "image",
      },
    },
    createdAt: selectedBanner?.createdAt || "",
  });

  useEffect(() => {
    if (selectedBanner) {
      setForm({
        _id: selectedBanner._id,
        title: selectedBanner.title,
        titleEng: selectedBanner.titleEng,
        subTitle: selectedBanner.subTitle,
        subTitleEng: selectedBanner.subTitleEng,
        description: selectedBanner.description,
        descriptionEng: selectedBanner.descriptionEng,
        bannerUrl: selectedBanner.bannerUrl,
        createdAt: "",
      });
    }
  }, [selectedBanner]);

  const onChangeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    uploadImage(selectedFile);
  };

  const uploadImage = async (file: File) => {
    try {
      // 1. API update
      if (!file) {
        toast.error("Файл хоосон байна.");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);

      const { previewUrl } = (await uploadBannerImage(formData)) as {
        previewUrl: string;
      };
      setForm(() => ({ ...form, bgImageUrl: previewUrl }));
      setPreview(() => null);
    } catch (error) {
      // console.log("UPLOAD-ERROR", error);
    }
  };
  const clearForm = () => {
    setForm(() => ({
      _id: "",
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
      createdAt: "",
    }));
    onOpenChange();
  };

  if (!selectedBanner) return null;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={clearForm}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Засах</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col h-full gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={onChangeForm}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="subTitle">Дэд гарчиг</Label>
              <Input
                id="subTitle"
                name="subTitle"
                value={form.subTitle}
                onChange={onChangeForm}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Тайлбар</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                cols={20}
                className="w-full"
                onChange={onChangeForm}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Огноо
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal"
                  >
                    {form.createdAt
                      ? formatDate("en", form.createdAt)
                      : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={new Date(form.createdAt || "")}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setForm({
                        ...form,
                        createdAt: date?.toLocaleDateString(),
                      });
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="image-upload">Зураг сонгох</label>
              <Input
                id="image-upload"
                type="file"
                onChange={onFileChange}
                accept="image/*"
              />
            </div>
            <div className="w-full h-50">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className=" w-full h-full object-cover"
                />
              ) : form?.bannerUrl ? (
                <Avatar className="rounded-lg w-full h-52">
                  <AvatarImage
                    src={form.bannerUrl.asset.url}
                    alt="preview - remote"
                  />
                </Avatar>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  Image not selected
                </div>
              )}
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button
            onClick={() => {
              // console.log("Saving ...", form);
            }}
          >
            Хадгалах
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Болих</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TableCellViewer;
