"use client";

import FormInput from "@/components/custom/form-input";
import LoadingButton from "@/components/custom/loading-button";
import { Form } from "@/components/ui/form";
import { signupSchema, SignupValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signup } from "./action";

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSignup = (inputData: SignupValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signup(inputData);
      if (error) {
        setError(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignup)} className="space-y-2">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormInput
          form={form}
          label="Username"
          name="username"
          placeholder="John Doe"
          type="text"
          key={"username"}
        />
        <FormInput
          form={form}
          label="Email"
          name="email"
          placeholder="john@example.com"
          type="email"
          key={"email"}
        />
        <FormInput
          form={form}
          label="Password"
          name="password"
          placeholder="******"
          type="password"
          key={"password"}
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          className="w-full"
        >
          {"Signup"}
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignupForm;
