'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
const pathname = usePathname();

const isActive = (path: string) => {
return pathname === path ? 'text-red-500 font-bold' : 'text-gray-300 hover:text-white';
};

return (
<header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
    <div className="container mx-auto px-4 md:px-8 py-4">
    <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-red-600 hover:text-red-500 transition">
        ASTAFLIX
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 md:gap-8">
        <Link 
            href="/" 
            className={`text-sm md:text-base transition ${isActive('/')}`}
        >
            Home
        </Link>
        <Link 
            href="/movies" 
            className={`text-sm md:text-base transition ${isActive('/movies')}`}
        >
            Movies
        </Link>
        <Link 
            href="/tv-series" 
            className={`text-sm md:text-base transition ${isActive('/tv-series')}`}
        >
            TV Series
        </Link>
        </nav>
    </div>
    </div>
</header>
);
}