import UserService from "@/services/UserService";
import { Rol, StatusMessage } from "@/types";
import router from "next/router";
import { FormEvent, useState } from "react";

const LoginForm: React.FC = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState<Rol>();

    const [loginError, setLoginError] = useState<String | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setLoginError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        clearErrors();

        if (!username || username.trim() === "") {
            setLoginError("Username cannot be empty");
            result = false;
        }
        if (!password || password.trim() === "") {
            setLoginError("Password cannot be empty");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const response = await UserService.login(username, password);
        const user = await response.json();

        if (response.status === 200) {
            //sessionStorage.setItem("username", username);
            //sessionStorage.setItem("rol", result);
            setStatusMessages([{ message: "Login succesfull", type: "success" }]);

            sessionStorage.setItem("loggedInUser", JSON.stringify({
                token : user.token,
                username: user.username,
                rol: user.role
            }));

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            setStatusMessages([{ message: "Error", type: "error" }])
        }


    };

    return (
        <>
            <div className="addForms">
                <form onSubmit={(event) => handleSubmit(event)}>
                    {loginError && <p className="error-field">{loginError}</p>}
                    <label>Username:</label>
                    <input type="text" name="name" value={username} onChange={(event) => setUserName(event.target.value)} />
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </>
    );
}

export default LoginForm