"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import heroAutomation from "@/assets/images/hero-automation.jpg";
import heroEngineers from "@/assets/images/hero-engineers.jpg";
import heroTraining from "@/assets/images/hero-training.jpg";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const t = useTranslations("heroSection");
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: heroAutomation,
      section: "heroAutomation",
    },
    {
      image: heroEngineers,
      section: "heroEngineers",
    },
    {
      image: heroTraining,
      section: "heroTraining",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Transition */}
      {slides.map((slide, index: number) => (
        <div
          key={slide.section}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/80 via-secondary/60 to-secondary/40" />
          <div className="absolute inset-0 bg-linear-to-r from-secondary/10 via-secondary/30 to-secondary/50" />
        </div>
      ))}

      {/* Animated particles */}
      {/* <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_) => (
          <div
            key={Math.random()}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div> */}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center hero-content">
          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
            style={{ color: "white", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            {t(`${slides[currentSlide].section}.title`)}
          </h1>
          <p
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-6"
            style={{
              color: "hsl(198 93% 59%)",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {t(`${slides[currentSlide].section}.subTitle`)}
          </p>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium"
            style={{
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {t(`${slides[currentSlide].section}.description`)}
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
              className="px-8 py-6 text-lg shadow-xl bg-transparent"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
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
          {slides.map((slide, index) => (
            <Button
              key={slide.section}
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
