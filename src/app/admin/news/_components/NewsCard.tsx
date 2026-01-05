"use client";

import { formatDate } from "@/lib/format-date";
import { useNews } from "@/lib/store/news-store";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ALL_ARTICLE_QUERYResult } from "../../../../../sanity.types";

type NewsCardProps = {
  newsItem: ALL_ARTICLE_QUERYResult[0];
};

export function NewsCard({ newsItem }: NewsCardProps) {
  const locale = useLocale();
  const editNews = useNews((state) => state.editNews);

  const handleNews = () => {
    editNews(newsItem);
  };

  return (
    <Link
      href={`/admin/news/edit`}
      className="news-card group w-full max-w-sm p-0 bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-500"
      onClick={handleNews}
    >
      <div className="relative overflow-hidden">
        <Image
          src={
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop"
          }
          alt={"news"}
          width={400}
          height={300}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            news
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(locale, newsItem.publishedAt)}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {/* {item?.title[locale] || item.title.mn} */}
          {newsItem.title}
        </h3>

        <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
}
