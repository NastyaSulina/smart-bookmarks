import Link from "next/link";
import { getSession } from "@/shared/session";
import { logout } from "@/app/(pages)/login/actions";
import styles from "./Header.module.css";

export async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session?.userId;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Authorization
      </Link>

      <nav>
        {isLoggedIn ? (
          <form action={logout}>
            <button type="submit" className={styles.button}>
              Logout
            </button>
          </form>
        ) : (
          <Link href="/login" className={styles.button}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
