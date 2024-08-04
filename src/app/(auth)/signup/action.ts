"use server";
import { prisma } from "@/lib/prisma-client";
import { signupSchema, SignupValues } from "@/lib/validations";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const signup = async (
  credentials: SignupValues,
): Promise<{ error: string }> => {
  try {
    const { email, password, username } = signupSchema.parse(credentials);

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = generateIdFromEntropySize(10);

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return {
        error: "Username is taken",
      };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });
    if (existingEmail) {
      return {
        error: "Email already taken",
      };
    }

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        username,
        diplayname: username,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
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
