import { z } from "zod";

const requiredField = z.string().min(1, "Required");

const signupSchema = z.object({
  username: requiredField
    .trim()
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, - and _ allowed"),
  email: requiredField.email("Invalid email"),
  password: requiredField.min(8, { message: "Must be 8 character" }),
});

export type SignupValues = z.infer<typeof signupSchema>;

const loginSchema = z.object({
  username: requiredField,
  password: requiredField.min(8, { message: "Must be 8 character" }),
});
export type LoginValues = z.infer<typeof loginSchema>;

export { signupSchema, loginSchema };
