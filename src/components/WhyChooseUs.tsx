import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { use3DTilt } from '../hooks/use3DTilt'

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { icon: '⚡', title: 'Fast Delivery',            desc: 'Agile sprints and transparent timelines — production-ready product faster than you think.', gradient: 'from-amber-400 to-orange-500' },
  { icon: '🎯', title: 'Modern UI/UX',              desc: 'Research-backed design systems that are intuitive, beautiful, and optimised for conversion.', gradient: 'from-indigo-400 to-violet-500' },
  { icon: '💰', title: 'Affordable Packages',       desc: 'Transparent, flexible pricing for startups and SMEs — enterprise quality without enterprise costs.', gradient: 'from-emerald-400 to-teal-500' },
  { icon: '📊', title: 'Business-Focused Strategy', desc: 'Every decision is tied to measurable KPIs. We obsess over metrics that move your revenue needle.', gradient: 'from-cyan-400 to-blue-500' },
]

const counterStats = [
  { end: 99, suffix: '%', label: 'On-time delivery' },
  { end: 3,  suffix: '×', label: 'Avg. ROI increase' },
  { end: 24, suffix: 'h', label: 'Support response' },
]

function AnimatedCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.from({ val: 0 }, {
      scrollTrigger: { trigger: numRef.current, start: 'top 90%' },
      val: end,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate() {
        if (numRef.current) numRef.current.textContent = Math.round((this as { val: number }).val) + suffix
      },
    })
  }, [end, suffix])

  return (
    <div className="text-center">
      <div className="text-3xl font-black font-display text-white">
        <span ref={numRef}>0{suffix}</span>
      </div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function ReasonCard({ icon, title, desc, gradient, index }: { icon: string; title: string; desc: string; gradient: string; index: number }) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(10)
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      id={`why-card-${index}`}
      className="why-card card-3d group p-6 rounded-2xl border border-slate-700/40 hover:border-slate-600/60 hover-glow transition-colors duration-400 cursor-default"
      style={{ background: 'linear-gradient(145deg, rgba(18,18,38,0.8), rgba(10,10,20,0.9))' }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-left-content', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from('.why-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: 80, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why-us" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#0a0a14] overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left */}
          <div className="lg:w-5/12 why-left-content">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              🏆 WHY NOVACORE
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Why Innovators Partner with{' '}
              <span className="gradient-text">NovaCore</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              We don't just build websites — we build digital growth engines. Every service is engineered to create measurable impact for your business.
            </p>

            {/* Animated counters */}
            <div className="flex items-center gap-8 p-6 rounded-2xl border border-slate-700/30"
              style={{ background: 'linear-gradient(145deg, rgba(30,27,75,0.4), rgba(15,15,30,0.6))' }}>
              {counterStats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-8">
                  <AnimatedCounter {...s} />
                  {i < counterStats.length - 1 && <div className="w-px h-10 bg-slate-700" />}
                </div>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => <ReasonCard key={r.title} {...r} index={i} />)}
          </div>
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  )
}
