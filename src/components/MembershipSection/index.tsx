"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Check, User, Building2, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MembershipSection = () => {
  const t = useTranslations("membership");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".membership-card",
        { y: 80, opacity: 0, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
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

  const plans = [
    {
      icon: GraduationCap,
      title: "student",
      label: "studentMember",
      price: "50,000",
      currency: "₮",
      period: "/year",
      features: ["text1", "text2", "text3", "text4"],
      featured: false,
    },
    {
      icon: User,
      title: "individual",
      label: "individualMember",
      price: "150,000",
      currency: "₮",
      period: "/year",
      features: ["text1", "text2", "text3", "text4", "text5"],
      featured: true,
    },
    {
      icon: Building2,
      title: "corporate",
      label: "corporateMember",
      price: "500,000",
      currency: "₮",
      period: "/year",
      features: ["text1", "text2", "text3", "text4", "text5", "text6"],
      featured: false,
    },
  ];

  return (
    <section ref={sectionRef} id="membership" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {t("badgeText")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            {t("subTitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`membership-card relative bg-card rounded-2xl p-8 border-2 transition-transform duration-300 hover:shadow-2xl ${
                plan.featured
                  ? "border-primary shadow-xl scale-110"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium text-center w-fit">
                  {t("popular")}
                </div>
              )}

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4">
                  {t(plan.title)}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-card-foreground">
                    {plan.currency}
                    {plan.price}
                  </span>
                  <span className="text-card-foreground/60 ml-1">
                    {t("period")}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.toString()} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                    <span className="text-card-foreground/80">
                      {t(`${plan.label}.${feature}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.featured ? "" : "variant-outline"}`}
                variant={plan.featured ? "default" : "outline"}
              >
                {t("btnText")}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
