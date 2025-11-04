import { useRef, useState } from 'react';
import Hero from './components/Hero';
import Courses from './components/Courses';
import FeatureTabs from './components/FeatureTabs';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const courseRef = useRef(null);

  const scrollToCourses = () => {
    courseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold text-xl">Getteng <span className="text-indigo-600">Apps</span></div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <button onClick={scrollToCourses} className="hover:text-indigo-600">Kurikulum</button>
            <a href="#fitur" className="hover:text-indigo-600">Fitur</a>
            <a href="#benefit" className="hover:text-indigo-600">Benefit</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setAuthOpen(true)} className="px-4 py-2 rounded-xl border font-semibold hover:bg-gray-50">Masuk</button>
            <button onClick={() => setAuthOpen(true)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Daftar</button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Hero onOpenAuth={() => setAuthOpen(true)} onExplore={scrollToCourses} />
        <section id="benefit" className="py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border bg-white">
              <p className="text-sm font-semibold text-indigo-600">Benefit</p>
              <h3 className="mt-2 text-xl font-bold">Sertifikat Resmi</h3>
              <p className="text-gray-600 mt-1">Dapatkan sertifikat penyelesaian untuk portofolio dan LinkedIn.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-white">
              <p className="text-sm font-semibold text-indigo-600">Kurasi Materi</p>
              <h3 className="mt-2 text-xl font-bold">Kurikulum RPL Fundamental</h3>
              <p className="text-gray-600 mt-1">Mulai dari konsep dasar hingga proyek nyata yang siap kerja.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-white">
              <p className="text-sm font-semibold text-indigo-600">Belajar Efektif</p>
              <h3 className="mt-2 text-xl font-bold">Fitur Produktivitas</h3>
              <p className="text-gray-600 mt-1">Tracker, Pomodoro, catatan kode, dan pengingat harian.</p>
            </div>
          </div>
        </section>
        <Courses innerRef={courseRef} />
        <div id="fitur">
          <FeatureTabs />
        </div>
      </main>

      <Footer />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default App;
