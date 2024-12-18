import { useRouter } from "next/router";
import React, { useState } from "react";
import userService from "@/services/UserService";
import { StatusMessage } from '@/types';

const LoginForm: React.FC = () => {
    const [totem, setTotem] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [totemError, setTotemError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const validate = (): boolean => {
        let valid = true;
        setPasswordError("");
        if (totem === "") {
            setTotemError("Totem is verplicht.");
            valid = false;
        }
        if (password === "") {
            setPasswordError("Wachtwoord is verplicht.");
            valid = false;
        }
        return valid;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        if (!validate()) return;

        try {
            const userLogin = { totem: totem, password: password };
            const response = await userService.login(userLogin);
            const data = await response.json();

            if (response.ok) {
                return;
            } else {
                return;
            }
        } catch (error) {
            setStatusMessages([{ message: "Server Error; no connection possible", type: "error" }]);
        }
    };

    return (
        <div className="bg-white rounded-lg p-8 w-80">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        id="totemInput"
                        type="text"
                        placeholder="Totem"
                        value={totem}
                        onChange={(event) => setTotem(event.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {totemError && <p className="text-red-500 text-sm">{totemError}</p>}
                </div>
                <div className="mb-4">
                    <input
                        id="passwordInput"
                        type="password"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
                    inloggen
                </button>
            </form>
            {statusMessages && (
                <div className="mt-4 text-center">
                    <ul className="inline-block text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li key={index} className={type === "success" ? "text-green-500" : "text-red-500"}>
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LoginForm;