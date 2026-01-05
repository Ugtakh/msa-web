"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  Briefcase,
  FileCheck,
  Network,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurServices = () => {
  const t = useTranslations("ourServices");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: GraduationCap,
      title: "training",
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Briefcase,
      title: "consulting",
      color: "from-chart-2/20 to-chart-2/5",
    },
    {
      icon: FileCheck,
      title: "certification",
      color: "from-chart-3/20 to-chart-3/5",
    },
    {
      icon: Network,
      title: "networking",
      color: "from-chart-4/20 to-chart-4/5",
    },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("badgeText")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {t(`${service.title}.title`)}
                </h3>
                <p className="text-card-foreground/70 mb-4">
                  {t(`${service.title}.description`)}
                </p>
                <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
