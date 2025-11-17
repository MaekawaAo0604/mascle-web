'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
            Mr.筋肉 2025
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {[
              { href: '/', label: 'ホーム' },
              { href: '/events', label: 'イベント情報' },
              { href: '/about', label: '大会について' },
              { href: '/faq', label: 'よくある質問' },
              { href: '/contact', label: 'お問い合わせ' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative group hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 glass rounded-lg p-4 animate-slide-down">
            {[
              { href: '/', label: 'ホーム' },
              { href: '/events', label: 'イベント情報' },
              { href: '/about', label: '大会について' },
              { href: '/faq', label: 'よくある質問' },
              { href: '/contact', label: 'お問い合わせ' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 px-4 hover:bg-white/10 rounded-lg hover:text-primary transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
