const footerLinks = {
  Services: ['Web Development', 'Social Media', 'Branding', 'SEO & Growth', 'AI Automation'],
  Company: ['About Us', 'Portfolio', 'Testimonials', 'Blog', 'Careers'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const socials = [
  { label: 'Twitter/X', icon: '𝕏', href: '#' },
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Instagram', icon: '◎', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#060610] border-t border-slate-800/60">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">N</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                NovaCore<span className="text-indigo-400">.</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-7">
              Building modern digital experiences for growing businesses. Your vision, our expertise — amplified.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 text-sm font-bold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 text-sm hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} NovaCore Digital. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Crafted with ❤️ in Berlin, Germany
          </p>
        </div>
      </div>
    </footer>
  )
}
