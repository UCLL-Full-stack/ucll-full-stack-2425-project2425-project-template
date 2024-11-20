import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
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
                        <Link href="/ingredienten">
                            Ingredienten
                        </Link>
                    </li>
                    <li>
                        <Link href="/pokebowls">
                            Pokebowls
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
