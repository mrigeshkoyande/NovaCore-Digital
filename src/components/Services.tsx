import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { use3DTilt } from '../hooks/use3DTilt'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: '🖥️',
    title: 'Website Design & Development',
    description: 'Blazing-fast, fully responsive websites built with cutting-edge tech that look stunning and convert visitors into customers.',
    tags: ['React', 'Next.js', 'Tailwind', 'Webflow'],
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.3)',
  },
  {
    icon: '📣',
    title: 'Social Media Marketing',
    description: 'Data-driven social strategies that grow your audience, boost engagement, and turn followers into a thriving community.',
    tags: ['Instagram', 'LinkedIn', 'Meta Ads', 'TikTok'],
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.3)',
  },
  {
    icon: '🎨',
    title: 'Branding & Graphic Design',
    description: 'Memorable brand identities — logos, color systems, typography that make a lasting impression at every touchpoint.',
    tags: ['Logo', 'Brand Guide', 'Figma', 'Illustration'],
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.3)',
  },
  {
    icon: '🔍',
    title: 'SEO & Growth Marketing',
    description: 'End-to-end SEO combining technical optimisation, content, and link building to dominate search and drive organic growth.',
    tags: ['On-Page', 'Technical', 'Content', 'Analytics'],
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: '🤖',
    title: 'AI Automation',
    description: 'Custom GPT-4 workflows, chatbots, and automation pipelines that eliminate repetitive tasks and unlock new revenue at scale.',
    tags: ['Chatbots', 'Workflows', 'GPT-4', 'Zapier'],
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.3)',
  },
]

interface ServiceCardProps {
  icon: string; title: string; description: string
  tags: string[]; gradient: string; glow: string; index: number
}

function ServiceCard({ icon, title, description, tags, gradient, glow, index }: ServiceCardProps) {
  const { ref, onMouseMove, onMouseLeave } = use3DTilt(14)
  const mouseRef = useRef<HTMLDivElement>(null)

  const trackMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove(e)
    if (!mouseRef.current) return
    const r = mouseRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    mouseRef.current.style.setProperty('--mouse-x', `${x}%`)
    mouseRef.current.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <div
      ref={(el) => {
        // Merge refs
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = el
        ;(mouseRef as React.MutableRefObject<HTMLDivElement | null>).current = el
      }}
      onMouseMove={trackMouse}
      onMouseLeave={onMouseLeave}
      id={`service-card-${index}`}
      className="service-card card-3d group relative p-7 rounded-2xl border border-slate-700/40 hover:border-slate-600/60 transition-colors duration-500 cursor-default overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(18,18,38,0.9), rgba(10,10,20,0.95))',
      }}
    >
      {/* Dynamic hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 50px ${glow}` }}
      />
      <div className="card-shine rounded-2xl" />

      {/* Icon */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
        {icon}
      </div>

      <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-400 text-xs font-medium border border-slate-700/40 group-hover:border-slate-600/40 transition-colors duration-300">
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute top-5 right-5 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">↗</div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 100, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.8,
        ease: 'back.out(1.4)',
      })
      gsap.from('.services-heading', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#09090f]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="services-heading text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-5">
            🛠️ WHAT WE DO
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">
            Core <span className="gradient-text">Competencies</span>
          </h2>
          <p className="text-slate-400 text-lg">Full-service digital solutions designed to accelerate your growth from day one.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} {...svc} index={i} />
          ))}
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  )
}
