"use client";

import { useTranslations } from "next-intl";

const StandardTitle = () => {
  const t = useTranslations("standarts");

  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
        {t("title")}
      </h1>
      <p className="text-xl text-muted-foreground  mx-auto">{t("subTitle")}</p>
    </div>
  );
};

export default StandardTitle;
