import UserService from '@/services/userService';
import router from 'next/router';
import React, { useState } from 'react';
import { Profile } from '@/types';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();
        if (!validate()) {
            return;
        };

        console.log('Registering...');

        let profile: Profile | undefined = undefined;
        if (email || bio || firstName || lastName) {
            profile = {
                email,
                bio,
                firstName,
                lastName
            };
        };
        console.log(profile);

        const response = await UserService.createUser(username, password, profile);

        if (response.status === 200) {
            const user = await response.json();

            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    id: user.id,
                    username: user.username,
                    profile: user.profile,
                })
            );
            setTimeout(() => {
                router.push('/');
            }, 500);
        } else {
            console.log('error');
        }
    };

    const validate = () => {
        let valid = true;
        console.log('Validating...');

        if (!username) {
            setUsernameError('Username is required');
            valid = false;
        };
        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        };

        return valid;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="usernameInput">
                    Username:
                </label>
                <input
                    id="usernameInput"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                {usernameError && <div className="text-red-500">{usernameError}</div>}
            </div>
            <div>
                <label htmlFor="passwordInput">
                    Password:
                </label>
                <input
                    id="passwordInput"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {passwordError && <div className="text-red-500">{passwordError}</div>}
            </div>
            <div>
                <label htmlFor="firstNameInput">
                    First Name:
                </label>
                <input
                    id="firstNameInput"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastNameInput">
                    Last Name:
                </label>
                <input
                    id="lastNameInput"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="emailInput">
                    Email:
                </label>
                <input
                    id="emailInput"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="bioInput">
                    Bio:
                </label>
                <textarea
                    id="bioInput"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
            </div>
            <button type="submit">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;