import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const { pathname } = router;
    const isAdmin = pathname.endsWith('/admin');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-green-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Agenda Scouts Overijse</h1>
                <nav>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/admin" : "/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/admin" : "/activiteiten"}>
                                Alle activiteiten
                            </Link>
                        </li>
                        <li className="relative">
                            <button
                                className="hover:bg-green-600 px-3 py-2 rounded"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Takken
                            </button>
                            {dropdownOpen && (
                                <ul ref={dropdownRef} className="absolute bg-green-600 text-white mt-2 rounded shadow-lg z-50">
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-green-500 rounded" href={isAdmin ? "/activiteiten/losse leden/admin" : "/activiteiten/losse leden"} onClick={() => setDropdownOpen(false)}>
                                            Losse leden
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-green-500 rounded" href={isAdmin ? "/activiteiten/kapoenen/admin" : "/activiteiten/kapoenen"} onClick={() => setDropdownOpen(false)}>
                                            Kapoenen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="block px-4 py-2 hover:bg-green-500 rounded" href={isAdmin ? "/activiteiten/welpen/admin" : "/activiteiten/welpen"} onClick={() => setDropdownOpen(false)}>
                                            Welpen
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={"/nieuws"}>
                                Nieuws
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={"/kalender"}>
                                Kalender
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={"/leiding"}>
                                Leiding
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={"/gegevens"}>
                                Gegevens
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;