import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export async function checkUser() {
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
  if (!email) {
    throw new Error("Your sign-in account has no verified email address.");
  }

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || null;

  try {
    // Idempotent even if multiple requests reach the app after the first login.
    return await db.user.upsert({
      where: { clerkUserId: user.id },
      update: { name, imageUrl: user.imageUrl, email },
      create: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });
  } catch (error) {
    // Do not swallow failures: actions should never continue with an absent DB user.
    // The full Prisma error is available in the Vercel function logs.
    console.error("Failed to provision authenticated user:", error);
    throw new Error("Unable to initialize your account. Please try again or contact support.");
  }
}
