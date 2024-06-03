"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className={styles.homepageContainer}>
            <div className={styles.introContainer}>
                <h1>
                    Meet <i>NextLander</i>
                </h1>
                <p>Your one-stop solution to making amazing landing pages.</p>
                <b>Get started now!</b>
            </div>
            <div className={styles.buttonsContainer}>
                <button
                    onClick={() => {
                        router.push("/login");
                    }}>
                    Try It Out!
                </button>
                <button
                    onClick={() => {
                        window.open(
                            "https://gist.github.com/void666/73a342344b2c63c9aaa9df7392c96af9",
                            "_blank"
                        );
                    }}>
                    Learn More
                </button>
            </div>
        </div>
    );
}
