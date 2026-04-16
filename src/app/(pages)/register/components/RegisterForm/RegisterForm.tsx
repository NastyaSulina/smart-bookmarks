'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { FormState, register } from '@/shared/actions/auth'
import { Button } from '@/shared/ui/Button'

import styles from './RegisterForm.module.css'

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
            {pending ? 'Creating account…' : 'Create account'}
        </Button>
    )
}

export function RegisterForm() {
    const [state, registerAction] = useActionState(register, {} as FormState)

    return (
        <div className={styles.root}>
            <span className={styles.badge}>✦ new here</span>
            <h1 className={styles.title}>Create an account</h1>
            <p className={styles.subtitle}>Organize your links with tags and notes</p>

            <form action={registerAction} className={styles.form}>
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
                        placeholder='at least 8 characters'
                        autoComplete='new-password'
                    />
                </label>
                {state?.fieldErrors?.password && (
                    <p className={styles.fieldError}>{state.fieldErrors.password}</p>
                )}

                <SubmitButton />
            </form>

            {state?.formError && <p className={styles.formError}>{state.formError}</p>}

            <p className={styles.switchLink}>
                Already have an account? <Link href='/login'>Sign in</Link>
            </p>
        </div>
    )
}
