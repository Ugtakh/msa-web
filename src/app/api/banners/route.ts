// import type { NextRequest } from "next/server";
import { Query } from "node-appwrite";
import { createSessionClient } from "@/lib/appwrite/client";

export async function GET() {
  try {
    const { tables, account } = await createSessionClient(); //sessionCookie?.value ??
    const user = await account.get();

    const { rows, total } = await tables.listRows({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "",
      tableId: "banners",
      queries: [Query.select(["title", "subTitle"])],
    });
    return Response.json({ rows, total });
  } catch (error) {
    return Response.json("Access Denied", {
      status: 403,
    });
  }
}
