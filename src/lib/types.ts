import {
  Building2Icon,
  LucideIcon,
  NewspaperIcon,
  NotebookIcon,
  ViewIcon,
} from "lucide-react";

type CARD_TYPES = "banners" | "news" | "partners" | "standards";

type STAT_TYPE = {
  label: string;
  value: CARD_TYPES;
  icon: LucideIcon;
  iconClassName: string;
};

export const statistics: STAT_TYPE[] = [
  {
    label: "Нийт баннер",
    value: "banners",
    icon: ViewIcon,
    iconClassName: "bg-green-400",
  },
  {
    label: "Нийт хамтрагчид",
    value: "partners",
    icon: Building2Icon,
    iconClassName: "bg-orange-400",
  },
  {
    label: "Нийт стандарт",
    value: "standards",
    icon: NotebookIcon,
    iconClassName: "bg-violet-400",
  },
  {
    label: "Нийт Мэдээ",
    value: "news",
    icon: NewspaperIcon,
    iconClassName: "bg-blue-400",
  },
];
