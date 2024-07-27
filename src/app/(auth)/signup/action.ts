"use server";
import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma-client";
import { signupSchema, SignupValues } from "@/lib/validations";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

const signup = async (
  credentials: SignupValues,
): Promise<{ error: string }> => {
  try {
    const { email, password, username } = signupSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

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
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong, please try again later",
    };
  }
};
