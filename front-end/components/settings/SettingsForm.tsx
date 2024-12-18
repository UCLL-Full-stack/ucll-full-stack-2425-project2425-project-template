import userSerivce from '@services/userService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SettingsForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(name);
        console.log(email);
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('loggedInUser')
            ? JSON.parse(localStorage.getItem('loggedInUser')!).email
            : null;
        const currentUser = userEmail ? userSerivce.getUserByEmail(userEmail) : null;
        console.log(currentUser);

        if (!currentUser) {
            router.push('/login');
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center ">
            <h2 className="mt-[1rem] font-bold">Account settings:</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="NameInput" className="mt-8  flex flex-col">
                    <p className="text-left mb-2">Name:</p>
                    <input
                        type="text"
                        className="border"
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="EmailInput" className="mt-8 text-left mb-2 flex flex-col">
                    <p className="text-left mb-2">E-mail:</p>
                    <input
                        type="text"
                        className="border"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <button className="mt-8 bg-blue-500 text-white p-2 rounded-md">Save changes</button>
            </form>
        </div>
    );
};

export default SettingsForm;
