import UserService from "@/services/UserService";
import { Role } from "@/types";
import { SetStateAction, useEffect, useState } from "react";

const LoginPage: React.FC = () => {
    // Form waarden
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    // Errors voor de form waarden
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selectedOptionError, setSelectedOptionError] = useState('');
    const [statusErrors, setStatusErrors] = useState([]);
    
    const errorClear = () => {
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setSelectedOptionError('');
        setStatusErrors([]);
    }


    const validation = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (name.trim() === '') {
            setNameError('Name is required.');
            result = false;
        }
        if (password.trim() === '' || password.length < 8) {
            setPasswordError('Password should be at least 8 characters.');
            result = false;
        }
        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError("Email should be a valid email.")
            result = false;
        }
        if (selectedOption.trim() === '') {
            setSelectedOptionError("You should choose one of the two options.")
            result = false;
        }

        return result;

    }

    const saveUser = async (event:any) => {
        event.preventDefault();
        
        errorClear();
        if (!validation()) {
            return;
        }
        
        const name = (document.getElementById('login-name') as HTMLTextAreaElement).value;
        const email = (document.getElementById('login-email') as HTMLTextAreaElement).value;
        const password = (document.getElementById('login-password') as HTMLTextAreaElement).value;
        const parentOrChild = selectedOption as Role;

        if (await UserService.getUserByEmail(email) !== undefined) {
            setEmailError("A User with this email already exists.");
            return;
        }

        return UserService.createUser(name, email, password, parentOrChild);
    }

    return (
        <>
            <form className="login" onSubmit={saveUser}>
                <div>
                <label id="name">Name</label>
                <input id="login-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div>
                <label id="email">Email</label>
                <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                <label id="password">Password</label>
                <input id="login-password" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <div className="parentOrChild">
                <label id="parentOrChild">
                    Parent
                    <input 
                    type="radio"
                    value='parent'
                    checked={selectedOption === 'parent'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                     />
                </label>
                <label id="parentOrChild">
                    Child
                    <input 
                    type="radio"
                    value='child'
                    checked={selectedOption === "child"}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    />
                </label>
                </div>
                <button id="signInButton">Sign in</button>
                <div className="errorMessages">
                {nameError && <p>{nameError}</p>}
                {emailError && <p>{emailError}</p>}
                {passwordError && <p>{passwordError}</p>}
                {selectedOptionError && <p>{selectedOptionError}</p>}
                </div>
                {statusErrors && (
                    <ul>
                        {statusErrors.map((error, idx) => (
                            <li
                            key={idx}>
                            {error}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    )
}

export default LoginPage;