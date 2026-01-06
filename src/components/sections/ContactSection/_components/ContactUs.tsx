"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Earth from "@/components/ui/globe";
import { SparklesCore } from "@/components/ui/sparkles";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type Locale = "en" | "mn";

export default function ContactUs() {
  const t = useTranslations("contacts");
  const locale = useLocale() as Locale;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Perform form submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "address",
      content: {
        en: "Ulaanbaatar, Mongolia, Sukhbaatar District",
        mn: "Улаанбаатар, Монгол, Сүхбаатар дүүрэг",
      },
    },
    {
      icon: Phone,
      title: "phone",
      content: {
        en: "+976 75778833",
        mn: "+976 75778833",
      },
    },
    {
      icon: Mail,
      title: "email",
      content: {
        en: "info@msa.mn",
        mn: "info@msa.mn",
      },
    },
    {
      icon: Clock,
      title: "workingHours",
      content: {
        en: "Mon - Fri: 9:00 AM - 6:00 PM",
        mn: "Даваа - Баасан: 9:00 - 18:00",
      },
    },
  ];

  //radial-gradient(circle at center, #1677ff, transparent 70%)

  return (
    <section className=" container mx-auto px-4 relative w-full overflow-hidden py-14 md:py-18">
      <div
        className="absolute top-0 left-0 h-125 w-125 rounded-full opacity-20 blur-[120px]"
        style={{
          background: `bg-radial-[circle at center, #1677ff, transparent 70%]`,
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-75 w-75 rounded-full opacity-10 blur-[100px]"
        style={{
          background: `bg-radial-[circle at center, #1677ff, transparent 70%]`,
        }}
      />

      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
          {t("badgeText")}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
          {t("title")}
        </h2>
        {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("subTitle")}
        </p> */}
      </div>

      {/* <div className="relative z-10 container mx-auto px-4 md:px-6"> */}
      <div className="border-border/40 bg-linear-to-tr  mx-auto max-w-6xl overflow-hidden rounded-[28px] border shadow-xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="relative py-10" ref={formRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-full gap-2"
            >
              {/* Contact Info */}
              <div className="space-y-5">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="contact-card flex items-start gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-1">
                        {t(info.title)}
                      </h4>
                      <p className="text-muted-foreground">
                        {info.content[locale]}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Map Placeholder */}
                <div className="contact-card bg-card rounded-xl border border-border overflow-hidden h-45">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1564.4954893744857!2d106.90565069128857!3d47.922438349390035!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2smn!4v1766659150337!5m2!1sen!2smn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MSA Location"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative my-8 flex items-center justify-center overflow-hidden px-5"
          >
            <div className="flex flex-col items-center justify-center overflow-hidden">
              <article className="relative mx-auto h-87.5 min-h-60 max-w-112.5 overflow-hidden rounded-3xl border bg-linear-to-b from-[#1677ff] to-[#1677ff]/5 p-6 text-2xl tracking-tight text-white md:h-112.5 md:min-h-80 md:p-8 md:text-3xl md:leading-[1.05] lg:text-4xl">
                {locale === "mn"
                  ? "Бид дэлхийн өнцөг булан бүрт таньтай холбогдоно."
                  : "We can connect with you anywhere in the world."}
                <div className="absolute -right-20 -bottom-20 z-10 mx-auto flex h-full w-full max-w-75 items-center justify-center transition-all duration-700 hover:scale-105 md:-right-28 md:-bottom-28 md:max-w-[137.5">
                  {/* <Earth
                    scale={1.1}
                    baseColor={[1, 0, 0.3]}
                    markerColor={[0, 0, 0]}
                    glowColor={[1, 0.3, 0.4]}
                  /> */}
                  <Earth
                    scale={1.1}
                    baseColor={[0.086, 0.467, 1]}
                    markerColor={[0, 0, 0]}
                    glowColor={[0.086, 0.467, 1]}
                  />
                </div>
              </article>
            </div>
          </motion.div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
