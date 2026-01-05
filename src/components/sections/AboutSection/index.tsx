"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Target, Eye, Award, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "@/hooks/useCountUp";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const t = useTranslations("aboutSection");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const membersCount = useCountUp({ end: 5 });
  const certificationsCount = useCountUp({ end: 10 });
  const standardsCount = useCountUp({ end: 7 });

  const stats = [
    {
      icon: Users,
      value: membersCount.count,
      suffix: "+",
      label: "members",
      ref: membersCount.ref,
    },
    {
      icon: Award,
      value: certificationsCount.count,
      suffix: "+",
      label: "certifications",
      ref: certificationsCount.ref,
    },
    {
      icon: Target,
      value: standardsCount.count,
      suffix: "+",
      label: "standarts",
      ref: standardsCount.ref,
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("title")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-card-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subTitle")}
          </p>
        </div>

        {/* Description */}
        <div className="about-card max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-card-foreground/80 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="about-card bg-background p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              {t("mission")}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {t("missionText")}
            </p>
          </div>

          <div className="about-card bg-background p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              {t("vision")}
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              {t("visionText")}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="about-card grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" ref={stat.ref}>
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
