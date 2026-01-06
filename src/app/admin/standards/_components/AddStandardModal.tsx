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
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { createStandard } from "@/actions/standards";

export function AddStandardModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [nameEng, setNameEng] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setPdfFile(selectedFile);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !pdfFile) {
      toast.error("Нэр болон PDF файлыг заавал оруулна");
      return;
    }

    startTransition(async () => {
      try {
        // await new Promise((r) => setTimeout(r, 3000));
        await createStandard(name, pdfFile);
        router.refresh();
        toast.success("Амжилттай хадгалагдлаа");
        setName("");
        setPdfFile(null);
        setOpen(false);
      } catch (error) {
        toast.error("Алдаа гарлаа дахин оролдоно уу");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ нэмэх</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-secondary">Стандарт нэмэх</DialogTitle>
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
                placeholder="Стандартын нэр"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Нэр (Англи)</Label>
              <Input
                id="name"
                placeholder="Стандартын нэр (англи)"
                onChange={(e) => setNameEng(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Стандарт код</Label>
              <Input
                id="name"
                placeholder="Стандартын код"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pdf">PDF файл</Label>
              <Input
                id="pdf"
                type="file"
                accept="application/pdf"
                onChange={onFileChange}
              />
              <div className="text-sm text-muted-foreground">
                {pdfFile ? pdfFile.name : "Файл сонгогдоогүй"}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              asChild
              onClick={() => {
                setName("");
                setPdfFile(null);
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
