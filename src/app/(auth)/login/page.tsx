import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import loginImage from "@/assets/login-image.jpg";
import LoginForm from "./login-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <main className="grid h-screen place-items-center p-5">
      
      <div className="flex size-full max-h-[40rem] max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">
            {"Login into bugbook"}
          </h1>
          <LoginForm />
          <Link
            className="block text-center text-muted-foreground hover:underline"
            href={"/signup"}
          >
            {"Don't have and account ? Signup"}
          </Link>
        </div>
        <Image
          src={loginImage}
          alt="Login image"
          className="hidden object-cover md:block md:w-1/2"
        />
      </div>
    </main>
  );
};

export default Page;
