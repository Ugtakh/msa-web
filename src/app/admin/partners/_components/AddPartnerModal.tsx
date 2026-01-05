"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { FormEvent, useState, useTransition } from "react";
import { useClient } from "@sanity/sdk-react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import noLogo from "@/assets/images/no-logo.png";

export function AddPartnerModal() {
  const client = useClient({ apiVersion: "2024-01-01" });

  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setImageFile(selectedFile);
  };

  const savePartner = async () => {
    try {
      //   await savePartner(); // Таны хадгалах функц
      await new Promise((r) => setTimeout(r, 3000));
      toast.success("Амжилттай хадгалагдлаа");

      // 2. Амжилттай болсны дараа төлөвүүдийг цэвэрлээд хаана
      setPreview("");
      setName("");
      setImageFile(null);
      setOpen(false);
    } catch (error) {
      toast.error("Алдаа гарлаа");
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !imageFile) {
      toast.error("Нэр болон логог заавал оруулна");
      return;
    }

    console.log("D", name, imageFile);
    startTransition(savePartner);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ нэмэх</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-secondary">
            Хамтрагч байгууллага нэмэх
          </DialogTitle>
          <DialogDescription className="text-secondary">
            Талбаруудыг бүгдийг бөглөнө.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-3 text-secondary"
        >
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Нэр</Label>
              <Input
                id="name"
                placeholder="Байгууллагын нэр"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="logo">Лого</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              <div className="flex justify-center items-center  w-full h-50">
                <Avatar className=" w-40 h-40">
                  <AvatarImage
                    src={preview || noLogo.src}
                    alt="@shadcn"
                    className="object-cover"
                  />
                  <AvatarFallback>NO-LOGO</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              asChild
              onClick={() => {
                setPreview("");
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
                <span className="flex gap-2">
                  <Loader size={20} className="animate-spin" /> Хадгалж байна...
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
