"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Header";
import { useState } from "react";
import Footer from "@/components/FooterSection";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type NewsCategory = "news" | "event" | "workshop" | "announcement";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  category: NewsCategory;
  published_at: string | null;
  created_at: string;
}

const NewsDetail = () => {
  const t = useTranslations("news");
  const { id } = useParams<{ id: string }>();

  const [article, setArticle] = useState<NewsArticle | null>(null);
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

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-background">
  //         <Navbar />
  //         <div className="flex items-center justify-center py-32">
  //           <Loader2 className="w-8 h-8 animate-spin text-primary" />
  //         </div>
  //         <Footer />
  //       </div>
  //     );
  //   }

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
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/#news"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {"Мэдээ рүү буцах"}
          </Link>

          {/* Category Badge */}
          <Badge className="mb-4">{getCategoryLabel(article.category)}</Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {article.title}
          </h1>

          {/* Date */}
          <div className="flex items-center text-muted-foreground mb-8">
            <Calendar className="w-5 h-5 mr-2" />
            <time dateTime={article.published_at || article.created_at}>
              {formatDate("mn", article.published_at || article.created_at)}
            </time>
          </div>

          {/* Featured Image */}
          {article.image_url && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                src={article.image_url}
                alt={article.title}
                className="w-full h-auto max-h-125 object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none text-foreground">
              {article.content.split("\n").map(
                (paragraph) =>
                  paragraph.trim() && (
                    <p key={paragraph} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
              )}
            </div>
          )}

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
