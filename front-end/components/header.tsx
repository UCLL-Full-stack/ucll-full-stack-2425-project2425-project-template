import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header>
            <a>
                Basketball Belgium
            </a>
            <nav>
                <Link href="/">
                    Home
                </Link>
                <Link href="/competitions">
                    Competitions
                </Link>
            </nav>
        </header>

    );
};

export default Header;
