import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserInput, InviteInput } from '@types';
import InviteService from '../services/InviteService';

const Header: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState<UserInput>(null);
    const [invites, setInvites] = useState<InviteInput[]>();

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('loggedInUser')));
    }, []);

    useEffect(() => {
        if (loggedUser?.email) {
            getInvitesByUserEmail(loggedUser.email);
        }
    }, [loggedUser]);

    const getInvitesByUserEmail = async (email: string) => {
        const response = await InviteService.getInvitesByUserEmail(email);
        const invitesData = await response.json();
        setInvites(invitesData);
    };

    // Handle log out
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setLoggedUser(null);
    }

    // To show user's current page
    const router = useRouter();
    const isActive = (pathname: string) => router.pathname === pathname;

    return (
        <header className="p-3 bg-black">
            <a className="fs-1 d-flex justify-content-center mb-2 mb-lg-0 text-white text-decoration-none">
                {' '}
                Eventora
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className={`nav-link px-4 fs-5 ${isActive('/') ? 'text-white' : 'text-white-50'}`}>
                    Home
                </Link>

                {loggedUser && (
                    <Link href="/my-invites" className={`nav-link px-4 fs-5 ${isActive('/my-invites') ? 'text-white' : 'text-white-50'}`}>
                        My invites {invites && (
                            <span className="badge bg-danger">{invites.length}</span>
                        )}
                    </Link>
                )}

                <Link href="/upcoming-events" className={`nav-link px-4 fs-5 ${isActive('/upcoming-events') ? 'text-white' : 'text-white-50'}`}>
                    Upcoming events
                </Link>

                {loggedUser && loggedUser.role !== 'ADMIN' && (
                    <Link href="/my-events" className={`nav-link px-4 fs-5 ${isActive('/my-events') ? 'text-white' : 'text-white-50'}`}>
                        My events
                    </Link>
                )}

                <Link href="/create-event" className={`nav-link px-4 fs-5 ${isActive('/create-event') ? 'text-white' : 'text-white-50'}`}>
                    Create event
                </Link>

                {loggedUser ? (
                    <>
                        {loggedUser.role === 'ADMIN' && (
                            <Link
                                href="/users"
                                className={`nav-link px-4 fs-5 ${isActive('/users') ? 'text-white' : 'text-white-50'}`}
                            >
                                Users
                            </Link>
                        )}

                        <Link
                            href="/login"
                            className="nav-link px-4 fs-5 text-white-50"
                            onClick={handleLogout}
                        >
                            Logout
                        </Link>
                        <Link href="/" className="nav-link px-4 fs-5 text-white-50">
                            Welcome {loggedUser.name}!
                        </Link>
                    </>
                ) : (
                    <Link href="/login" className={`nav-link px-4 fs-5 ${isActive('/login') ? 'text-white' : 'text-white-50'}`}>
                        Login
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Header;