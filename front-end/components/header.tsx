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
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const [groepen, setGroepen] = useState<Groep[]>([]);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        const user = sessionStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(user);
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
                    
                        <div className="relative">
                            <button
                                className="hover:bg-green-600 px-3 py-2 rounded"
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
                        </div>
                        <Link 
                            className="hover:bg-green-600 px-3 py-2 rounded" 
                            href="/kalender">
                            Kalender
                        </Link>
                        {loggedInUser && (
                            <Link 
                                className="hover:bg-green-600 px-3 py-2 rounded" 
                                href="/leiding">
                                Leiding
                            </Link>
                        )}
                        {loggedInUser && (<Link 
                            className="hover:bg-green-600 px-3 py-2 rounded" 
                            href="/gegevens">
                            Gegevens
                        </Link>
                        )}
                        {!loggedInUser  && <Link 
                            className="hover:bg-green-600 px-3 py-2 rounded" 
                            href="/login">
                            Login
                        </Link>}
                        {loggedInUser && 
                        <a 
                            href="/" 
                            className="hover:bg-green-600 px-3 py-2 rounded" 
                            onClick={handleClick}>
                            Logout
                        </a>}
                        {loggedInUser && <div>Welcome, {JSON.parse(loggedInUser).totem}</div>}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;