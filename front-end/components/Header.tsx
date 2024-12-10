import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const logout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
        setLoggedInUser(token);
    }, []);

    return (
        <header className="bg-primary text-white flex justify-between uppercase py-6">
            <div className="max-w-7xl px-8 mx-auto flex justify-between w-full">
                <h1 className="text-lg font-bold">Shoppingcart app</h1>
                <nav className="">
                    <ul className="flex gap-4">
                        {loggedInUser && (
                            <>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/items">Items</Link>
                                </li>

                                {loggedInUser.role === 'admin' && (
                                    <li>
                                        <Link href="/itemOverview">Admin overview</Link>
                                    </li>
                                )}
                            </>
                        )}

                        {loggedInUser ? (
                            <li>
                                <Link onClick={logout} href={'/login'}>
                                    Logout
                                </Link>
                            </li>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
