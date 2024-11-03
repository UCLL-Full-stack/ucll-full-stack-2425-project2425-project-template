import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-8 mt-10">
            <div className="max-w-5xl px-8 mx-auto flex justify-between items-center w-full">
                <p className="text-sm">&copy; {new Date().getFullYear()} Shoppingcart app</p>
                <nav className="">
                    <h3>Navigation</h3>
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/items">Items</Link>
                        </li>
                        <li>
                            <Link href="/itemOverview">Admin overview</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
