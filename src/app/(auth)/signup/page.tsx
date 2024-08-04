import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import signupImage from "@/assets/signup-image.jpg";
import Link from "next/link";
import SignupForm from "./signup-form";

export const metaData: Metadata = {
  title: "Signup",
};

const Page = () => {
  return (
    <main className="grid h-screen place-items-center p-5">
      <div className="flex size-full max-h-[40rem] max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">{"Sign up to bugbook"}</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a
              friend.
            </p>
          </div>
          <SignupForm />
          <Link
            className="block text-center text-muted-foreground hover:underline"
            href={"/login"}
          >
            {"Already have an account ? login"}
          </Link>
        </div>
        <Image
          src={signupImage}
          alt=""
          className="hidden object-cover md:block md:w-1/2"
        />
      </div>
    </main>
  );
};

export default Page;
