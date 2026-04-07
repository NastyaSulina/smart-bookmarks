"use server";

import { z } from "zod";
import { createSession, deleteSession } from "../../lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "example@gmail.com",
  password: "12345678",
};

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export type FormState = {
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  formError?: string;
};

export async function login(_: FormState, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      fieldErrors: {
        email: flattened.fieldErrors.email?.[0],
        password: flattened.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      formError: "Invalid email or password",
    };
  }

  await createSession(testUser.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
