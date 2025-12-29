import { redirect } from "next/navigation";
import { getUser } from "@/actions/auth";

const AdminPage = async () => {
  const user = await getUser();

  if (!user) redirect("/login");

  return <div>{user.email}</div>;
};

export default AdminPage;
