import type { Metadata } from 'next'
import { Header } from '@/app/components/Header/Header'
import './globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
    title: 'Bookmarks',
    description: 'Save links with tags, search instantly, get AI summaries',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={styles.body}>
                <Header />

                <main className={styles.main}>{children}</main>
            </body>
        </html>
    )
}
