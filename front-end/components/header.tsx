import Link from 'next/link';
import { useEffect, useState } from 'react';
import Language from './language/Language';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem('loggedInUser'));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem('loggedInUser');
    };

    return (
        <header className="p-3 mb-4 border-b bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="text-3xl font-bold text-white tracking-wide shadow-md">
                    Soccer App
                </a>
                <nav className="flex items-center space-x-6">
                    <Link href="/" className="text-lg text-white hover:text-gray-300 transition">
                        Home
                    </Link>
                    <Link
                        href="/competition"
                        className="text-lg text-white hover:text-gray-300 transition"
                    >
                        Competitions
                    </Link>
                    <Link
                        href="/team"
                        className="text-lg text-white hover:text-gray-300 transition"
                    >
                        Teams
                    </Link>
                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <>
                            <a
                                href="/login"
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                                onClick={handleClick}
                            >
                                Logout
                            </a>
                            <div className="text-white font-medium">Welcome, {loggedInUser}</div>
                        </>
                    )}
                    <Language />
                </nav>
            </div>
        </header>
    );
};

export default Header;
