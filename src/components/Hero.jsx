import { Rocket, Star, GraduationCap } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onOpenAuth, onExplore }) {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7y2m0A5s3mJg6v3K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/70 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Getteng Apps • Kelas Profesional
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Bangun Karier RPL-mu dengan Getteng Apps
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Platform belajar interaktif seperti Cognitive Class, dirancang khusus untuk mahasiswa. Mulai dari fundamental hingga proyek nyata — lengkap dengan sertifikat.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button onClick={onOpenAuth} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition">
              <Rocket className="w-5 h-5" /> Mulai Sekarang
            </button>
            <button onClick={onExplore} className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition">
              Lihat Modul
            </button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <span>Sertifikat penyelesaian</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Kurikulum RPL modern</span>
            </div>
          </div>
        </div>
        <div className="relative bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/60">
          <h3 className="text-xl font-bold text-gray-900">Apa itu Getteng Apps?</h3>
          <p className="mt-2 text-gray-600">
            Getteng Apps adalah platform pembelajaran Rekayasa Perangkat Lunak dengan fitur Study Tracker, Pomodoro, Code Notes Playground, dan Daily Reminder. Belajar lebih fokus, terstruktur, dan siap industri.
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <li className="p-3 rounded-lg bg-indigo-50 text-indigo-700 font-medium">Materi fundamental → advanced</li>
            <li className="p-3 rounded-lg bg-pink-50 text-pink-700 font-medium">Proyek nyata tiap modul</li>
            <li className="p-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium">Tracker & Pomodoro</li>
            <li className="p-3 rounded-lg bg-amber-50 text-amber-700 font-medium">Sertifikat kelulusan</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
