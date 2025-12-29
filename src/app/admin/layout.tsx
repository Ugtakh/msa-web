export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import { AuthProvider } from "@/providers/AuthProveder";
import { getUser } from "@/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <AuthProvider user={user}>
      <div className="flex w-full min-h-screen bg-white ">
        <Sidebar />
        <main className="flex-1">
          <AdminHeader />
          <div className="flex-1">{children}</div>
        </main>
      </div>
    </AuthProvider>
  );
}
