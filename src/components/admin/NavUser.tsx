"use client";

import type { Models } from "node-appwrite";
import { IconDotsVertical, IconLogout } from "@tabler/icons-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/actions/auth";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavUser({ user }: { user: Models.User | null }) {
  const isMobile = useIsMobile();
  // const { setCurrent } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 hover:bg-gray-200 rounded-lg p-2">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarFallback className="rounded-lg">
              {user?.name.substring(0, 1).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{"admin"}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user?.email}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-gray-100 "
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={async () => {
            console.log("logout");
            // setCurrent(null);
            await signOut();
          }}
        >
          <IconLogout />
          гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
