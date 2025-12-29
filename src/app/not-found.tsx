import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const t = useTranslations("notFound");
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-serif font-semibold text-foreground mb-4">
          {t("title")}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {t("subTitle")}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backBtnText")}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              {t("btnText")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
