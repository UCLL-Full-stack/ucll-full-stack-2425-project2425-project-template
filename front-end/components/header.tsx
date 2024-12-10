import { User } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <a className="text-3xl font-bold text-orange-500">
                    Basketball Belgium
                </a>
                <nav className="flex space-x-4">
                    <Link href="/" className="text-lg hover:text-orange-500">
                        Home
                    </Link>
                    <Link href="/competitions" className="text-lg hover:text-orange-500">
                        Competitions
                    </Link>
                    <Link href="/" className="text-lg hover:text-orange-500">
                        Home
                    </Link>
                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
                        >
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <a
                            href="/login"
                            onClick={handleClick}
                            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
                        >
                            Logout
                        </a>
                    )}
                    {loggedInUser && (
                        <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                            Welcome, {loggedInUser}!
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;