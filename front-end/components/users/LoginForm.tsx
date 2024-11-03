import { Authentication, User } from "@/types";

type Props = {
    credentials: Authentication
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (field: keyof User, value: any) => void;
}

const LoginForm: React.FC<Props> = ({ credentials, handleSubmit, handleInputChange}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Email"> email <sup>*</sup></label>
                <input 
                    type="email"
                    value={credentials.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Email"
                />

                <label htmlFor="Password">Password <sup>*</sup></label>
                <input 
                    type="password" 
                    value={credentials.password} 
                    onChange={(e) => handleInputChange("password", e.target.value)} 
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginForm;