export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import { AuthProvider } from "@/providers/AuthProvider";
import { getUser } from "@/actions/auth";
// import { Providers } from "@/providers/Providers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    // <Providers>
    <AuthProvider user={user}>
      <div className="flex w-screen h-screen bg-white overflow-hidden">
        <Sidebar />
        <main className="flex flex-col flex-1 h-full min-w-0">
          <AdminHeader />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </AuthProvider>
    // </Providers>
  );
}
