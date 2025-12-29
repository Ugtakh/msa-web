"use client";

import { type FormEvent, useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { AppwriteException } from "appwrite";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { signIn } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const Login = () => {
  const t = useTranslations("authSection");
  const router = useRouter();

  const [isLoading, startTransition] = useTransition();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const success = await signIn(loginEmail, loginPassword);
        if (!success) {
          throw new Error("Login failed.");
        }
        router.replace("/admin");
        toast.success(`Нэвтрэлт амжилттай`);
      } catch (error) {
        if (error instanceof AppwriteException) {
          let message = "";
          switch (error.message) {
            case "Invalid `password` param: Password must be between 8 and 256 characters": {
              message = "Таны нууц үг 8 дээш тэмдэгт байх ёстой";
              break;
            }
            case "Invalid credentials. Please check the email and password.": {
              message = "Таны имэйл эсвэл нууц үг буруу байна";
              break;
            }
            case "Rate limit for the current endpoint has been exceeded. Please try again after some time.": {
              message = "Таны түр хүлээж байгаад дараа дахин оролдоно уу";
              break;
            }
            default:
              message = "Алдаа";
          }
          toast.error(`Нэвтрэлт амжилтгүй. ${message}`);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("backBtnText")}
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">
                MSA
              </span>
            </div>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t("formEmail")}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={t("formEmailPlaceholder")}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t("formPassword")}</Label>
                    <span className="flex items-center relative">
                      <Input
                        className="pr-8"
                        id="login-password"
                        type={isShow ? "text" : "password"}
                        placeholder={t("formPasswordPlaceholder")}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      {isShow ? (
                        <Eye
                          className="absolute right-2 hover:cursor-pointer"
                          onClick={() => {
                            setIsShow(false);
                          }}
                        />
                      ) : (
                        <EyeOff
                          className="absolute right-2 hover:cursor-pointer"
                          onClick={() => {
                            setIsShow(true);
                          }}
                        />
                      )}
                    </span>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {isLoading ? "Нэвтэрч байна ..." : t("loginBtnText")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
