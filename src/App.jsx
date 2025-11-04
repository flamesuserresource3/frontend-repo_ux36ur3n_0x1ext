import React, { useRef } from 'react';
import Hero from './components/Hero';
import Courses from './components/Courses';
import FeatureTabs from './components/FeatureTabs';
import Footer from './components/Footer';
import { GraduationCap, LayoutDashboard, ListChecks } from 'lucide-react';

function App() {
  const coursesRef = useRef(null);
  const toolsRef = useRef(null);

  const navigateTo = (section) => {
    if (section === 'courses' && coursesRef.current) {
      coursesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (section === 'tools' && toolsRef.current) {
      toolsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-indigo-400" size={20} />
            <span className="font-semibold">Getteng Apps</span>
          </div>
          <nav className="flex items-center gap-2 text-sm text-slate-200">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-md px-3 py-2 hover:bg-white/5">
              Home
            </button>
            <button onClick={() => navigateTo('courses')} className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5">
              <ListChecks size={16} /> Kursus
            </button>
            <button onClick={() => navigateTo('tools')} className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:bg-white/5">
              <LayoutDashboard size={16} /> Tools
            </button>
          </nav>
        </div>
      </header>

      <Hero onNavigate={navigateTo} />

      <main>
        <Courses ref={coursesRef} />
        <FeatureTabs ref={toolsRef} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
