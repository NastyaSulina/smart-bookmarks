import { ButtonLink } from "@/shared/ui/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <span className={styles.badge}>✦ smart bookmarks</span>

        <h1 className={styles.title}>
          Save links, <span className={styles.highlight}>find anything</span>
        </h1>

        <p className={styles.description}>
          Bookmark any link with tags and notes. Search instantly. Get
          AI-powered summaries — so you actually remember why you saved it.
        </p>

        <div className={styles.actions}>
          <ButtonLink href="/register" variant="primary" size="lg">
            Get started
          </ButtonLink>
          <ButtonLink href="/login" variant="ghost" size="lg">
            Sign in
          </ButtonLink>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span
              className={styles.featureIcon}
              style={{ background: "#d4e3ff" }}
            >
              🏷️
            </span>
            <span>Tags & collections</span>
          </div>
          <div className={styles.feature}>
            <span
              className={styles.featureIcon}
              style={{ background: "#ffbde8" }}
            >
              🔍
            </span>
            <span>Instant search</span>
          </div>
          <div className={styles.feature}>
            <span
              className={styles.featureIcon}
              style={{ background: "#d1d161" }}
            >
              ✨
            </span>
            <span>AI summaries</span>
          </div>
        </div>
      </div>

      <div className={styles.decoration} aria-hidden="true">
        <span
          className={styles.star}
          style={{
            color: "var(--color-primary)",
            top: "10%",
            left: "15%",
            fontSize: "2rem",
          }}
        >
          ✦
        </span>
        <span
          className={styles.star}
          style={{
            color: "var(--color-blue)",
            top: "25%",
            right: "8%",
            fontSize: "1.5rem",
          }}
        >
          ✦
        </span>
        <span
          className={styles.star}
          style={{
            color: "var(--color-green)",
            bottom: "30%",
            left: "5%",
            fontSize: "1.25rem",
          }}
        >
          ✦
        </span>
        <span
          className={styles.star}
          style={{
            color: "var(--color-pink)",
            bottom: "15%",
            right: "18%",
            fontSize: "2.5rem",
          }}
        >
          ✦
        </span>
        <span
          className={styles.star}
          style={{
            color: "var(--color-peach)",
            top: "60%",
            left: "25%",
            fontSize: "1rem",
          }}
        >
          ✦
        </span>
      </div>
    </div>
  );
}
