const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#about' },
    { label: 'Get Started', href: '#home' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-[#12121a]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 text-xs font-bold text-white">
                F
              </span>
              <span className="text-sm font-semibold text-white">FIFA Smart Assistant</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">
              AI-powered stadium experience for the modern fan. Navigate, discover, and enjoy
              every moment with intelligent assistance.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 text-sm font-medium text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors duration-200 hover:text-gray-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} FIFA Smart Assistant. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">Built for the future of stadium experiences.</p>
        </div>
      </div>
    </footer>
  );
}
