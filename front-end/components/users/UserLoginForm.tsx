import AuthService from '@services/authService';
import { StatusMessage } from "@types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!username || username.trim() === "") {
            setUsernameError(t("login.validate.username"));
            result = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError(t("login.validate.password"));
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const user = { username, password };
        const response = await AuthService.login(user);

        if (response.status === 200) {
            setStatusMessages([
                { 
                    message: t("login.validate.success"),
                    type: "success",
                }
            ]);
            const user = await response.json();
            localStorage.setItem("loggedInUser", 
                JSON.stringify({
                    token: user.token,
                    fullName: user.fullName,
                    username: user.username,
                    permission: user.permission
                })
            );
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else if (response.status === 400) {
            const errorMessage = await response.json();
            setStatusMessages([
                { 
                    message: errorMessage.message, 
                    type: "error",
                },
            ]);
        } else {
            setStatusMessages([
                {
                    message: t("general.error"),
                    type: 'error',
                },
            ]);
        }
    };

    return (
        <>
            <h1 className="text-center my-4">{t("login.title")}</h1>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">{t("login.username")}</label>
                    <input
                        id="nameInput"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {usernameError && <div className="text-red-800">{usernameError}</div>}
                </div>
                <br />
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">{t("login.password")}</label>
                    <input
                        id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}   
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                    />
                    {passwordError && <div className="text-red-800">{passwordError}</div>}
                </div>
                <br />
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
                <button className="btn btn-primary w-100" type="submit" style={{ marginTop: '30px' }}>{t("login.submit")}</button>
            </form>
        </>
    );
};

export default UserLoginForm;