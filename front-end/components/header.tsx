import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const { pathname } = router;
    const isAdmin = pathname.endsWith('/admin');

    return (
        <header className="bg-green-700 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Agenda Scouts Overijse</h1>
                <nav>
                    <ul className="flex space-x-4">
                        {/* <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/groep%201/admin" : "/activiteiten/groep%201"}>
                                Groep 1
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/groep%202/admin" : "/activiteiten/groep%202"}>
                                Groep 2
                            </Link>
                        </li> */}
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/admin" : "/activiteiten"}>
                                Alle activiteiten
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/losse leden/admin" : "/activiteiten/losse leden"}>
                                Losse leden
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/kapoenen/admin" : "/activiteiten/kapoenen"}>
                                Kapoenen
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:bg-green-600 px-3 py-2 rounded" href={isAdmin ? "/activiteiten/welpen/admin" : "/activiteiten/welpen"}>
                                Welpen
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;