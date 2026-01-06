"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ImageIcon,
  LayoutDashboard,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { NavUser } from "./NavUser";
import msaLogo from "@/assets/logos/symbol-light.svg";
import Image from "next/image";

const menuItems = [
  { title: "Дашбоард", icon: <LayoutDashboard />, link: "/admin" },
  { title: "Баннер", icon: <ImageIcon />, link: "/admin/banners" },
  { title: "Хамтрагчид", icon: <Users />, link: "/admin/partners" },
  { title: "Стандарт", icon: <FileText />, link: "/admin/standards" },
  { title: "Мэдээ", icon: <FileText />, link: "/admin/news" },
];

export default function Sidebar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(true);
  // const { current } = useAuth();

  return (
    <div
      className={` border-r transition-all duration-300 ${
        open ? "w-64" : "w-16"
      } flex flex-col`}
    >
      <div className="flex items-center h-15 justify-center px-4 py-3 border-b">
        {open && (
          <div className="flex justify-center flex-1 font-bold text-center">
            <Image src={msaLogo} alt="logo" width={50} height={50} />
            {/* <span className=" text-secondary text-sm">
              Монголын Автомажуулалтын Нийгэмлэг
            </span> */}
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.link}
              href={`${item.link}`}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 text-secondary rounded transition-all duration-300 hover:bg-primary hover:text-white",
                pathName === item.link && "bg-primary text-white"
              )}
            >
              {item.icon}
              {open && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-2 py-3">{/* <NavUser user={current} /> */}</div>
    </div>
  );
}
