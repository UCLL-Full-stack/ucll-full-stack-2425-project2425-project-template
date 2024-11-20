import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";

export default function Header() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-5">
        <div className="flex items-center space-x-4">
          <Image src="/PMT.png" alt="Project Management Tool Logo" width={50} height={50} unoptimized/>
        </div>
        
        {loggedInUser && (
          <div className="text-gray-700 text-center">
            Welcome, {loggedInUser}!
          </div>
        )}

        <nav>
          <ul className="flex space-x-8 text-gray-700">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:underline">Project Overview</Link>
            </li>

            {loggedInUser ? (
              <li>
                <a onClick={handleLogout} className="hover:underline cursor-pointer">Logout</a>
              </li>
            ) : (
              <li>
                <Link href="/login" className="hover:underline">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
