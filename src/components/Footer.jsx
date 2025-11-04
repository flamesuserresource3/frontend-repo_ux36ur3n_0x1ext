import React from 'react';
import { Github, Mail } from 'lucide-react';

const Footer = React.forwardRef(function Footer(_, ref) {
  const year = new Date().getFullYear();
  return (
    <footer ref={ref} className="border-t border-white/10 bg-slate-950/80 py-8 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm">© {year} Getteng Apps. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a href="#" className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
            <Github size={16} /> GitHub
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
            <Mail size={16} /> Contact
          </a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
