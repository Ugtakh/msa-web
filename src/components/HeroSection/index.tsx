"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BannerType } from "@/lib/schemas";
import { ALL_BANNERS_QUERYResult } from "../../../sanity.types";

const HeroSection = ({ banners }: { banners: ALL_BANNERS_QUERYResult }) => {
  const locale = useLocale();
  const t = useTranslations("heroSection");
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // useEffect(() => {
  //   getAllBanners();
  // }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Transition */}
      {banners?.map((banner, index: number) => (
        <div
          key={banner._id}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <Image
            src={banner.bannerUrl?.asset?.url || ""}
            alt={`Slide ${index + 1}`}
            fill
            priority={currentSlide === 0}
            sizes="100vw"
            quality={90}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/80 via-secondary/60 to-secondary/40" />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/10 via-secondary/30 to-secondary/50" />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center hero-content">
          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {locale === "mn"
              ? banners[currentSlide].title
              : banners[currentSlide].titleEng}
          </h1>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
            style={{
              color: "hsl(198 93% 59%)",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {locale === "mn"
              ? banners[currentSlide].subTitle
              : banners[currentSlide].subTitleEng}
          </p>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium"
            style={{
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {locale === "mn"
              ? banners[currentSlide].description
              : banners[currentSlide].descriptionEng}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group px-8 py-6 text-lg shadow-xl"
            >
              <Link href="/auth">
                {t(`btnMember`)}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg shadow-xl bg-transparent text-white hover:cursor-pointer hover:text-primary"
            >
              <Play className="mr-2 w-5 h-5" />
              {t(`btnLearnMore`)}
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <Button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex gap-2">
          {banners.map((banner, index) => (
            <Button
              key={banner._id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-6 h-10 border-2 rounded-full p-1"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        >
          <div
            className="w-1.5 h-2 rounded-full mx-auto animate-bounce"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
