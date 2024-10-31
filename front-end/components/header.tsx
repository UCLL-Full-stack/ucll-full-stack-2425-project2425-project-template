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

          <Link href='/login'>
            Sign in
          </Link>
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
