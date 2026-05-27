import Link from 'next/link';
import { X, Camera, Globe, Smartphone } from 'lucide-react';

const quickLinks = [
  { label: 'Home',    href: '/' },
  { label: 'Blog',    href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About',   href: '/about' },
  { label: 'Contact', href: 'mailto:support@passverse.com.ng' },
];

const legalLinks = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
  { label: 'Twitter / X', href: 'https://twitter.com/passverse',        Icon: X },
  { label: 'Instagram',   href: 'https://instagram.com/passverse',      Icon: Camera },
  { label: 'LinkedIn',    href: 'https://linkedin.com/company/passverse', Icon: Globe },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-white">PassVerse</p>
              <p className="text-xs font-medium tracking-widest uppercase text-white/50 mt-0.5">
                Imodoye
              </p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Nigeria&apos;s smartest exam prep app. Master JAMB, WAEC, GCE and Post-UTME
              with AI-powered explanations and 10,000+ past questions.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Play Store badge */}
            <a
              href="#download"
              className="inline-flex items-center gap-3 mt-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors duration-200 w-fit"
            >
              <Smartphone size={20} className="text-white/80" />
              <div className="leading-none">
                <p className="text-[10px] text-white/60 tracking-wide uppercase">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal & Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Legal &amp; Support
            </h3>
            <ul className="flex flex-col gap-3 mb-6">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Support
              </p>
              <a
                href="mailto:support@passverse.com.ng"
                className="text-sm text-[var(--color-primary-light)] hover:text-white transition-colors duration-150"
              >
                support@passverse.com.ng
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; 2025 PassVerse (Imodoye). All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with ❤️ in Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
