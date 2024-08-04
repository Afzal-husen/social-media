"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "You not allowed to perform this action",
    };
  }
  const sessionId = session.id;
  await lucia.invalidateSession(sessionId);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect("/")
};
