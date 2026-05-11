'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ChevronDown, Phone, Star, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  {
    label: 'دسته‌بندی‌ها',
    href: '/categories',
    children: [
      { label: 'وکیل', href: '/vakil', icon: '⚖️' },
      { label: 'پزشک', href: '/pezeshk', icon: '🏥' },
      { label: 'رستوران', href: '/restaurant', icon: '🍽️' },
      { label: 'کلینیک زیبایی', href: '/klinik-zibai', icon: '✨' },
      { label: 'دندانپزشک', href: '/dandanpezeshk', icon: '🦷' },
      { label: 'کاشت مو', href: '/kasht-mu', icon: '💈' },
    ],
  },
  { label: 'شهرها', href: '/cities' },
  { label: 'ثبت کسب‌وکار', href: '/register-business' },
  { label: 'بلاگ', href: '/blog' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-wiki">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black text-sm">
              و
            </div>
            <span
              className={cn(
                'text-xl font-black tracking-tight transition-colors',
                scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              )}
            >
              ویکی<span className="text-blue-400">بهترین</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <button
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      scrolled
                        ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      scrolled
                        ? 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-800'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full right-0 mt-1 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-border p-2 animate-fade-in"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-700 transition-colors"
                      >
                        <span className="text-lg">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-2 pt-2">
                      <Link
                        href="/categories"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-xl transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        همه دسته‌بندی‌ها
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/auth/login"
              className={cn(
                'text-sm font-medium px-4 py-2 rounded-lg transition-colors',
                scrolled
                  ? 'text-gray-700 hover:text-blue-700 dark:text-gray-200'
                  : 'text-white/90 hover:text-white'
              )}
            >
              ورود
            </Link>
            <Link href="/register-business">
              <Button
                size="sm"
                className="bg-white text-blue-800 hover:bg-blue-50 font-semibold rounded-xl shadow-sm"
              >
                ثبت رایگان کسب‌وکار
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'lg:hidden p-2 rounded-lg transition-colors',
              scrolled
                ? 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            )}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-border py-4 animate-slide-up">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href || '#'}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mr-4 mb-2">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                      >
                        <span>{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-3 border-t border-border flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl">ورود</Button>
              </Link>
              <Link href="/register-business" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800">ثبت رایگان کسب‌وکار</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
