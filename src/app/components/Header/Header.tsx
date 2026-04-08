import Link from "next/link";
import { getSession } from "@/shared/session";
import { logout } from "@/shared/actions/auth";
import { Button, ButtonLink } from "@/shared/ui/Button";
import styles from "./Header.module.css";

export async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.logoIcon}>✦</span>
        Bookmarks
      </Link>

      <nav className={styles.nav}>
        {isLoggedIn ? (
          <form action={logout}>
            <Button variant="ghost" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        ) : (
          <>
            <ButtonLink href="/login" variant="ghost" size="sm" className={styles.signIn}>
              Sign in
            </ButtonLink>
            <ButtonLink href="/register" variant="primary" size="sm">
              Get started
            </ButtonLink>
          </>
        )}
      </nav>
    </header>
  );
}
