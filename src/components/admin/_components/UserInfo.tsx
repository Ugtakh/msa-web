"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUpIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLogOut } from "@sanity/sdk-react";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);

  const USER = useCurrentUser();
  const logOut = useLogOut();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          {/* <Image
            src={USER.img}
            className="size-12"
            alt={`Avatar of ${USER.name}`}
            role="presentation"
            width={200}
            height={200}
          /> */}
          <Avatar>
            <AvatarImage src={USER?.profileImage} />
            <AvatarFallback className="bg-primary text-white">
              {USER?.name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0"
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-w-57.5"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          <Avatar>
            <AvatarImage src={USER?.profileImage} />
            <AvatarFallback className="bg-primary text-white">
              {USER?.email.substring(0, 1)}
            </AvatarFallback>
          </Avatar>

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {USER?.name}
            </div>

            <div className="leading-none text-gray-6">{USER?.email}</div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <Button
            variant="ghost"
            className="flex w-full items-center gap-2.5 hover:cursor-pointer"
            onClick={async () => {
              setIsOpen(false);
              await logOut();
            }}
          >
            <LogOutIcon />

            <span className="text-base font-medium">Гарах</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
