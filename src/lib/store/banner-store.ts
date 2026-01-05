import type { BannerType } from "./../schemas";
import { create } from "zustand";

type State = {
  banner: BannerType | null;
  isOpen: boolean;
};

type Actions = {
  addBanner: (banner: BannerType) => void;
  setIsOpen: (s: boolean) => void;
};

export const useBanner = create<State & Actions>((set) => ({
  banner: null,
  isOpen: false,
  setIsOpen: (s: boolean) => set((_) => ({ isOpen: s })),
  addBanner: (b: BannerType) =>
    set((state) => ({ banner: { ...state.banner, ...b } })),
}));
