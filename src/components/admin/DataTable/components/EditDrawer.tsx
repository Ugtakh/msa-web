"use client";

import { useEffect, useState, useTransition } from "react";
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
import { ChevronDownIcon, Loader } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/format-date";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import noLogo from "@/assets/images/no-logo.png";
import { updateBannerById } from "@/actions/banners";
import { bannerSchema, BannerType } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBanner } from "@/lib/store/banner-store";

function TableCellViewer() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, startTransition] = useTransition();

  const isOpen = useBanner((state) => state.isOpen);
  const setIsOpen = useBanner((state) => state.setIsOpen);
  const selectedBanner = useBanner((state) => state.banner);

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
      publishedAt: "",
      bannerUrl: {
        asset: {
          url: "",
        },
      },
    },
  });

  useEffect(() => {
    if (!selectedBanner) return;
    form.reset({
      _id: selectedBanner._id,
      title: selectedBanner.title,
      titleEng: selectedBanner.titleEng,
      subTitle: selectedBanner.subTitle,
      subTitleEng: selectedBanner.subTitleEng,
      description: selectedBanner.description,
      descriptionEng: selectedBanner.descriptionEng,
      publishedAt: selectedBanner.publishedAt,
      bannerUrl: selectedBanner.bannerUrl,
    });
    setImageFile(null);
    setPreview("");
  }, [form, selectedBanner]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const clearForm = () => {
    form.reset();
    setIsOpen(false);
  };

  const onSubmit = async (data: BannerType) => {
    try {
      const id = data._id;
      startTransition(async () => {
        await updateBannerById(id, data, imageFile);
      });
      clearForm();
      toast.success("Баннер шинэчлэлт амжилттай.");
    } catch (error) {
      toast.error("Баннер шинэчлэлт амжилтгүй.");
    }
  };

  if (!selectedBanner) return null;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        clearForm();
      }}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent className="bg-white">
        <DrawerHeader className="gap-1">
          <DrawerTitle>Засах</DrawerTitle>
        </DrawerHeader>
        <form
          className="flex flex-col gap-4 h-full overflow-hidden"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col px-4 text-sm h-full gap-4 overflow-y-auto">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Гарчиг</Label>
              <Input id="title" {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Гарчиг (англи)</Label>
              <Input id="title" {...form.register("titleEng")} />
              {form.formState.errors.titleEng && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.titleEng.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="subTitle">Дэд гарчиг</Label>
              <Input id="subTitle" {...form.register("subTitle")} />
              {form.formState.errors.subTitle && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.subTitle.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="subTitle">Дэд гарчиг (англи)</Label>
              <Input id="subTitle" {...form.register("subTitleEng")} />
              {form.formState.errors.subTitleEng && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.subTitleEng.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Тайлбар</Label>
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
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Тайлбар (англи)</Label>
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
                    id="datetime"
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
                    selected={new Date(form.getValues("publishedAt"))}
                    captionLayout="dropdown"
                    onSelect={(date) => {
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
              ) : form.getValues("bannerUrl") ? (
                <Avatar className="rounded-lg w-full h-52">
                  <AvatarImage
                    src={form.getValues("bannerUrl")?.asset?.url ?? noLogo.src}
                    alt="preview - remote"
                  />
                </Avatar>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                  Image not selected
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <Button disabled={isLoading}>
              {isLoading ? (
                <span className="flex gap-2 items-center">
                  <Loader className="animate-spin w-10 h-10" />
                  Хадгалж байна...
                </span>
              ) : (
                "Хадгалах"
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Болих
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default TableCellViewer;
