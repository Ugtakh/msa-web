"use client";

import { useTranslations } from "next-intl";

const partners = [
  { name: "ECA Engingeering", logo: "ECA", color: "from-blue-600 to-blue-800" },
  { name: "Tavan Tolgoi", logo: "TT", color: "from-amber-500 to-amber-700" },
  { name: "MCS Group", logo: "MCS", color: "from-red-500 to-red-700" },
  {
    name: "Monnis Group",
    logo: "MG",
    color: "from-emerald-500 to-emerald-700",
  },
  { name: "Newcom Group", logo: "NC", color: "from-violet-500 to-violet-700" },
  { name: "Gan Metal", logo: "DM", color: "from-slate-500 to-slate-700" },
];

const PartnerMarquee = () => {
  const t = useTranslations("partnerMarquee");

  return (
    <section className="py-20 bg-linear-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("badgeText")}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            {t("title")}
          </h3>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-background to-transparent z-10" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...partners, ...partners, ...partners, ...partners].map(
            (partner) => (
              <div key={partner.name} className="shrink-0 mx-4">
                <div className="w-44 h-24 bg-card rounded-2xl border flex flex-col items-center justify-center gap-2 transition hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${partner.color} flex items-center justify-center`}
                  >
                    <span className="text-sm font-bold text-white">
                      {partner.logo}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {partner.name}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Partner count badge */}
      <div className="flex justify-center mt-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 rounded-full border border-border/50">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i.toString()}
                className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-primary/70 border-2 border-background flex items-center justify-center"
              >
                <span className="text-[10px] font-bold text-primary-foreground">
                  {partners[i]?.logo.charAt(0)}
                </span>
              </div>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {partners.length}+ {t("partnersText")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
