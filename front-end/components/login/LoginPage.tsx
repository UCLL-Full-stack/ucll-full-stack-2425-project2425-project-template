import { SetStateAction, useState } from "react";

const LoginPage: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOption = (event:any) => {
        event.preventDefault();
        setSelectedOption(event.target.value);
    }

    const saveUser = (event:any) => {
        event.preventDefault();
        const name = (document.getElementById('login-name') as HTMLTextAreaElement).value;
        const email = (document.getElementById('login-email') as HTMLTextAreaElement).value;
        const password = (document.getElementById('login-password') as HTMLTextAreaElement).value;
        let parentOrChild = null;

        if (selectedOption === 'parent') {
            parentOrChild = 'parent'
        }
        if (selectedOption === 'child') {
            parentOrChild = 'child'
        }
    }

    return (
        <>
            <form className="login">
                <div>
                <label htmlFor="name">Name</label>
                <input id="login-name" type="text" />
                </div>

                <div>
                <label htmlFor="email">Email</label>
                <input id="login-email" type="text" />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input id="login-password" type="text" />
                </div>

                <div className="parentOrChild">
                <label htmlFor="parentOrChild">
                    Parent
                    <input 
                    type="radio"
                    value='parent'
                    checked={selectedOption === 'parent'}
                    onChange={handleOption}
                     />
                </label>
                <label htmlFor="parentOrChild">
                    Child
                    <input 
                    type="radio"
                    value='child'
                    checked={selectedOption === "child"}
                    onChange={handleOption}
                    />
                </label>
                </div>
                <button id="signInButton" onClick={saveUser}>Sign in</button>
            </form>
        </>
    )
}

export default LoginPage;