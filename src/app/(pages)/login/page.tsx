import { LoginForm } from './components/LoginForm'
import styles from './page.module.css'

export default function Login() {
    return (
        <section className={styles.root}>
            <LoginForm />
        </section>
    )
}
