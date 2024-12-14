import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Manchester Shitty</title>
        <meta name="description" content="Official website of Manchester Shitty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-500 px-4 py-8">
        {/* Logo Section */}
        <div className="mb-6">
          <Image
            src="/images/shittylogo.svg"
            alt="Manchester Shitty Logo"
            width={450}
            height={350}
            priority
          />
        </div>

        {/* Title Section */}
        <h1 className="text-7xl font-extrabold text-center mb-8 font-bebas">
          Welcome to Manchester Shitty
        </h1>

        {/* Navigation Links */}
        <nav className="flex  gap-8 mb-12">
          {/* Players Button */}
          <Link
            href="/players"
            className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
          >
            <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
              Players
            </span>
            <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              Meet The Squad
            </span>
          </Link>

          {/* Coaches Button */}
          <Link
            href="/coaches"
            className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
          >
            <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
              Coaches
            </span>
            <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              Meet Our Coaches
            </span>
          </Link>

          {/* Table Button */}
          <Link
            href="/table"
            className="relative block w-56 h-20 bg-yellow-500 text-black rounded-lg overflow-hidden group transition-transform transform hover:scale-105"
          >
            <span className="absolute inset-0 flex items-center justify-center font-bold text-xl transition-transform duration-300 group-hover:-translate-y-4">
              Table
            </span>
            <span className="absolute inset-0 flex items-center justify-center font-medium text-sm opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-2">
              Check Our Current Standings
            </span>
          </Link>
        </nav>

        {/* Footer */}
        <footer className="absolute bottom-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Manchester Shitty. All Rights Reserved.
        </footer>
      </main>
    </>
  );
}
