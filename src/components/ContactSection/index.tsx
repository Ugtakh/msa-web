"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/schemas";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type Locale = "en" | "mn";

const ContactSection = () => {
  const t = useTranslations("contacts");
  const locale = useLocale() as Locale;
  const sectionRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-card",
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
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      //   const fieldErrors: Record<string, string> = {};

      //   result.error.errors.forEach((err) => {
      //     if (err.path[0]) {
      //       fieldErrors[err.path[0] as string] = err.message;
      //     }
      //   });
      //   setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      //   const { data, error } = await supabase.functions.invoke(
      //     "send-contact-email",
      //     {
      //       body: formData,
      //     }
      //   );

      //   if (error) throw error;

      toast("Мессеж илгээгдлээ!", {
        description:
          "Бидэнтэй холбогдсонд баярлалаа. Удахгүй хариу өгөх болно.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast("Алдаа", {
        description: "Мессеж илгээхэд алдаа гарлаа. Дахин оролдоно",
      });
    } finally {
      setLoading(false);
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

  return (
    <section ref={sectionRef} id="contact" className="py-24 bg-background">
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
            {t("subTitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-card bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h3 className="text-2xl font-semibold text-card-foreground mb-6">
              {t("formTitle")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Input
                    name="name"
                    placeholder={t("formName")}
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("formEmail")}
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Input
                    name="phone"
                    placeholder={t("formPhone")}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder={t("formSubject")}
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("formMessagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={errors.message ? "border-destructive" : ""}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t("formBtnSending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t("formBtnText")}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="contact-card flex items-start gap-4 bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
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
            <div className="contact-card bg-card rounded-xl border border-border overflow-hidden h-48">
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
