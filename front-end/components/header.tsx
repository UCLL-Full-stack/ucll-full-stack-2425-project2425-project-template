import { User } from '@types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('selectedCharacter');
        setLoggedInUser(undefined);
    };

    return (
        <header className="bg-[#e60042] flex items-center justify-between h-32">
            <div className="flex-shrink-0">
                <img className="h-20 m-4" alt="logo" src="/images/logo.png" />
            </div>
            {loggedInUser && (
                <p className="text-white p-10 text-xl">
                    Hello,{' '}
                    {localStorage.getItem('loggedInUser')
                        ? JSON.parse(localStorage.getItem('loggedInUser')!).name
                        : ''}
                    !
                </p>
            )}

            <div className="ml-auto flex flex-col">
                <nav className="md:flex-row mr-3">
                    <Link
                        href="/"
                        className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#5c00b2]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
                    >
                        Home
                    </Link>

                    <Link
                        href="/leaderboard"
                        className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#5c00b2]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
                    >
                        Leaderboard
                    </Link>

                    {!loggedInUser && (
                        <Link
                            href="/login"
                            className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
              before:bottom-0 before:left-0 before:bg-[#5c00b2]
              before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
              before:transition before:ease-in-out before:duration-300"
                        >
                            Log in
                        </Link>
                    )}

                    {loggedInUser && (
                        <Link
                            href="/Statistics"
                            className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                                  before:bottom-0 before:left-0 before:bg-[#5c00b2]
                              d   before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                  before:transition before:ease-in-out before:duration-300"
                        >
                            Statistics
                        </Link>
                    )}

                    {loggedInUser && (
                        <>
                            <Link
                                href="/game"
                                className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                                    before:bottom-0 before:left-0 before:bg-[#5c00b2]
                                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                    before:transition before:ease-in-out before:duration-300"
                            >
                                Game
                            </Link>
                            <Link
                                onClick={logout}
                                href="/"
                                className="md:p-3 md:m-2 md:mr-5 text-sm md:text-xl text-white relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] 
                                    before:bottom-0 before:left-0 before:bg-[#5c00b2]
                                    before:hover:scale-x-100 before:scale-x-0 before:origin-top-left
                                    before:transition before:ease-in-out before:duration-300"
                            >
                                Log out
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
