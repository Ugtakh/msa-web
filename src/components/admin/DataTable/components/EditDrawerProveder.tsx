"use client";

import { createContext, useContext, useState } from "react";
import type { BannerType } from "@/lib/schemas";

type EditDrawerContextType = {
  isOpen: boolean;
  onOpenChange: () => void;
  openEdit: (banner: BannerType) => void;
  selectedBanner: BannerType | undefined;
};

const EditDrawerContext = createContext<EditDrawerContextType | null>(null);

export function EditDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedBanner, setSelectedBanner] = useState<BannerType>();
  const [isOpen, setIsOpen] = useState(false);

  const onOpenChange = () => {
    setIsOpen((pre) => !pre);
  };

  const openEdit = (banner: BannerType) => {
    setSelectedBanner(() => banner);
    setIsOpen(() => true);
  };
  return (
    <EditDrawerContext.Provider
      value={{ isOpen, openEdit, onOpenChange, selectedBanner }}
    >
      {children}
    </EditDrawerContext.Provider>
  );
}

export function useEditDrawer() {
  const ctx = useContext(EditDrawerContext);
  if (!ctx) {
    throw new Error("useEditDrawer must be used inside EditDrawerProvider");
  }
  return ctx;
}
