'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: { label: string; href: string; desc: string }[] };

const navItems: NavItem[] = [
  {
    type: 'dropdown',
    label: 'Exam Tools',
    items: [
      { label: 'Practice',        href: '/practice',        desc: 'JAMB & WAEC CBT simulation'  },
      { label: 'Past Questions',  href: '/past-questions',  desc: 'Full archive 1999–2025'       },
      { label: 'Score Predictor', href: '/score-predictor', desc: 'AI-powered score forecast'    },
      { label: 'Cut-Off Marks',   href: '/cut-off',         desc: '200+ universities database'   },
      { label: 'Countdown',       href: '/countdown',       desc: 'Days to your exam'            },
    ],
  },
  {
    type: 'dropdown',
    label: 'Resources',
    items: [
      { label: 'Features', href: '/#features', desc: 'What PassVerse offers' },
      { label: 'About',    href: '/about',     desc: 'Our story and mission'  },
    ],
  },
  { type: 'link', label: 'Blog',    href: '/blog'    },
  { type: 'link', label: 'Pricing', href: '/pricing' },
];

function DropdownMenu({
  label,
  items,
  scrolled,
}: {
  label: string;
  items: { label: string; href: string; desc: string }[];
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 text-sm font-medium transition-colors duration-200',
          scrolled
            ? 'text-[var(--color-gray-600)] hover:text-[var(--color-primary)]'
            : 'text-white/80 hover:text-white',
        )}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col px-4 py-3 hover:bg-blue-50 transition-colors duration-150 group"
              >
                <span className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-primary)]">
                  {item.label}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">
                  {item.desc}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href.replace('/#features', ''));
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          <Link href="/" className="flex items-center group" onClick={closeMobile}>
            <Image
              src="/logo.png"
              alt="PassVerse"
              width={130}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <DropdownMenu
                    key={item.label}
                    label={item.label}
                    items={item.items}
                    scrolled={scrolled}
                  />
                );
              }
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'text-sm font-medium transition-colors duration-200',
                    scrolled
                      ? active
                        ? 'text-[var(--color-primary)] font-semibold'
                        : 'text-[var(--color-gray-600)] hover:text-[var(--color-primary)]'
                      : active
                        ? 'text-white font-semibold underline underline-offset-4 decoration-white/50'
                        : 'text-white/80 hover:text-white',
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

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
            <nav className="flex flex-col px-6 pt-8 gap-1">
              {navItems.map((item, i) => {
                if (item.type === 'dropdown') {
                  return (
                    <div key={item.label} className="mb-2">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1 py-2">
                        {item.label}
                      </p>
                      {item.items.map((sub, j) => (
                        <motion.div
                          key={sub.href}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * (i + j), duration: 0.25 }}
                        >
                          <Link
                            href={sub.href}
                            onClick={closeMobile}
                            className="block py-3 px-2 text-lg font-semibold text-gray-800 hover:text-[var(--color-primary)] border-b border-gray-50 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  );
                }
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className="block py-4 text-xl font-semibold border-b border-gray-100 text-gray-800 hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
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
