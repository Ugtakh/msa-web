"use client";

import { useState, useTransition } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";

import gridImg from "@/assets/images/grid-01.svg";
import logo from "@/assets/logos/vertical-msa-logo-light-mon.svg";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/auth";
import { toast } from "sonner";
import { AppwriteException } from "appwrite";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await signIn(email, password);

        if (!result.status) {
          throw result.error;
        }
        router.replace("/admin");
        toast.success(`Нэвтрэлт амжилттай`);
      } catch (error) {
        if (error instanceof Error) {
          let message = "";
          switch (error.message) {
            case "Invalid `password` param: Password must be between 8 and 256 characters long.": {
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
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      <style jsx>{`
        .login-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }
        .login-btn:hover::before {
          left: 100%;
        }
      `}</style>
      <div className="w-full max-w-6xl">
        <div className=" overflow-hidden rounded-[40px] shadow-2xl">
          <div className="grid min-h-175 lg:grid-cols-2">
            {/* Left Side */}
            <div className="brand-side relative  bg-linear-to-bl from-secondary to-primary p-12 text-white">
              <div className="flex flex-col h-full items-center">
                {/* <h1 className="mb-4 text-6xl font-medium">
                  Create, Design, and Innovate
                </h1>
                <p className="mb-12 text-xl opacity-80">
                  Join thousands of creators who trust PixelForge Studio to
                  bring their vision to life
                </p> */}

                {/* <div className="space-y-6">
                  {[
                    {
                      icon: <Palette size={16} />,
                      title: "Advanced Design Tools",
                      desc: "Professional-grade tools for every project",
                    },
                    {
                      icon: <Users size={16} />,
                      title: "Team Collaboration",
                      desc: "Work together seamlessly in real-time",
                    },
                    {
                      icon: <Cloud size={16} />,
                      title: "Cloud Storage",
                      desc: "Access your projects from anywhere",
                    },
                    {
                      icon: <ShieldCheck size={16} />,
                      title: "Enterprise Security",
                      desc: "Bank-level security for your data",
                    },
                  ].map(({ icon, title, desc }, i) => (
                    <div
                      key={i}
                      className="feature-item animate-fadeInUp flex items-center"
                      style={{ animationDelay: `${0.2 * (i + 1)}s` }}
                    >
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                        {icon}
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-sm opacity-70">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div> */}
                <div className="w-full h-full relative">
                  <Image src={gridImg} alt="grid" fill className="z-10" />
                  <div className="flex flex-col z-50 justify-center items-center h-12/12">
                    <Image
                      src={logo}
                      alt="grid"
                      width={70}
                      height={70}
                      className="w-70 h-70 z-20"
                    />
                    {/* <div className=" mb-12 text-lg font-semibold uppercase">
                      Монголын автомажуулалтын нийгэмлэг
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center p-12 text-secondary">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-semibold uppercase">
                    Админ Удирдлага
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground ">
                    бүртгэлтэй хэрэглэгчээр нэвтэрнэ үү
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium uppercase"
                    >
                      Имэйл хаяг
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 " />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-muted-foreground bg-white block w-full rounded-lg border py-3 pr-3 pl-10 text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium uppercase"
                    >
                      Нууц үг
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 " />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white border-muted-foreground block w-full rounded-lg border py-3 pr-12 pl-10 text-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="login-btn overflow-hidden bg-linear-120 from-secondary/90 to-primary/98 relative flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="ml-2">Нэвтэрч байна...</span>
                      </>
                    ) : (
                      "Нэвтрэх"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
