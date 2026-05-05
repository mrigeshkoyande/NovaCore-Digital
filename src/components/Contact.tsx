import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)
  const infoRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-heading', { scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }, y: 50, opacity: 0, duration: 0.9, ease: 'power3.out' })
      gsap.from(formRef.current, { scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }, x: -60, opacity: 0, duration: 0.9, ease: 'power3.out' })
      gsap.from(infoRef.current, { scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }, x: 60, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 lg:py-36 bg-[#09090f]">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="contact-heading text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-5">📬 GET IN TOUCH</div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white mb-4">Ready to <span className="gradient-text">Start?</span></h2>
          <p className="text-slate-400 text-lg">Tell us about your project and we'll get back within 24 hours with a tailored proposal.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <div ref={formRef} className="p-8 rounded-2xl border border-slate-700/40"
            style={{ background: 'linear-gradient(145deg,rgba(18,18,38,0.8),rgba(10,10,20,0.9))' }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-4xl mb-5 shadow-lg"
                  style={{ boxShadow: '0 0 40px rgba(16,185,129,0.4)' }}>✓</div>
                <h3 className="font-display text-2xl font-black text-white mb-3">Message Sent!</h3>
                <p className="text-slate-400">Thank you! We'll reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { id: 'contact-name', type: 'text', name: 'name', label: 'Your Name', placeholder: 'John Smith' },
                  { id: 'contact-email', type: 'email', name: 'email', label: 'Email Address', placeholder: 'john@company.com' },
                ].map(f => (
                  <div key={f.name}>
                    <label htmlFor={f.id} className="block text-sm font-medium text-slate-400 mb-2">{f.label}</label>
                    <input
                      id={f.id} type={f.type} name={f.name}
                      value={form[f.name as keyof typeof form]}
                      onChange={handleChange} required placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300 text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                  <textarea
                    id="contact-message" name="message" value={form.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-300 text-sm resize-none"
                  />
                </div>
                <button id="contact-submit" type="submit"
                  className="magnetic-btn w-full py-4 rounded-xl text-white font-bold text-base hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
                  <span className="relative z-10">Send Message →</span>
                  <div className="absolute inset-0 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="flex flex-col gap-5">
            <div className="p-7 rounded-2xl border border-indigo-500/20"
              style={{ background: 'linear-gradient(145deg,rgba(30,27,75,0.5),rgba(15,15,35,0.7))' }}>
              <h3 className="font-display text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: '✉️', label: 'Email', value: 'hello@novacoredigital.com', href: 'mailto:hello@novacoredigital.com' },
                  { icon: '📞', label: 'Phone', value: '+91-XXXXXXXXXX', href: 'tel:+91XXXXXXXXXX' },
                  { icon: '📍', label: 'Location', value: 'Berlin, Germany', href: null },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-lg shrink-0">{item.icon}</div>
                    <div>
                      <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
                      {item.href
                        ? <a href={item.href} className="text-slate-200 text-sm font-medium hover:text-indigo-400 transition-colors duration-200">{item.value}</a>
                        : <span className="text-slate-200 text-sm font-medium">{item.value}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-7 rounded-2xl border border-slate-700/40"
              style={{ background: 'linear-gradient(145deg,rgba(18,18,38,0.7),rgba(10,10,20,0.9))' }}>
              <h3 className="font-display text-lg font-bold text-white mb-2">Working Hours</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Mon – Fri: 9:00 AM – 7:00 PM (CET)<br />Weekend support available for active projects.</p>
            </div>

            <div className="p-7 rounded-2xl border border-emerald-500/20"
              style={{ background: 'linear-gradient(145deg,rgba(6,78,59,0.2),rgba(10,10,20,0.7))' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-semibold">Currently accepting new projects</span>
              </div>
              <p className="text-slate-400 text-xs">Spots are limited — book your free consultation today.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
