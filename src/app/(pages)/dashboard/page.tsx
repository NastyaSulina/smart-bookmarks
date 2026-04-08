import { getSession } from "@/shared/session";
import { getUserById } from "@/db/users";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function Dashboard() {
  const session = await getSession();
  const userId = session?.userId as string | undefined;

  if (!userId) redirect("/login");

  const user = await getUserById(userId);
  if (!user) redirect("/login");

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Dashboard</h1>
      <div>Hello {user.email}!</div>
    </div>
  );
}
