import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { use3DTilt } from '../hooks/use3DTilt'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: '⚡', title: 'Fast Delivery',       desc: 'Agile sprints and transparent timelines — your product ships on time, every single time.' },
  { icon: '✦', title: 'Clean Design',          desc: 'Pixel-perfect interfaces that communicate trust, professionalism, and real brand value.' },
  { icon: '📈', title: 'Conversion-Focused', desc: 'Every design decision is tied to measurable KPIs that move your revenue needle.' },
]

function HighlightCard({ icon, title, desc, index }: { icon: string; title: string; desc: string; index: number }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(12)
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      id={`about-card-${index}`}
      className="about-card card-3d group relative p-8 rounded-2xl border border-slate-700/40 hover:border-indigo-500/40 hover-glow transition-colors duration-500 cursor-default overflow-hidden"
      style={{ background: 'linear-gradient(145deg, rgba(20,20,40,0.8), rgba(10,10,20,0.9))' }}
    >
      <div className="card-shine rounded-2xl" />
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const paraRef     = useRef<HTMLParagraphElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([badgeRef.current, headingRef.current, paraRef.current], {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 60, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
      })
      gsap.from('.about-card', {
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        y: 80, opacity: 0, rotateX: 25, stagger: 0.15, duration: 1,
        ease: 'power3.out', transformOrigin: 'top center',
        perspective: 800,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden bg-[#0a0a14]">
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
            ✦ OUR STORY
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 ref={headingRef} className="font-display text-4xl lg:text-5xl font-black text-white mb-6">
            Redefining <span className="gradient-text">Modern Growth</span>
          </h2>
          <p ref={paraRef} className="text-slate-400 text-lg leading-relaxed">
            NovaCore Digital helps businesses build consolidated digital presences and grow their brand online. We're a team of passionate strategists, designers, and developers who believe great design should drive real business results — from pixel-perfect UI to conversion-optimised experiences.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {highlights.map((h, i) => <HighlightCard key={h.title} {...h} index={i} />)}
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  )
}
