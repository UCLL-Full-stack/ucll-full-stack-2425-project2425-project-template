import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        PokéPal
      </a>
      <nav className="nav justify-content-center">
      <Link href="/trainers" className="nav-link px-4 fs-5 text-white">
          trainers
        </Link>
        <Link href="/pokemons" className="nav-link px-4 fs-5 text-white">
          pokemons
        </Link>
        <Link href="/calendar" className="nav-link px-4 fs-5 text-white">
          calendar
        </Link>
        <Link href="/badges" className="nav-link px-4 fs-5 text-white">
          badges
        </Link>
      </nav>
    </header>
  );
};

export default Header;
