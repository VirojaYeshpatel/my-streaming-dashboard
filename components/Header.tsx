// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // For future mobile menu toggle

return (
<header className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-4 shadow-lg text-white">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
    
    {/* Logo */}
    <Link href="/" className="text-3xl font-bold text-red-600 tracking-wider">
        ASTAFLIX
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
        <Link href="/series" className="hover:text-red-400 transition-colors">TV Series</Link>
        <Link href="/movies" className="hover:text-red-400 transition-colors">Movies</Link>
    </nav>

    {/* Mobile Menu Toggle Button */}
    <button 
        className="md:hidden text-white" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
        d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
    </button>

    </div>
</header>
);
}
