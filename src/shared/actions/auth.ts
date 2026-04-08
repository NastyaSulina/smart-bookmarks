"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/shared/session";
import { getUserByEmail, createUser } from "@/db/users";
import { authSchema } from "@/shared/auth-schema";
import { redirect } from "next/navigation";

export type FormState = {
  fieldErrors?: {
    email?: string;
    password?: string;
  };
  formError?: string;
};

export async function login(_: FormState, formData: FormData) {
  const result = authSchema.safeParse(Object.fromEntries(formData));

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

  const user = await getUserByEmail(email);
  if (!user) {
    return { formError: "Invalid email or password" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { formError: "Invalid email or password" };
  }

  await createSession(user.userId);
  redirect("/dashboard");
}

export async function register(_: FormState, formData: FormData) {
  const result = authSchema.safeParse(Object.fromEntries(formData));

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

  const existing = await getUserByEmail(email);
  if (existing) {
    return { formError: "Email already in use" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ email, passwordHash });

  await createSession(user.userId);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
