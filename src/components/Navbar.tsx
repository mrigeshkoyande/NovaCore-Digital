import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090f]/90 backdrop-blur-xl border-b border-indigo-900/30 shadow-lg shadow-indigo-950/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); handleNav('#hero') }}
          className="flex items-center gap-2 group"
          id="navbar-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
            <span className="text-white font-black text-sm">N</span>
          </div>
          <span
            className="font-display font-bold text-xl text-white group-hover:text-indigo-300 transition-colors duration-300"
          >
            NovaCore<span className="text-indigo-400">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                onClick={e => { e.preventDefault(); handleNav(link.href) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            id="navbar-cta"
            onClick={e => { e.preventDefault(); handleNav('#contact') }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-indigo-900/20`}
      >
        <ul className="flex flex-col px-6 pb-4 gap-1 pt-2">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNav(link.href) }}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
              className="block px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm font-semibold text-center"
            >
              Book a Free Consultation
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
