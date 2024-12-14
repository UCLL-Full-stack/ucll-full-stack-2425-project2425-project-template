import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

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
                <ul>
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    {loggedInUser && (
                        (loggedInUser.rol == "Admin" || loggedInUser.rol == "Manager") && (
                            <li>
                                <Link href="/bestellingen">
                                    Bestellingen
                                </Link>
                            </li>))
                    }
                    {loggedInUser && (
                        (loggedInUser.rol == "Klant") && (
                            <li>
                                <Link href="/bestellingen/create-bestelling">
                                    Bestellen
                                </Link>
                            </li>))
                    }
                    {loggedInUser && (
                        (loggedInUser.rol == "Admin" || loggedInUser.rol == "Manager") && (
                            <li>
                                <Link href="/ingredienten">
                                    Ingredienten
                                </Link>
                            </li>))
                    }
                    <li>
                        <Link href="/pokebowls">
                            Pokebowls
                        </Link>
                    </li>
                    <li>{!loggedInUser && (
                        <Link href="/login">
                            Login
                        </Link>
                    )}
                        {loggedInUser && (
                            <a href="/login" onClick={handleClick}>Logout</a>
                        )}
                    </li>
                    {
                        loggedInUser && (
                            <li>
                                <Link href={`/users/${loggedInUser.id}`}>Profiel</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
