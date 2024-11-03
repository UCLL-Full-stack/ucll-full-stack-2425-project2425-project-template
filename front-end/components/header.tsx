import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white header-link">
          Home
        </Link>
        <Link
          href="/ingredients"
          className="nav-link fs-5 text-white header-link"
        >
          Ingredients
        </Link>
        <Link href="/recipes" className="nav-link fs-5 text-white header-link">
          Recipes
        </Link>
        <Link href="/reviews" className="nav-link fs-5 text-white header-link">
          Reviews
        </Link>
        <Link href="/users" className="nav-link fs-5 text-white header-link">
          Users
        </Link>
      </nav>
    </header>
  );
};

export default Header;
