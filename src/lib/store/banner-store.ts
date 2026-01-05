import type { BannerType } from "./../schemas";
import { create } from "zustand";

type State = {
  banner: BannerType | null;
};

type Actions = {
  addBanner: (banner: BannerType) => void;
};

export const useBanner = create<State & Actions>((set) => ({
  banner: null,
  addBanner: (b: BannerType) =>
    set((state) => ({ banner: { ...state.banner, ...b } })),
}));
