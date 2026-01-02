"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// import lightLogoMon from "../../assets/logos/msa-logo-mon.png";
// import lightLogoEng from "../../assets/logos/msa-logo-eng.png";
// import darkLogoMon from "../../assets/logos/msa-logo-dark-mon.png";
// import darkLogoEng from "../../assets/logos/msa-logo-dark-eng.png";

import lightLogo from "../../assets/logos/symbol-dark.svg";
import darkLogo from "../../assets/logos/symbol-light.svg";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("navigations");

  const locale = useLocale();
  const [locali, setLocali] = useState(locale);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChangeLocale = (newLocale: string) => {
    setLocali(newLocale);
    document.cookie = "MYNEXTAPP_LOCALE=" + newLocale;
    router.refresh();
  };

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setLocali(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocali(browserLocale);
      document.cookie = "MYNEXTAPP_LOCALE=" + browserLocale;
      router.refresh();
    }
  }, [router, locale]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/#about", label: t("about") },
    { href: "/#services", label: t("services") },
    { href: "/#membership", label: t("membership") },
    { href: "/#news", label: t("news") },
    { href: "/standards", label: t("standards") },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass backdrop-blur-md",
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            {/* <div className="w-50 h-20 px-2 rounded-lg bg-primary flex items-center justify-center"> */}
            <Image
              src={
                scrolled
                  ? darkLogo
                  : pathName === "/standards" || pathName.includes("/news")
                  ? darkLogo
                  : lightLogo
              }
              alt="logo"
              className="object-fit w-18 h-auto"
            />
            <div
              className={`flex flex-col w-38 ${
                scrolled
                  ? "text-secondary"
                  : pathName === "/standards" || pathName.includes("/news")
                  ? "text-secondary"
                  : "text-white"
              }`}
            >
              <h2
                className={`text-center ${
                  locale === "mn" ? "text-[25px]" : "text-[24px]"
                }`}
              >
                {locale === "mn" ? "МОНГОЛЫН" : "MONGOLIAN"}
              </h2>
              <h3
                className={`text-center ${
                  locale === "mn" ? "text-[8px]" : "text-[11px]"
                }`}
              >
                {locale === "mn"
                  ? "АВТОМАТЖУУЛАЛТЫН НИЙГЭМЛЭГ"
                  : "SOCIETY OF AUTOMATION"}
              </h3>
              {/* 24px  11px, 26px <=> 9px */}
              {/* SOCIETY OF AUTOMATION. АВТОМАТЖУУЛАЛТЫН ХОЛБОО */}
            </div>
            {/* </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-semibold transition-colors hover:text-primary relative group",
                  scrolled
                    ? "text-secondary"
                    : pathName === "/standards" || pathName.includes("/news")
                    ? "text-secondary"
                    : "text-white"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleChangeLocale(locali === "en" ? "mn" : "en")}
              className={`flex items-center gap-2  ${
                scrolled
                  ? "text-secondary"
                  : pathName === "/standards" || pathName.includes("/news")
                  ? "text-secondary"
                  : "text-white"
              }`}
            >
              <Globe
                className={`w-4 h-4  ${
                  scrolled
                    ? "text-secondary"
                    : pathName === "/standards" || pathName.includes("/news")
                    ? "text-secondary"
                    : "text-white"
                }`}
              />
              {locali === "en" ? "MN" : "EN"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2">
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute left-0 h-screen w-full py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-secondary hover:text-primary px-4 py-2 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleChangeLocale(locali === "en" ? "mn" : "en")
                }
                className={`flex items-center gap-2 text-secondary hover:cursor-pointer hover:text-primary`}
              >
                <Globe className={`w-4 h-4`} />
                {locali === "en" ? "MN" : "EN"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
