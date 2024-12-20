import React, { useState } from 'react';
import styles from '../../styles/registration.module.css';
import { useRouter} from 'next/router';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.email.includes('@')) newErrors.email = "Invalid email.";
        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log("User registered successfully", formData);
            router.push('/profile');
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.heading}>Register here!</h2>
                
                <div className={styles.fieldContainer}>
                    <label className={styles.label}>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.username && <span className={styles.error}>{errors.username}</span>}
                </div>
                
                <div className={styles.fieldContainer}>
                    <label className={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                
                <div className={styles.fieldContainer}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
