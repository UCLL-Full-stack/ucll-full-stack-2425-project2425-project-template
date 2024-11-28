import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <a className="text-3xl font-bold text-orange-500">
                    Basketball Belgium
                </a>
                <nav className="flex space-x-4">
                    <Link href="/" className="text-lg hover:text-orange-500">
                        Home
                    </Link>
                    <Link href="/competitions" className="text-lg hover:text-orange-500">
                        Competitions
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;