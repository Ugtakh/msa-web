"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

import darkLogoMon from "@/assets/logos/symbol-dark.svg";

const FooterSection = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tb = useTranslations("navigations");
  const quickLinks = [
    { href: "#about", label: tb("about") },
    { href: "#services", label: tb("services") },
    { href: "#membership", label: tb("membership") },
    { href: "#news", label: tb("news") },
    { href: "/standards", label: tb("standards") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center space-x-1 mb-6">
              <Image
                src={darkLogoMon}
                alt="logo"
                className="object-fit w-18 h-auto"
              />
              <div className="flex flex-col">
                <span className={`text-center text-[25px] leading-8`}>
                  {locale === "mn" ? "МОНГОЛЫН" : "MONGOLIAN"}
                </span>
                {/* MONGOLIAN  МОНГОЛЫН*/}
                <span
                  className={`text-center ${
                    locale === "mn" ? "text-[8px]" : "text-[11px]"
                  }`}
                >
                  {locale === "mn"
                    ? "АВТОМАТЖУУЛАЛТЫН НИЙГЭМЛЭГ"
                    : "SOCIETY OF AUTOMATION"}
                </span>
                {/* 24px  11px, 26px <=> 9px */}
                {/* SOCIETY OF AUTOMATION. АВТОМАТЖУУЛАЛТЫН ХОЛБОО */}
              </div>
            </Link>
            <p className="text-secondary-foreground/70 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t("quickLinks")}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t("contactUs")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-white mr-3 mt-0.5 shrink-0" />
                <span className="text-secondary-foreground/70">
                  {t("address")}
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-white mr-3 shrink-0" />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-white mr-3 shrink-0" />
                <a
                  href={`tel:${t("phone")}`}
                  className="text-secondary-foreground/70 hover:text-white transition-colors"
                >
                  {t("phone")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-lg mb-6">{t("followUs")}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-secondary-foreground/60">
            © {new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
