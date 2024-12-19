import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import getAllGroepen from '@/services/GroepService';
import { Groep } from '@/types';

const Header: React.FC = () => {
    const router = useRouter();
    const { pathname } = router;
    const isAdmin = pathname.endsWith('/admin');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [groepen, setGroepen] = useState<Groep[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<{ totem: string, groep: string } | null>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        const user = sessionStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchGroepen = async () => {
            const response = await getAllGroepen();
            const groepenArray = await response.json();
            console.log(groepenArray);
            setGroepen(groepenArray);
        }
        fetchGroepen();
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    }

    return (
        <header className="bg-green-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Agenda Scouts Overijse</h1>
                <nav>
                    <div className="flex space-x-4 items-center">
                        <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/admin" : "/"}>
                            Login Gegevens
                        </Link>

                        <Link className="hover:bg-green-600 px-3 py-2 rounded" href="/nieuws">
                            Home
                        </Link>
                      
                        {loggedInUser ? (
                            <>
                                <Link
                                    className="hover:bg-green-600 px-3 py-2 rounded"
                                    href={`/activiteiten/${loggedInUser.groep}`}
                                >
                                    {loggedInUser.groep}
                                </Link>
                                <Link
                                    className="hover:bg-green-600 px-3 py-2 rounded"
                                    href="/leiding"
                                >
                                    Leiding
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    className="hover:bg-green-600 px-3 py-2 rounded relative"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    Takken
                                </button>
                                {dropdownOpen && (
                                <ul ref={dropdownRef} className="absolute left-0 bg-green-600 text-white mt-2 rounded shadow-lg z-10">
                                    {groepen && groepen.map((groep, index) => (
                                        <li key={index} className="hover:bg-green-700 px-3 py-2">
                                            <Link href={`/tak/${groep.id}`}>{groep.naam}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            </>
                        )}
                        <Link className="hover:bg-green-600 px-3 py-2 rounded" href="/kalender">

                            Kalender
                        </Link>
                        {loggedInUser ? (
                            <>
                                <a
                                    href="/"
                                    className="hover:bg-green-600 px-3 py-2 rounded"
                                    onClick={handleClick}
                                >
                                    Logout
                                </a>
                                <div>Welcome, {loggedInUser.totem}</div>
                            </>
                        ) : (
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;