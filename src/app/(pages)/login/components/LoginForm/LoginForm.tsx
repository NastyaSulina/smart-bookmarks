'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormState, login } from '@/shared/actions/auth'
import { Button } from '@/shared/ui/Button'

import styles from './LoginForm.module.css'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type='submit'
            variant='primary'
            size='md'
            fullWidth
            disabled={pending}
            className={styles.submit}
        >
            {pending ? 'Signing in…' : 'Sign in'}
        </Button>
    )
}

export function LoginForm() {
    const [state, loginAction] = useActionState(login, {} as FormState)

    return (
        <div className={styles.root}>
            <span className={styles.badge}>✦ welcome back</span>
            <h1 className={styles.title}>Sign in</h1>
            <p className={styles.subtitle}>Enter your details to continue</p>

            <form action={loginAction} className={styles.form}>
                <label className={styles.label}>
                    Email
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='you@example.com'
                        autoComplete='email'
                    />
                </label>
                {state?.fieldErrors?.email && (
                    <p className={styles.fieldError}>{state.fieldErrors.email}</p>
                )}

                <label className={styles.label}>
                    Password
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='••••••••'
                        autoComplete='current-password'
                    />
                </label>
                {state?.fieldErrors?.password && (
                    <p className={styles.fieldError}>{state.fieldErrors.password}</p>
                )}

                <SubmitButton />
            </form>

            {state?.formError && <p className={styles.formError}>{state.formError}</p>}

            <p className={styles.switchLink}>
                No account? <Link href='/register'>Register</Link>
            </p>
        </div>
    )
}
