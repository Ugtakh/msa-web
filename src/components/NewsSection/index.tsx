"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/format-date";

gsap.registerPlugin(ScrollTrigger);

type NewsCategory = "news" | "event" | "workshop" | "announcement";
type Locale = "en" | "mn";

interface NewsArticle {
  id: string;
  title: {
    en: string;
    mn: string;
  };
  excerpt: {
    en: string;
    mn: string;
  };
  image_url: string | null;
  category: NewsCategory;
  published_at: string | null;
  created_at: string;
}

const NewsSection = () => {
  const t = useTranslations("news");
  const locale = useLocale() as Locale;

  const sectionRef = useRef<HTMLElement>(null);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (articles.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [articles]);

  const getCategoryLabel = (category: NewsCategory) => {
    const labels: Record<NewsCategory, string> = {
      news: "News",
      event: "Event",
      workshop: "Workshop",
      announcement: "Announcement",
    };
    return labels[category];
  };

  const staticNews = [
    {
      id: "1",
      title: {
        en: "Annual Automation Conference 2024",
        mn: "2025 оны Жилийн Автоматжуулалтын Хурал",
      },
      excerpt: {
        en: "Join us for the biggest automation event of the year featuring industry leaders and cutting-edge technology demonstrations.",
        mn: "Салбарын тэргүүлэгчид болон дэвшилтэт технологийн үзүүлбэрүүдийг багтаасан жилийн хамгийн том автоматжуулалтын арга хэмжээнд нэгдээрэй.",
      },
      published_at: "2025-12-15",
      category: "event" as NewsCategory,
      image_url:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      title: {
        en: "New ISO Standards in Automation",
        mn: "Автоматжуулалтын шинэ ISO стандартууд",
      },
      excerpt: {
        en: "Learn about the latest ISO standards in automation and how to implement them in your organization.",
        mn: "Автоматжуулалтын шинэ ISO стандартуудыг таниж, тэдгээрийг байгуулалтад хэрхэн хэрэглэх талаар мэдэх боломжтой.",
      },
      published_at: "2025-12-10",
      category: "workshop" as NewsCategory,
      image_url:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      title: {
        en: "MSA Partners with Ministry of Industry",
        mn: "МСА Үйлдвэрийн Яамтай Хамтран Ажиллана",
      },
      excerpt: {
        en: "MSA signs new cooperation agreement with the Ministry of Industry to advance automation education nationwide.",
        mn: "МСА Үйлдвэрийн Яамтай хамтран ажиллаж, автоматжуулалтын боловсролыг нийтлэгийн түвшинд хөгжүүлэх шинэ хамтран ажиллагааны хэлэлцүүлгийг гүйцэтгэнэ.",
      },
      published_at: "2025-12-05",
      category: "news" as NewsCategory,
      image_url:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    },
  ];

  const displayArticles = articles.length > 0 ? articles : staticNews;

  return (
    <section ref={sectionRef} id="news" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("badgeText")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-card-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subTitle")}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {displayArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="news-card group bg-background rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        item.image_url ||
                        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop"
                      }
                      alt={item.title.en}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(locale, item.published_at)}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {item?.title[locale] || item.title.mn}
                    </h3>
                    <p className="text-foreground/70 mb-4 line-clamp-2">
                      {item?.excerpt[locale] || item.excerpt.mn}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      <span>{t("btnText")}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                {t("viewAll")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
