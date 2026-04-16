import { ComponentPropsWithoutRef } from 'react'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import styles from './Button.module.css'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: Variant
    size?: Size
    fullWidth?: boolean
}

export function Button({
    variant = 'primary',
    size = 'md',
    fullWidth,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.btn,
                styles[variant],
                styles[size],
                fullWidth && styles.fullWidth,
                className,
            )}
            {...props}
        />
    )
}

interface ButtonLinkProps extends Omit<LinkProps, 'className'> {
    variant?: Variant
    size?: Size
    className?: string
    children?: React.ReactNode
}

export function ButtonLink({
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonLinkProps) {
    return (
        <Link className={clsx(styles.btn, styles[variant], styles[size], className)} {...props} />
    )
}
