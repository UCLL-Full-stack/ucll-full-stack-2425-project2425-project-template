import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import UserService from "@/services/UserService";
import {Role} from "@/types";

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role] = useState<Role>("player");

    const [emailError, setEmailError] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [statusMessages, setStatusMessages] = useState<string | null>(null);

    const router = useRouter();

    const validateForm = () => {
        setEmailError("");
        setNameError("");;
        setPasswordError("");

        let isValidForm = true;

        if (email === "" || email.trim() === "") {
            setEmailError("Email is required");
            isValidForm = false;
        }

        if (name === "" || name.trim() === "") {
            setNameError("First name is required");
            isValidForm = false;
        }

        if (password === "" || password.trim() === "") {
            setPasswordError("Password is required");
            isValidForm = false;
        }

        return isValidForm;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();


        if (validateForm()) {
            const user = { email, name, password, role};
            console.log(user)
            const response = await UserService.createUser(user);
            if (response.ok) {
                setStatusMessages("User successfully registered");
                await router.push("/login");
            } else {
                setStatusMessages("User registration failed" + response.statusText);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {status && <div>{status}</div>}

                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p>{emailError}</p>}
                </div>

                <div>
                    <label htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="fname"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <p>{nameError}</p>}
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="pass"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <p>{passwordError}</p>
                    )}
                </div>
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;