import UserService from "@/services/UserService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setLoginError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!name || name.trim() === "") {
            setNameError('Name is required');
            result = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError('Password is required');
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        try {
            const response = await UserService.loginUser({ name, password });
            if (!response.ok) {
                setLoginError('Invalid username or password');
                return;
            }

            setStatusMessages([
                {
                    message: 'Login successful. Redirecting to homepage...',
                    type: "success",
                },
            ]);

            localStorage.setItem("loggedInUser", name);

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            setLoginError('An error occurred during login');
        }
    };

    return (
        <>
            <h3 className="px-0">Login</h3>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    Name:
                </label>
                <div className="block mb-2 text-sm font-medium">
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {nameError && <div className="text-red-800">{nameError}</div>}
                </div>
                <div className="mt-2">
                    <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                        Password:
                    </label>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {passwordError && <div className="text-red-800">{passwordError}</div>}
                    </div>
                </div>
                {loginError && <div className="text-red-800">{loginError}</div>}
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default UserLoginForm;