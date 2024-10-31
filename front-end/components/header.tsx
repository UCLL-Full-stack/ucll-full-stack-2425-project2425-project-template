import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Workout Planner</h1>
        <nav className="flex space-x-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/workouts"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Workouts
          </Link>
          <Link
            href="/exercises"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Exercises
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
