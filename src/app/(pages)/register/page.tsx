import { RegisterForm } from "./components/RegisterForm";
import styles from "./page.module.css";

export default function Register() {
  return (
    <section className={styles.root}>
      <RegisterForm />
    </section>
  );
}
