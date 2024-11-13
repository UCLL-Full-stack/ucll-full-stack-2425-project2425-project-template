import { User } from "@/types";
import styles from '@/styles/Home.module.css';

type Props = {
    user: User;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (field: keyof User, value: any) => void;
}

const RegisterForm: React.FC<Props> = ({ user, handleSubmit, handleInputChange }: Props) => {
    const birthDate = user.birthDate ? (user.birthDate instanceof Date ? user.birthDate : new Date(user.birthDate)) : new Date();
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="nationalRegisterNumber">National Register Number <sup>*</sup></label>
            <input 
                type="text"
                id="nationalRegisterNumber"
                name="nationalRegisterNumber"
                value={user.nationalRegisterNumber}
                onChange={(e) => handleInputChange("nationalRegisterNumber", e.target.value)}
                placeholder="National registration number"
                required
            />

            <label htmlFor="name">Name <sup>*</sup></label>
            <input 
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Name"
                required
            />

            <label htmlFor="birthDate">Birth Date <sup>*</sup></label>
            <input 
                type="date"
                id="birthDate"
                name="birthDate"
                value={birthDate.toISOString().split("T")[0]} 
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                required
            />

            <label htmlFor="isAdministrator">Is Administrator <sup>*</sup></label>
            <input 
                type="checkbox"
                id="isAdministrator"
                name="isAdministrator"
                checked={user.isAdministrator}
                onChange={(e) => handleInputChange("isAdministrator", e.target.checked)}
            />

            <label htmlFor="phoneNumber">Phone Number <sup>*</sup></label>
            <input 
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                placeholder="Phone number"
                required
            />

            <label htmlFor="email">Email <sup>*</sup></label>
            <input 
                type="email"
                id="email"
                name="email"
                value={user.email}
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
                value={user.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                required
            />

            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;