import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface Testimonial {
  quote:  string;
  name:   string;
  detail: string;
  color:  string;
}

const testimonials: Testimonial[] = [
  {
    quote:  'I scored 312 in JAMB after 3 weeks of daily practice on PassVerse. The AI explanations made everything click for me.',
    name:   'Chisom Okafor',
    detail: 'JAMB 2024 · University of Lagos',
    color:  'bg-blue-500',
  },
  {
    quote:  'The mock exam feature is exactly like the real CBT. I was so calm on exam day because I had practiced the same format hundreds of times.',
    name:   'Brian Adeyemi',
    detail: 'WAEC 2024 · Federal Government College',
    color:  'bg-teal-500',
  },
  {
    quote:  'PassVerse has everything — past questions, timer, explanations. My WAEC result was the best in my set. Distinction in 7 subjects!',
    name:   'Fatima Abdullahi',
    detail: 'WAEC 2024 · Kano State',
    color:  'bg-amber-500',
  },
];

function TestimonialCard({ quote, name, detail, color, index }: Testimonial & { index: number }) {
  return (
    <AnimatedSection delay={index * 0.15} direction="up">
      <article className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col gap-4 h-full">
        {/* Stars */}
        <p className="text-amber-400 text-sm" aria-label="5 stars">⭐⭐⭐⭐⭐</p>

        {/* Quote */}
        <blockquote className="text-white/90 italic leading-relaxed text-sm flex-1">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <div
            className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
            aria-hidden="true"
          >
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{name}</p>
            <p className="text-blue-300 text-xs">{detail}</p>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ background: '#0F172A' }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            What Students Are Saying
          </h2>
          <p className="text-blue-300">Real results from Nigerian students</p>
        </AnimatedSection>

        {/*
          Mobile: horizontal scroll with snap
          Desktop: 3-col grid
          We render two versions to keep markup clean and avoid flex+grid conflicts.
        */}

        {/* Mobile scroll (hidden on md+) */}
        <div
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t, i) => (
            <div key={t.name} className="flex-none w-[85vw] max-w-sm snap-center">
              <TestimonialCard {...t} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop grid (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
