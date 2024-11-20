// components/Header.tsx
import Link from 'next/link';

export default function Header() {
    return (
        <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-dark">
            <Link href="/" passHref style={{ textDecoration: 'none'}}>
                <h1 className="h3 m-0 text-white">Train tickets</h1>
            </Link>
            <nav>
                <Link href="/login" passHref>
                    <button className="btn btn-primary me-2">Login</button>
                </Link>
                <Link href="/registration" passHref>
                    <button className="btn btn-secondary">Register</button>
                </Link>
            </nav>
        </header>
    );
}
