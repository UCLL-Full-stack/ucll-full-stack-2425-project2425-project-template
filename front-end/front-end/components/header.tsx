import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-10">
        <div className="flex items-center space-x-4">
          <Image src="/PMT.png" alt="Project Management Tool Logo" width={50} height={50} unoptimized/>
        </div>
        <nav className=''>
          <ul className="flex space-x-8 text-gray-700">
          <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/projects" className="hover:underline">Project Overview</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Test</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
