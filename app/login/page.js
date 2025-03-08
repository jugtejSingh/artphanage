import Login from "@/app/login/login";
import styles from "./cssfiles/page.module.css"

export default function LoginHome() {
    return (
        <div className={styles.mainPage}>
            <Login />
        </div>
    );
}
