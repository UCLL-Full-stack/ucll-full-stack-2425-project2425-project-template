import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/SCR-20241102-bsdc (1).png";
import { User } from "@/types";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user ? JSON.parse(user) : null);
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Workout Planner Logo"
            className="mr-4"
            priority
          />
          <h1 className="text-3xl font-bold text-gray-800">Workout Planner</h1>
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/"
            className={`${
              currentRoute === "/"
                ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-800"
            } transition-colors pb-1`}
          >
            Home
          </Link>
          <Link
            href="/workouts"
            className={`${
              currentRoute === "/workouts"
                ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-800"
            } transition-colors pb-1`}
          >
            Workouts
          </Link>
          <Link
            href="/exercises"
            className={`${
              currentRoute === "/exercises"
                ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                : "text-gray-600 hover:text-gray-800"
            } transition-colors pb-1`}
          >
            Exercises
          </Link>
          {!loggedInUser && (
            <Link
              href="/login"
              className={`${
                currentRoute === "/login"
                  ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                  : "text-gray-600 hover:text-gray-800"
              } transition-colors pb-1`}
            >
              Login
            </Link>
          )}
          {loggedInUser && (
            <Link
              href="/login"
              onClick={handleClick}
              className={`${
                currentRoute === "/login"
                  ? "text-gray-900 font-semibold border-b-2 border-gray-900"
                  : "text-gray-600 hover:text-gray-800"
              } transition-colors pb-1`}
            >
              Logout
            </Link>
          )}
          {loggedInUser && (
            <div className="text-gray-600 ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
              Welcome, {loggedInUser?.fullname}!
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
