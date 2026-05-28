import Link from 'next/link';
import { X, Camera, Globe, Smartphone } from 'lucide-react';

const companyLinks = [
  { label: 'About',         href: '/about' },
  { label: 'Blog',          href: '/blog' },
  { label: 'Pricing',       href: '/pricing' },
  { label: 'Contact',       href: '/contact' },
];

const pastQuestionsLinks = [
  { label: 'JAMB Mathematics',  href: '/past-questions/jamb/mathematics' },
  { label: 'JAMB English',      href: '/past-questions/jamb/english' },
  { label: 'WAEC Biology',      href: '/past-questions/waec/biology' },
  { label: 'WAEC Mathematics',  href: '/past-questions/waec/mathematics' },
  { label: 'JAMB Economics',    href: '/past-questions/jamb/economics' },
];

const legalLinks = [
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
  { label: 'Twitter / X', href: 'https://twitter.com/passverse',          Icon: X },
  { label: 'Instagram',   href: 'https://instagram.com/passverse',        Icon: Camera },
  { label: 'LinkedIn',    href: 'https://linkedin.com/company/passverse', Icon: Globe },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-gray-900)] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">

        {/* ── Five-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Col 1 — Brand (spans 2 on md) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-white">PassVerse</p>
              <p className="text-xs font-medium tracking-widest uppercase text-white/50 mt-0.5">
                Ìmọ́dòye
              </p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Nigeria&apos;s smartest exam prep app. Master JAMB, WAEC, GCE and Post-UTME
              with AI-powered explanations and 26,000+ past questions.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
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
              href="https://play.google.com/store/apps/details?id=com.passverse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-4 py-3 transition-colors duration-200 w-fit"
            >
              <Smartphone size={20} className="text-white/80" />
              <div className="leading-none">
                <p className="text-[10px] text-white/60 tracking-wide uppercase">Get it on</p>
                <p className="text-sm font-semibold text-white">Google Play</p>
              </div>
            </a>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Past Questions */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Past Questions
            </h3>
            <ul className="flex flex-col gap-3">
              {pastQuestionsLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Support & Legal */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
              Support &amp; Legal
            </h3>
            <ul className="flex flex-col gap-3 mb-5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Email Support
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
            &copy; 2025 PassVerse (Ìmọ́dòye). All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with ❤️ in Nigeria 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
