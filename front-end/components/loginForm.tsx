import React, { useState } from 'react';
import styles from '../styles/loginForm.module.css';

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className={styles.container}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email:</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">Password:</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className={styles.button} type="submit">Login</button>
            <div className={styles.registerLink}>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </form>
        </div>
    );
};

export default LoginForm;


// return (
//     <div className={styles.container}>
//         <h1 className={styles.title}>Login</h1>
//         <form className={styles.loginForm} onSubmit={handleLogin}>
//             <div className={styles.formGroup}>
//                 <label className={styles.label} htmlFor="email"></label>
//                 <input className={styles.input} type="email" id="email" placeholder="Enter your email" /*required*/ />
//             </div>
//             <div className={styles.formGroup}>
//                 <label className={styles.label} htmlFor="password"></label>
//                 <input className={styles.input} type="password" id="password" placeholder="Enter your password" /*required*/ />
//             </div>
//             <button className={styles.button} type="submit">Login</button>
//             <div className={styles.registerLink}>
//                 <p>Don't have an account? <a href="/register">Register</a></p>
//             </div>
//         </form>
//     </div>
// );
