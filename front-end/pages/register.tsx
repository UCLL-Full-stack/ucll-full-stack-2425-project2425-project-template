import React, { useState } from 'react';
import RegisterForm from '@components/registerForm';
import { UserService } from '@services/UserService';
import Header from '@components/header';

const RegisterPage: React.FC = () => {
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleRegister = async (userData: { name: string; email: string; password: string; address: string }) => {
        try {
            await UserService.registerUser(userData);
            setRegistrationSuccess(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred during registration.');
            }
        }
    };

    return (
        <div>
            <Header />
            {registrationSuccess ? (
                <h1>Registration successful! You can now log in.</h1>
            ) : (
                <RegisterForm onRegister={handleRegister} />
            )}
        </div>
    );
};

export default RegisterPage;
