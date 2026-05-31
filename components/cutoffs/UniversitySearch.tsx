'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { UNIVERSITIES, getUniversitiesByType, type University, type UniversityType } from '@/data/cutoffs';
import { cn } from '@/lib/utils';

function cutoffColor(score: number): string {
  if (score >= 200) return 'text-[#4169E1]';
  if (score >= 170) return 'text-[#f5a623]';
  return 'text-[#1D9E75]';
}

function typeBadgeStyle(type: UniversityType): string {
  if (type === 'federal') return 'bg-blue-900/40 text-blue-300 border border-blue-700/40';
  if (type === 'state') return 'bg-amber-900/40 text-amber-300 border border-amber-700/40';
  return 'bg-teal-900/40 text-teal-300 border border-teal-700/40';
}

function typeLabel(type: UniversityType): string {
  if (type === 'federal') return 'Federal';
  if (type === 'state') return 'State';
  return 'Private';
}


function UniversityCard({ university, index }: { university: University; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: index * 0.04 }}
    >
      <Link
        href={`/cut-off/${university.id}`}
        className={cn(
          'flex flex-col gap-3 p-5 rounded-xl border transition-all duration-200',
          'bg-[#16213e] border-[#1e3a5f] hover:border-[#4169E1] hover:-translate-y-0.5 hover:shadow-lg group',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-lg font-extrabold text-white group-hover:text-[#4169E1] transition-colors leading-tight">
            {university.shortName}
          </span>
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0', typeBadgeStyle(university.type))}>
            {typeLabel(university.type)}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-snug line-clamp-2">{university.name}</p>

        <div className="mt-auto">
          <p className={cn('text-3xl font-black tabular-nums', cutoffColor(university.generalCutoff))}>
            {university.generalCutoff}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">{university.state} · {university.session}</p>
        </div>

        <p className="text-xs font-medium text-[#4169E1] group-hover:underline">View Details →</p>
      </Link>
    </motion.div>
  );
}

const TYPES: { type: UniversityType; label: string }[] = [
  { type: 'federal', label: 'Federal Universities' },
  { type: 'state',   label: 'State Universities' },
  { type: 'private', label: 'Private Universities' },
];

export function UniversitySearch() {
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const filtered = isSearching
    ? UNIVERSITIES.filter(
        u =>
          u.name.toLowerCase().includes(trimmed) ||
          u.shortName.toLowerCase().includes(trimmed) ||
          u.state.toLowerCase().includes(trimmed),
      )
    : [];

  return (
    <div>
      {/* Search input */}
      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search university name or abbreviation..."
          className={cn(
            'w-full pl-11 pr-4 py-3.5 rounded-xl text-sm',
            'bg-[#16213e] border border-[#1e3a5f] text-white placeholder:text-slate-500',
            'focus:outline-none focus:border-[#4169E1] focus:ring-1 focus:ring-[#4169E1] transition-colors',
          )}
        />
      </div>

      {/* Flat search results */}
      {isSearching && (
        <div>
          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-12">No universities found for &ldquo;{query}&rdquo;</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((u, i) => (
                <UniversityCard key={u.id} university={u} index={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Grouped view */}
      {!isSearching && (
        <div className="space-y-14">
          {TYPES.map(({ type, label }) => {
            const unis = getUniversitiesByType(type);
            return (
              <section key={type}>
                <h2 className="text-lg font-bold text-slate-300 mb-5 flex items-center gap-3">
                  <span className="flex-1 h-px bg-[#1e3a5f]" />
                  {label}
                  <span className="flex-1 h-px bg-[#1e3a5f]" />
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {unis.map((u, i) => (
                    <UniversityCard key={u.id} university={u} index={i} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
