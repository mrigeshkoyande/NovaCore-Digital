import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Restaurant Website Redesign',
    description: 'A full UX overhaul for a boutique restaurant, increasing online reservations by 340% within 3 months of launch.',
    category: 'HOSPITALITY', emoji: '🍽️',
    colors: ['#b45309', '#c2410c'], accent: 'text-amber-300', stat: '+340% Reservations',
  },
  {
    title: 'Real Estate Lead Gen Page',
    description: 'AI-powered property matching landing page that generated 200+ qualified leads in the first month.',
    category: 'REAL ESTATE', emoji: '🏡',
    colors: ['#1d4ed8', '#4338ca'], accent: 'text-blue-300', stat: '200+ Leads / Month',
  },
  {
    title: 'Fitness Brand Social Campaign',
    description: 'Multi-platform strategy that grew FitZone from 2K to 45K followers and tripled membership sign-ups in 90 days.',
    category: 'FITNESS', emoji: '💪',
    colors: ['#047857', '#0f766e'], accent: 'text-emerald-300', stat: '2K → 45K Followers',
  },
  {
    title: 'AI Chatbot for Customer Support',
    description: 'Custom GPT-4 chatbot automating 78% of support tickets and saving 30+ hours of team time every week.',
    category: 'TECHNOLOGY', emoji: '🤖',
    colors: ['#6d28d9', '#4f46e5'], accent: 'text-violet-300', stat: '78% Automation',
  },
]

function ProjectCard({ title, description, category, emoji, colors, accent, stat, index }: {
  title: string; description: string; category: string; emoji: string
  colors: string[]; accent: string; stat: string; index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -16
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 16
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`
    el.style.transition = 'transform 0.1s ease'
  }
  const onMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)'
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)'
  }

  return (
    <div ref={cardRef} id={`project-card-${index}`}
      className="project-card group relative overflow-hidden rounded-2xl border border-slate-800 hover:border-slate-600 cursor-default"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="text-7xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}>{emoji}</div>
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-bold tracking-widest ${accent}`}>{category}</span>
        <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm text-white text-xs font-bold">{stat}</span>
      </div>
      <div className="p-6" style={{ background: 'linear-gradient(145deg,rgba(18,18,38,0.95),rgba(10,10,20,0.98))' }}>
        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-300">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>
        <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300" style={{ color: colors[0] }}>
          <span>View Case Study</span><span>→</span>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-header', { scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }, y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' })
      gsap.from('.project-card', { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 80, opacity: 0, scale: 0.92, stagger: 0.15, duration: 0.9, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#09090f]">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="portfolio-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">✦ SELECTED WORK</div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white">Crafting <span className="gradient-text">Excellence</span></h2>
          </div>
          <button id="portfolio-view-all" className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/5 transition-all duration-300 shrink-0">
            View All Projects →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  )
}
