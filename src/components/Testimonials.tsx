import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Sarah Mitchell', role: 'Owner', company: 'Bloom Café', avatar: 'SM',
    gradient: 'from-rose-500 to-pink-600',
    quote: "NovaCore transformed our brand from an outdated local café to a polished digital experience. Our online orders doubled within 6 weeks of the new site launching. Truly world-class work.",
  },
  {
    name: 'Daniel Weber', role: 'Co-Founder', company: 'FitZone Studio', avatar: 'DW',
    gradient: 'from-emerald-500 to-teal-600',
    quote: "The social media campaign was phenomenal. Professional team, creative content, and most importantly — real numbers. Membership signups tripled in under 3 months. First class.",
  },
  {
    name: 'Aisha Khan', role: 'CEO', company: 'UrbanNest Realty', avatar: 'AK',
    gradient: 'from-indigo-500 to-violet-600',
    quote: "Working with NovaCore was a game-changer. The AI-powered lead gen page drives consistent, high-quality leads daily. Our sales team loves the steady pipeline of prospects.",
  },
]

// Duplicate for seamless marquee
const allCards = [...testimonials, ...testimonials]

function TestimonialCard({ name, role, company, avatar, gradient, quote }: {
  name: string; role: string; company: string; avatar: string; gradient: string; quote: string
}) {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 p-7 rounded-2xl border border-slate-700/40 mx-3 cursor-default"
      style={{ background: 'linear-gradient(145deg,rgba(18,18,38,0.9),rgba(10,10,20,0.95))' }}>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
      </div>
      <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0`}>
          {avatar}
        </div>
        <div>
          <div className="font-display font-bold text-white text-sm">{name}</div>
          <div className="text-slate-500 text-xs">{role} · {company}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#0a0a14] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 mb-14">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-5">
            ⭐ CLIENT REVIEWS
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">
            Voices of <span className="gradient-text">Success</span>
          </h2>
          <p className="text-slate-400 text-lg">Don't just take our word for it — hear from businesses we've helped grow.</p>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #0a0a14, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #0a0a14, transparent)' }} />

        <div className="flex marquee-inner">
          {allCards.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  )
}
