"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import { handleAnalytics, pb } from "@/services/pocketbase";
import { useRouter } from "next/navigation";

const Login = () => {
    const [userCreds, setUserCreds] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [signUpVisible, setSignUpVisible] = useState(false);

    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setErrorMessages((prevErrorMessage) => ({
            ...prevErrorMessage,
            [name]: "",
            global: "",
        })),
            setUserCreds((prevCreds) => ({
                ...prevCreds,
                [name]: value,
            }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { ...userCreds, passwordConfirm: userCreds.password };
        setIsLoading(true);
        if (signUpVisible) {
            //signup new user
            try {
                const response = await pb.collection("users").create(userData);

                console.log("response: ", response);
                try {
                    const response = await pb
                        .collection("users")
                        .authWithPassword(userData.email, userData.password);
                    console.log("response", response);
                    if (response.token) {
                        router.push("/dashboard");
                    }
                } catch (error) {
                    console.error("Could not log in: ", error.status);
                }
            } catch (error) {
                // console.error("Could not create user: ", error);
                console.error("Error object: ", error.data);
                setErrorMessages(error.data.data);
            }
        } else {
            try {
                const response = await pb
                    .collection("users")
                    .authWithPassword(userData.email, userData.password);
                console.log("response", response);
                if (response.token) {
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Could not log in: ", error.data);
                setErrorMessages((prevErrorMessages) => ({
                    ...prevErrorMessages,
                    global: error.message,
                }));
            }
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.loginPageContainer}>
            <form onSubmit={handleSubmit} className={styles.loginFormContainer}>
                <h1>{signUpVisible ? "Sign Up" : "Login"}</h1>
                {signUpVisible && (
                    <div className={styles.formGroup}>
                        <div className={styles.formInputGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                className={styles.formInput}
                                type="text"
                                name="username"
                                value={userCreds.username}
                                onChange={handleChange}
                            />
                        </div>
                        {errorMessages?.username?.message && (
                            <i className={styles.errorText}>
                                {errorMessages.username.message}
                            </i>
                        )}
                    </div>
                )}
                <div className={styles.formGroup}>
                    <div className={styles.formInputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            className={styles.formInput}
                            type="email"
                            name="email"
                            value={userCreds.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessages?.email?.message && (
                        <i className={styles.errorText}>
                            {errorMessages.email.message}
                        </i>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formInputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            className={styles.formInput}
                            type="password"
                            minLength={8}
                            name="password"
                            value={userCreds.password}
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessages?.password?.message && (
                        <i className={styles.errorText}>
                            {errorMessages.email.message}
                        </i>
                    )}
                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className={styles.submitButton}>
                    {signUpVisible ? "Sign Up" : "Login"}
                </button>
                <div className={styles.signUpText}>
                    {signUpVisible ? (
                        <>
                            <i>Already have an account? </i>
                            <b onClick={() => setSignUpVisible(false)}>Login</b>
                        </>
                    ) : (
                        <>
                            <i>Don't have an account? </i>
                            <b onClick={() => setSignUpVisible(true)}>
                                Sign Up
                            </b>
                        </>
                    )}
                </div>
            </form>
            {errorMessages?.global && (
                <i className={styles.errorText}>{errorMessages?.global}</i>
            )}
        </div>
    );
};

export default Login;
