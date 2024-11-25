import { Authentication } from "@/types";
import styles from '@/styles/Home.module.css';

type Props = {
    credentials: Authentication;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (field: keyof Authentication, value: any) => void;
};

const LoginForm: React.FC<Props> = ({ credentials, handleSubmit, handleInputChange }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="email">Email <sup>*</sup></label>
            <input 
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Email"
                autoComplete="email"
                required
            />
            <label htmlFor="password">Password <sup>*</sup></label>
            <input 
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
