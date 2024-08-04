"use client";

import FormInput from "@/components/custom/form-input";
import LoadingButton from "@/components/custom/loading-button";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./action";

const LoginForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = (inputData: LoginValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await login(inputData);
      if (error) setError(error);
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-5">
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
          label="Password"
          name="password"
          placeholder="******"
          type="password"
          key={"password"}
        />
        <LoadingButton loading={isPending} disabled={isPending}>
          {"Login"}
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
