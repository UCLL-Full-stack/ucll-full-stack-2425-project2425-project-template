import Link from "next/link";

const Header: React.FC = () => {
  return (
    
    <header>
      <div className="nav">
        <img src="/images/FamList Temp.png" alt="famlist logo" />
        <ul>
          <li>Home</li>
          <li>Users</li>
          <li>Families</li>
          <li>Sign in</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
