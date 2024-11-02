import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/SCR-20241102-bsdc (1).png";

const Header: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Workout Planner Logo"
            width={100}
            height={100}
            className="mr-4"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
