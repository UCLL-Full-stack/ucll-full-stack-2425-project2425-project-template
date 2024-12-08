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
                    <li>
                        <Link href="/bestellingen">
                            Bestellingen
                        </Link>
                    </li>
                    <li>
                        <Link href="/ingredienten">
                            Ingredienten
                        </Link>
                    </li>
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;
