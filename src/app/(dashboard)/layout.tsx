import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Allow curriculum without login
  const pathname = typeof window === "undefined" ? "" : window.location.pathname;

  if (!session && !pathname.includes("/curriculum")) {
    redirect("/auth/signin");
  }

  return children;
}
