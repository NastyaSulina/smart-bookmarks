import styles from "./styles.module.css";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={styles.root}>{children}</section>;
}
