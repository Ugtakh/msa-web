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

import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createStandard } from "@/actions/standards";
import { cn } from "@/lib/utils";

const categories = [
  {
    label: "MNG",
    value: "mng",
  },
  {
    label: "ISO",
    value: "iso",
  },
];

export function ComboboxDemo({
  value,
  setValue,
  open,
  setOpen,
}: {
  value: string;
  setValue: (_value: string) => void;
  open: boolean;
  setOpen: (_state: boolean) => void;
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white hover:text-secondary"
        >
          {value
            ? categories.find((category) => category.value === value)?.label
            : "Төрөл сонгох"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="bg-white w-full">
          <CommandList>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  className="text-secondary hover:cursor-pointer"
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function AddStandardModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [nameEng, setNameEng] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isModal, setIsModal] = useState(false);
  const [category, setCategory] = useState("");
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
        await createStandard(name, nameEng, code, category, pdfFile);
        toast.success("Амжилттай хадгалагдлаа");
        setName("");
        setPdfFile(null);
        setOpen(false);
        router.refresh();
      } catch (error) {
        toast.error("Алдаа гарлаа дахин оролдоно уу");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="uppercase">+ нэмэх</Button>
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
            <div className="grid gap-2 p-1">
              <Label htmlFor="name">Нэр</Label>
              <Input
                id="name"
                placeholder="Стандартын нэр"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 p-1">
              <Label htmlFor="name">Нэр (Англи)</Label>
              <Input
                id="name"
                placeholder="Стандартын нэр (англи)"
                onChange={(e) => setNameEng(e.target.value)}
              />
            </div>
            <div className="grid gap-2 p-1">
              <Label htmlFor="name">Стандарт код</Label>
              <Input
                id="name"
                placeholder="Стандартын код"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="grid gap-2 p-1">
              <Label htmlFor="name">Стандарт төрөл</Label>
              <ComboboxDemo
                value={category}
                setValue={setCategory}
                open={isModal}
                setOpen={setIsModal}
              />
            </div>

            <div className="grid gap-2 p-1">
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
