'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'pv_floating_cta_dismissed';

export function FloatingDownloadCTA() {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-5 right-4 z-50 md:hidden"
        >
          <div className="flex items-center gap-2 bg-[var(--color-primary)] text-white rounded-full shadow-[var(--shadow-glow)] px-4 py-2.5">
            <a
              href="https://drive.google.com/file/d/1vfbGfG2VOgCKLczaIzgdjeqkiUiCO1_n/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold"
              aria-label="Download PassVerse app"
            >
              <span aria-hidden="true">📱</span>
              Download App
            </a>
            <button
              onClick={dismiss}
              aria-label="Dismiss download prompt"
              className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
