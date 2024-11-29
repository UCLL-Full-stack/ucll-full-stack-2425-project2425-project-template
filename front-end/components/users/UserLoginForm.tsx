import React, { useState } from "react";
import styles from '@styles/home.module.css';
import { StatusMessage } from "types";
import classNames from "classnames";
import { useRouter } from "next/router";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);


    const clearErrors = () => {
        setErrorMessage("");
        setStatusMessages([]);
    };

    const validation = (): boolean => {
        if (!email || email.trim() === "") {
            setErrorMessage("Please fill in your email.");
            return false;
        }

        if (!password || password.trim() === "") {
            setErrorMessage("Please fill in your password.");
            return false;
        }

        return true;
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!validation()) {
            return;
        }

        // Clear all errors
        clearErrors();

        setStatusMessages([{ message: "Login successful. Redirecting to homepage...", type: "success" }]);
        sessionStorage.setItem("loggedUserEmail", email);
        sessionStorage.setItem("loggedUserPassword", password);

        setTimeout(() => {
            router.push('/');
        }, 2000);
    }

    const handleShowSignupForm = () => {
        router.push('/signup');
    }

    return (
        <>
            <form
                onSubmit={handleFormSubmit}
                className={styles.loginMyEvents}>
                {statusMessages && (
                    <div className="row">
                        <ul className="list-none mb-3 mx-auto ">
                            {statusMessages.map(({ message, type }, index) => (
                                <li
                                    key={index}
                                    className={classNames({
                                        "text-red-800": type === "error",
                                        "text-green-800": type === "success",
                                    })}
                                >
                                    {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>

                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.myEventsLoginSignupButtons}>
                    <button type="submit">Log in</button>
                    <button
                        type="button"
                        className={styles.myEventsSignupButton}
                        onClick={handleShowSignupForm}
                    >Sign up</button>
                </div>

                {errorMessage && (
                    <p className="text-red-800">
                        {errorMessage}
                    </p>
                )}
            </form>
        </>);
};

export default UserLoginForm;