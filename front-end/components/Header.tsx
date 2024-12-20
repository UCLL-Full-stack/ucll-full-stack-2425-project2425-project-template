import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "types";
import Language from "./language/Language";
import { useTranslation } from "react-i18next";
import React from 'react'; 

const Header: React.FC = () => {

    const { t } = useTranslation();

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [hydrated, setHydrated] = useState(false);


    useEffect(() => {
        setHydrated(true);
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
      }, [])

      if (!hydrated) {
        return null;
      }

    const handleClick = () => {
        localStorage.removeItem("loggedInUser")
        setLoggedInUser(null)
    }

    return (
        <header className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-semibold text-yellow-400">
                    <Link href="/">Music App</Link>
                </div>
                <nav className="flex items-center space-x-6">
                    <Link href="/" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        {t('header.home')}
                    </Link>
                    <Link href="/songs" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        {t('header.songs')}
                    </Link>
                    
                    <Link 
                        href="/playlists" 
                        className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200"
                        >
                        {t('header.playlist')}
                    </Link>
                    {loggedInUser && (
                        <>
                        <Link href="/subscription" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                            {t('header.subscription')}
                        </Link>
                        </>
                    )}
                    {!loggedInUser && (
                        <Link href="/login" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                            {t('header.login')}
                        </Link>
                    )}
                    {!loggedInUser && (
                        <Link href="/signup" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                            {t('header.signup')}
                        </Link> 
                    )}
                    {loggedInUser && (
                        <>
                            <Link href="/" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200"
                                onClick={handleClick}>
                                {t('header.logout')}
                            </Link>
                            <p className="text-gray-300">{t('header.welcome')} {loggedInUser.fullname}</p>
                        </>
                    )}
                    <Language />
                </nav>
            </div>
        </header>
    );
};

export default Header;
