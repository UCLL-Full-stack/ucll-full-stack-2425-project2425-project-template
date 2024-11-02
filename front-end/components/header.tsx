import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <Link href="/expenses" className="nav-link px-4 fs-5 text-white">
                    Expenses
                </Link>

                <Link href="/animals" className="nav-link px-4 fs-5 text-white">
                    Animals
                </Link>
            </nav>
        </header>
    );
};

export default Header;
