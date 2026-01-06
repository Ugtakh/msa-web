"use client";

import { useLocale, useTranslations } from "next-intl";
// import ybLogo from "@/assets/logos/yb-logo.jpg";
// import ecoLogo from "@/assets/logos/eca-logo.jpg";
// import mustLogo from "@/assets/logos/must-logo.png";
import Image from "next/image";
import { ALL_PARTNERS_QUERYResult } from "../../../../../sanity.types";

const getRandom = () => {
  return Math.floor(Math.random() * 100000).toString(16);
};

const PartnerList = ({ partners }: { partners: ALL_PARTNERS_QUERYResult }) => {
  const t = useTranslations("partnerMarquee");
  const locale = useLocale();

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("badgeText")}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
            {t("title")}
          </h3>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-background to-transparent z-10" />

        {partners?.length > 0 ? (
          <div className="flex w-max animate-marquee hover:paused">
            {[
              ...partners,
              ...partners,
              ...partners,
              ...partners,
              ...partners,
              ...partners,
            ].map((partner) => (
              <div key={partner.name + getRandom()} className="shrink-0 mx-4">
                <div className="w-44 h-28 bg-card rounded-2xl border flex flex-col items-center justify-center gap-2 transition hover:-translate-y-1">
                  <div
                    className={`w-12 rounded-xl flex items-center justify-center`}
                  >
                    <Image
                      className="w-full h-auto object-cover"
                      width={100}
                      height={100}
                      src={partner.partnerLogo?.asset?.url || ""}
                      alt="logo"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {locale === "mn" ? partner.name : partner.nameEng}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>.</div>
        )}
      </div>

      {/* Partner count badge */}
      {partners && (
        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 rounded-full border border-border/50">
            <div className="flex -space-x-2">
              {partners.map((p, i) => (
                <div
                  key={i.toString()}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-secondary to-primary/70 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-white">
                    {locale === "mn" ? p.name?.charAt(0) : p.nameEng?.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-white">
              {partners.length}+ {t("partnersText")}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default PartnerList;
