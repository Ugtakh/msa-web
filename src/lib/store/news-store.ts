import { create } from "zustand";
import { SanityImageHotspot } from "../../../sanity.types";

type NewsType = {
  _id?: string;
  title: string | null;
  titleEng: string | null;
  content: string | null;
  contentEng: string | null;
  publishedAt: string | null;
  thumbnailUrl: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
    hotspot: SanityImageHotspot | null;
  } | null;
};

type State = {
  news: NewsType | null;
};

type Actions = {
  editNews: (news: NewsType) => void;
};

export const useNews = create<State & Actions>((set) => ({
  news: null,
  editNews: (b: NewsType) =>
    set((state) => ({ news: { ...state.news, ...b } })),
}));
