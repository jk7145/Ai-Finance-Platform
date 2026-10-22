import { redirect } from "next/navigation";
import { checkUser } from "@/lib/checkUser";

export default async function MainLayout({ children }) {
  // Provision the signed-in Clerk user before any dashboard server action runs.
  const user = await checkUser();
  if (!user) redirect("/sign-in");

  return <div className="container mx-auto my-32">{children}</div>;
}
