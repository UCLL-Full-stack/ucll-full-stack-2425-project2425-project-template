import React, { useState } from 'react';
import LoginForm from '@components/loginForm';
import { UserService } from '@services/UserService';
import Header from '@components/header';

const Home: React.FC = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            const userData = await UserService.getUserByEmail(email);
            if (userData.password === password) {
                setUser({ name: userData.name });
            } else {
                alert('Invalid password');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            {user ? (
                <><Header /><h1>Hello {user.name}</h1></>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default Home;
