import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header
            className="p-3 mb-4 border-bottom"
            style={{ background: 'linear-gradient(135deg, #2e2e2e, #3f3f3f)' }}
        >
            <div className="container d-flex align-items-center justify-content-between">
                <a
                    href="/"
                    className="fs-1 fw-bold text-white text-decoration-none"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: '2px',
                        textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Soccer App
                </a>
                <nav className="nav">
                    <Link
                        href="/"
                        className="nav-link px-3 fs-5 text-white"
                        style={{ transition: 'color 0.3s' }}
                    >
                        Home
                    </Link>
                    <Link
                        href="/competition"
                        className="nav-link px-3 fs-5 text-white"
                        style={{ transition: 'color 0.3s' }}
                    >
                        Competitions
                    </Link>
                </nav>
            </div>

            <style jsx>{`
                .nav-link:hover {
                    color: #d3d3d3;
                    text-decoration: underline;
                }
            `}</style>
        </header>
    );
};

export default Header;
