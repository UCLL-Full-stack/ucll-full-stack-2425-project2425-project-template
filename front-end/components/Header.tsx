import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "types";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
      }, [])

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
                        Home
                    </Link>
                    <Link href="/songs" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                        Songs
                    </Link>
                    <Link 
                        href="/playlists" 
                        className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200"
                        >
                        Playlists
                    </Link>
                    {!loggedInUser && (
                    <   Link href="/login" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200">
                            Login
                        </Link>
                    )}
                    {loggedInUser && (
                        <>
                            <Link href="/" className="text-lg text-gray-300 hover:text-yellow-400 transition duration-200"
                                onClick={handleClick}>
                                Logout
                            </Link>
                            <p className="text-gray-300">Welcome {loggedInUser.fullname}</p>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
