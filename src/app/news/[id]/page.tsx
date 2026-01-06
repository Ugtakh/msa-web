"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "@/components/sections/FooterSection";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getNewsByid } from "@/actions/news";
import { toast } from "sonner";
import { convertToHTML } from "@/lib/general-functions";

type NewsCategory = "news" | "event" | "workshop" | "announcement";

const NewsDetail = () => {
  const t = useTranslations("news");
  const locale = useLocale();
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<any>(null);
  const [content, setContent] = useState<string>("");
  const [contentEng, setContentEng] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getCategoryLabel = (category: NewsCategory) => {
    const labels: Record<NewsCategory, string> = {
      news: "News",
      event: "Event",
      workshop: "Workshop",
      announcement: "Announcement",
    };
    return labels[category];
  };
  const fetchArticle = async () => {
    const news = await getNewsByid(id);
    if (!news) {
      toast.error("Мэдээ олдсонгүй");
      return;
    }
    const con = await convertToHTML(JSON.parse(news.content ?? ""));
    const conEng = await convertToHTML(JSON.parse(news.contentEng ?? ""));
    setArticle(() => news);
    setContent(() => con);
    setContentEng(() => conEng);
    setLoading(false);
  };

  useEffect(() => {
    if (!id) return;

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
            {t("titleDetail")}
          </h1>
          <p className="text-muted-foreground mb-8">{t("subTitleDetail")}</p>
          <Button asChild>
            <Link href="/#news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backBtnText")}
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl gap-3">
          <div className="flex items-center gap-5 mb-8">
            {/* Back Button */}
            <Link
              href="/#news"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backBtnText")}
            </Link>

            <Badge className="h-fit">{getCategoryLabel("news")}</Badge>
          </div>
          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-6">
            {locale === "mn" ? article.title : article.titleEng}
          </h1>

          {/* Date */}
          <div className="flex items-center text-muted-foreground mb-8">
            <Calendar className="w-5 h-5 mr-2" />
            <time
              dateTime={article.publishedAt || new Date().toLocaleDateString()}
            >
              {formatDate(
                "mn",
                article.publishedAt || new Date().toLocaleDateString()
              )}
            </time>
          </div>

          <div
            className="[&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:py-3 
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:py-4 [&_h1]:text-gray-900 
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:py-4 [&_h2]:text-gray-900 
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:py-4 [&_h3]:text-gray-900
            [&_h4]:text-base [&_h4]:font-bold [&_h4]:py-4 [&_h4]:text-gray-900
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
            [&_li]:mb-1 [&_li]:ml-5
            [&_ul.contains-task-list]:list-none [&_ul.contains-task-list]:ml-0
            [&_p]:mb-4"
            dangerouslySetInnerHTML={{
              __html: locale === "mn" ? content : contentEng,
            }}
          />

          <div className="mt-12 pt-8 border-t border-border">
            <Button asChild variant="outline">
              <Link href="/#news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("viewAll")}
              </Link>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
