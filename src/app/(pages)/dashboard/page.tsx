import { getSession } from "@/shared/session";
import { getUserById } from "@/db/users";
import { redirect } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import styles from "./page.module.css";

export default async function Dashboard() {
  const session = await getSession();
  const userId = session?.userId as string | undefined;

  if (!userId) redirect("/login");

  const user = await getUserById(userId);
  if (!user) redirect("/login");

  const name = user.email.split("@")[0];

  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <span className={styles.badge}>✦ your space</span>
        <h1 className={styles.title}>Your bookmarks</h1>
        <p className={styles.greeting}>Hi, {name}!</p>
      </div>

      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🔖</div>
        <p className={styles.emptyTitle}>Nothing saved yet</p>
        <p className={styles.emptyText}>
          Add your first link — with tags, notes and an AI summary
        </p>
        <Button variant="primary" size="md" className={styles.addButton}>
          + Add bookmark
        </Button>
      </div>
    </div>
  );
}
