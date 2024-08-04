import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import { PasswordInput } from "../ui/password-input";

type FormInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "password" | "number";
};

const FormInput = (props: FormInputProps) => {
  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            {props.type === "password" ? (
              <PasswordInput
                type={props.type}
                placeholder={props.placeholder}
                {...field}
              />
            ) : (
              <Input
                type={props.type}
                placeholder={props.placeholder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
