import { headers } from "next/headers";
import { getSession } from "@/app/lib/session";
import { Client } from "@/app/types/client";
import styles from "./styles.module.css";

export default async function Dashboard() {
  const session = await getSession();
  const userId = session?.userId as string;

  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/clients/${userId}`);
  const client: Client = await res.json();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Dashboard</h1>
      <div>Hello {client.name}!</div>
    </div>
  );
}
