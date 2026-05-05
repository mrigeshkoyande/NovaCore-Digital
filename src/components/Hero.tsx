import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParticleCanvas from './ParticleCanvas'
import { use3DTilt } from '../hooks/use3DTilt'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '5×',   label: 'Average ROI Boost' },
]

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headingRef   = useRef<HTMLDivElement>(null)
  const subRef       = useRef<HTMLDivElement>(null)
  const btnRef       = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const cardWrapRef  = useRef<HTMLDivElement>(null)

  const { ref: tiltRef, onMouseMove, onMouseLeave } = use3DTilt(10)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(headingRef.current, { y: 80, opacity: 0, duration: 1, rotateX: 20 })
      .from(subRef.current,     { y: 50, opacity: 0, duration: 0.8 }, '-=0.5')
      .from(btnRef.current,     { y: 30, opacity: 0, duration: 0.6 }, '-=0.4')
      .from(statsRef.current?.children ?? [], { y: 30, opacity: 0, stagger: 0.12, duration: 0.6 }, '-=0.3')
      .from(cardWrapRef.current, { x: 80, opacity: 0, duration: 1, ease: 'power2.out' }, '-=1')
  }, [])

  const handleScroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Three.js particle bg */}
      <ParticleCanvas />

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 py-20">
        {/* Left */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            A DIGITAL GROWTH AGENCY · BERLIN
          </div>

          <div ref={headingRef} style={{ perspective: '1000px' }}>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black leading-[1.03] text-white mb-6 tracking-tight">
              Building{' '}
              <span className="gradient-text">modern</span>
              <br />
              <span className="gradient-text">digital</span>{' '}
              experiences.
            </h1>
          </div>

          <div ref={subRef}>
            <p className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              We craft high-performance websites, compelling brands, and data-driven marketing strategies that help growing businesses scale faster and convert better.
            </p>
          </div>

          <div ref={btnRef} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            {/* Magnetic CTA */}
            <button
              id="hero-cta-primary"
              onClick={() => handleScroll('#contact')}
              className="magnetic-btn relative group px-8 py-4 rounded-2xl overflow-hidden font-semibold text-white text-base"
              style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
            >
              <span className="relative z-10">Book a Free Consultation →</span>
              {/* Shimmer */}
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-indigo-400/50 animate-pulse-ring" />
            </button>

            <button
              id="hero-cta-secondary"
              onClick={() => handleScroll('#portfolio')}
              className="px-8 py-4 rounded-2xl border border-slate-600 text-slate-300 font-semibold text-base hover:border-indigo-500/60 hover:text-white hover:bg-indigo-500/8 transition-all duration-400 group"
            >
              <span className="group-hover:mr-1 transition-all">View Portfolio</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex items-center gap-10 mt-14 justify-center lg:justify-start">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-black font-display gradient-text">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">{s.label}</div>
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute mt-[-1.5rem] ml-[7rem] w-px h-8 bg-slate-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D tilt card */}
        <div ref={cardWrapRef} className="flex-1 flex justify-center lg:justify-end">
          <div
            ref={tiltRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative w-full max-w-[420px] card-3d cursor-default"
            style={{ perspective: '1000px' }}
          >
            {/* Main card */}
            <div className="relative rounded-3xl border border-slate-700/50 p-8 glow-indigo overflow-hidden"
              style={{ background: 'linear-gradient(145deg, rgba(30,27,75,0.8), rgba(15,15,30,0.9))', backdropFilter: 'blur(20px)' }}>
              {/* Shine overlay */}
              <div className="card-shine rounded-3xl" />

              {/* Spinning orbit ring */}
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border border-indigo-500/20 animate-spin-slow" />
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-cyan-500/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Digital Partner</div>
                  <div className="text-2xl font-display font-black text-white">NovaCore</div>
                  <div className="text-sm text-indigo-400 font-medium">Digital Agency</div>
                </div>
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 animate-pulse-ring opacity-40" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-2xl">N</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4 mb-7">
                {[
                  { label: 'Web Development', pct: 95, color: 'from-indigo-500 to-violet-500' },
                  { label: 'Brand Strategy',  pct: 88, color: 'from-cyan-500 to-blue-500' },
                  { label: 'Growth Marketing',pct: 92, color: 'from-emerald-500 to-teal-500' },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>{row.label}</span>
                      <span className="gradient-text font-bold">{row.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['Fast ⚡', 'Clean ✦', 'Results 📈'].map(t => (
                  <div key={t} className="text-center py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-5 -left-5 px-4 py-2 rounded-2xl text-white text-sm font-bold shadow-xl animate-float"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              ✨ 5-Star Agency
            </div>
            <div className="absolute -bottom-5 -right-5 px-4 py-2 rounded-2xl text-white text-sm font-bold shadow-xl animate-float"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6366f1)', animationDelay: '3.5s' }}>
              🚀 Fast Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-indigo-500/60 to-transparent" />
      </div>
    </section>
  )
}
