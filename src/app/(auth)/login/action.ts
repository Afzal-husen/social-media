"use server";

import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import { loginSchema, LoginValues } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  credentials: LoginValues,
): Promise<{ error: string }> => {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if (!existingUser || !existingUser.password) {
      return {
        error: `Incorrect username or password`,
      };
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return {
        error: "Incorrect password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong, please try again later",
    };
  }
};
