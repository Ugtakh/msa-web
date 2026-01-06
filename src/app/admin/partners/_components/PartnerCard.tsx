"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import noLogo from "@/assets/images/no-logo.png";
import { ALL_PARTNERS_QUERYResult } from "../../../../../sanity.types";

type PartnerCardProps = {
  partner: ALL_PARTNERS_QUERYResult[0];
};

const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <Card className="w-full flex flex-col items-center relative max-w-2xs mx-auto overflow-hidden p-1 backdrop-blur py-4">
      <div className="relative w-30 h-30 drop-shadow-2">
        <Avatar className=" w-30 h-30">
          <AvatarImage
            src={partner.partnerLogo?.asset?.url || noLogo.src}
            alt="@shadcn"
            className="object-cover"
          />
          <AvatarFallback>NO-LOGO</AvatarFallback>
        </Avatar>
      </div>

      <h1 className="font-semibold text-sm text-secondary max-w-2xs p-3">
        {partner.name}
      </h1>
    </Card>
  );
};

export default PartnerCard;
