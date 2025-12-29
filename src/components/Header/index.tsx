"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    console.log("ELOC", locale);
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
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                MSA
              </span>
            </div>
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
                    ? "text-foreground"
                    : pathName === "/standards"
                    ? "text-foreground"
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
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => handleChangeLocale(locali === "en" ? "mn" : "en")}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {locali === "en" ? "MN" : "EN"}
            </Button> */}

            {/* {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    {user.email?.split("@")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          {locali === "en" ? "Admin Dashboard" : "Админ хяналт"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    {locali === "en" ? "Sign Out" : "Гарах"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth">{t("btnLogin")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth">{t("btnLogin")}</Link>
                </Button>
              </>
            )} */}
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
          <div className="lg:hidden absolute left-0 w-full py-4 border-t border-border bg-card/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-primary px-4 py-2 font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-foreground hover:text-primary px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="flex items-center gap-4 px-4 pt-4 border-t border-border">
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleChangeLocale(locali === "en" ? "mn" : "en")
                  }
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" color="white" />
                  {locali === "en" ? "MN" : "EN"}
                </Button> */}
                {/* {user ? (
                  <>
                    {isAdmin && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <Shield className="w-4 h-4 mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      {locali === "en" ? "Sign Out" : "Гарах"}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      {t("btnLogin")}
                    </Link>
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
