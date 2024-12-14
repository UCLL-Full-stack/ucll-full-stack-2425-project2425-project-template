import { StatusMessage } from "@types";
import authService from '@services/authService';
import { useRouter } from "next/router";
import { useState } from "react";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setError("");
        setStatusMessages([]);
    };

    const validate = () => {
        let result = true;

        if (!username || username.trim() === "") {
            setError("Username is required");
            result = false;
        }

        if (!password || password.trim() === "") {
            setError("Password is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        try {
            const response = await authService.login({ username, password });
            if (response.ok) {
                const userData = await response.json();
                setStatusMessages([{ message: "Logging in...", type: "success" }]);
                localStorage.setItem('loggedInUser', JSON.stringify({ username: userData.username, role: userData.role }));
                router.push("/");
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '30px' }}>Login</button>
            </form>
        </>
    );
};

export default UserLoginForm;