"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Header";
import { useEffect, useState } from "react";
import Footer from "@/components/FooterSection";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getNewsByid } from "@/actions/news";
import { NEWS_QUERY_BY_IDResult } from "../../../../sanity.types";
import { PortableText } from "@portabletext/react";
import PtComponents from "@/components/PtComponents";

type NewsCategory = "news" | "event" | "workshop" | "announcement";

const NewsDetail = () => {
  const t = useTranslations("news");
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<NEWS_QUERY_BY_IDResult | undefined>(
    undefined
  );
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
    setArticle(news);
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
              {"Мэдээ рүү буцах"}
            </Link>

            {/* Category Badge */}
            <Badge className="h-fit">{getCategoryLabel("news")}</Badge>
          </div>
          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-foreground mb-6">
            {article.title}
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

          {/* Featured Image */}
          {article.thumbnailUrl?.asset?.url && (
            <div className="mb-8 rounded-xl overflow-hidden text-center">
              <Image
                src={article.thumbnailUrl?.asset?.url}
                width={800}
                height={700}
                alt={article.title || "preview"}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.title}
          </p>

          {/* Content */}
          {/* <div dangerouslySetInnerHTML={{ __html: article.content || "" }} /> */}
          <PortableText components={PtComponents} value={article.content!} />

          {/* Share / Back */}
          <div className="mt-12 pt-8 border-t border-border">
            <Button asChild variant="outline">
              <Link href="/#news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {"Бүх мэдээ рүү буцах"}
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
