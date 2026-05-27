'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Pricing',  href: '/pricing' },
  { label: 'About',    href: '/about' },
];

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);

  /* Track scroll position */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[var(--shadow-sm)]'
            : 'bg-transparent',
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex flex-col leading-none group"
            onClick={closeMobile}
          >
            <span
              className={cn(
                'text-xl font-extrabold tracking-tight transition-colors duration-300',
                scrolled ? 'text-[var(--color-primary)]' : 'text-white',
              )}
            >
              PassVerse
            </span>
            <span
              className={cn(
                'text-[10px] font-medium tracking-widest uppercase transition-colors duration-300',
                scrolled ? 'text-[var(--color-gray-400)]' : 'text-white/70',
              )}
            >
              Imodoye
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    scrolled
                      ? 'text-[var(--color-gray-600)] hover:text-[var(--color-primary)]'
                      : 'text-white/80 hover:text-white',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <Button href="#download" size="sm" variant="primary">
              Download App
            </Button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors duration-200',
              scrolled
                ? 'text-[var(--color-gray-800)] hover:bg-[var(--color-gray-50)]'
                : 'text-white hover:bg-white/10',
            )}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'fixed inset-0 z-40 flex flex-col pt-16',
              'bg-white/95 backdrop-blur-md md:hidden',
            )}
          >
            <nav className="flex flex-col px-6 pt-8 gap-2">
              {navLinks.map(({ label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={href}
                    onClick={closeMobile}
                    className={cn(
                      'block py-4 text-xl font-semibold border-b border-[var(--color-gray-100)]',
                      'text-[var(--color-gray-800)] hover:text-[var(--color-primary)]',
                      'transition-colors duration-150',
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
                className="mt-6"
              >
                <Button
                  href="#download"
                  size="lg"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={closeMobile}
                >
                  Download App
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
