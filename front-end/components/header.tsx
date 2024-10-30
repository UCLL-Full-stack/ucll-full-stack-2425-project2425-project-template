import Link from "next/link";

const Header: React.FC = () => {
  return (
    
    <header>
      <div className="nav">
        <img src="/images/FamList Temp.png" alt="famlist logo" />
        <ul>
          <Link href="/">
            Home
          </Link>

          <Link href="/users">
            Users
          </Link>

          <Link href="/families">
            Families
          </Link>

          <li>Sign in</li>
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
