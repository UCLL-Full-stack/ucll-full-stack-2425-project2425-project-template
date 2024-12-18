import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { useTranslation } from "next-i18next";
import Language from './language/Language';


const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const { t } = useTranslation();

    useEffect(() => {
        const getUser = sessionStorage.getItem("loggedInUser")
        if (getUser) {
            const parsedUser = JSON.parse(getUser);
            setLoggedInUser(parsedUser as User);
        }
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    return (
        <header className="headerNav">
            <nav>
                <a className="logo" href='/'>
                    <img src="/assets/logo.png" alt='BowlBuddies logo' />
                </a>
                <ul className="navLinks">
                    <li>
                        <Link href="/">
                            {t("header.nav.home")}
                        </Link>
                    </li>
                    {loggedInUser && (
                        (loggedInUser.rol == "Admin" || loggedInUser.rol == "Manager") && (
                            <li>
                                <Link href="/bestellingen">
                                    {t("header.nav.orders")}
                                </Link>
                            </li>))
                    }
                    {loggedInUser && (
                        (loggedInUser.rol == "Klant") && (
                            <li>
                                <Link href="/bestellingen/create-bestelling">
                                    {t("header.nav.order")}
                                </Link>
                            </li>))
                    }
                    {loggedInUser && (
                        (loggedInUser.rol == "Admin" || loggedInUser.rol == "Manager") && (
                            <li>
                                <Link href="/ingredienten">
                                    {t("header.nav.ingredients")}
                                </Link>
                            </li>))
                    }
                    {loggedInUser && (
                        (loggedInUser.rol == "Admin" || loggedInUser.rol == "Manager") && (
                            <li>
                                <Link href="/users">
                                    Users
                                </Link>
                            </li>))
                    }
                    <li>
                        <Link href="/pokebowls">
                            {t("header.nav.pokebowls")}
                        </Link>
                    </li>
                    <li>{!loggedInUser && (
                        <Link href="/login">
                            {t("header.nav.login")}
                        </Link>
                    )}
                        {loggedInUser && (
                            <a href="/login" onClick={handleClick}>{t("header.nav.logout")}</a>
                        )}
                    </li>
                    {
                        loggedInUser && (
                            <li>
                                <Link href={`/users/${loggedInUser.id}`}>{t("header.nav.profile")}</Link>
                            </li>
                        )
                    }
                    <li>                    
                        <Language />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
