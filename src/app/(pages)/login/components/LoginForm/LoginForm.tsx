"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormState, login } from "../../actions";

import styles from "./LoginForm.module.css";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className={styles.submit}>
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}

export function LoginForm() {
  const [state, loginAction] = useActionState(login, {} as FormState);

  return (
    <div className={styles.root}>
      <h1>Login</h1>

      <form action={loginAction} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
          />
        </label>
        {state?.fieldErrors?.email && (
          <p className={styles.error}>{state.fieldErrors.email}</p>
        )}

        <label className={styles.label}>
          Password:
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
        </label>
        {state?.fieldErrors?.password && (
          <p className={styles.error}>{state.fieldErrors.password}</p>
        )}

        <SubmitButton />
        {state?.formError && <p className={styles.error}>{state.formError}</p>}
      </form>
    </div>
  );
}
