import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-primary text-white flex justify-between uppercase py-6">
            <div className="max-w-7xl px-8 mx-auto flex justify-between w-full">
                <h1 className="text-lg font-bold">Shoppingcart app</h1>
                <nav className="">
                    <ul className="flex gap-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/items">Items</Link>
                        </li>
                        <li>
                            <Link href="/adminoverview">Admin overview</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
