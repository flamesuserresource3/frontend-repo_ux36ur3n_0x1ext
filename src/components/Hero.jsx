import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Star, Clock } from 'lucide-react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/2m8e6m0pQ0m9j3kF/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Safe area content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-24 pb-20 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />

        <h1 className="relative text-4xl font-bold leading-tight sm:text-6xl">
          Getteng Apps
        </h1>
        <p className="relative mt-4 max-w-2xl text-slate-300">
          Platform pembelajaran RPL dengan modul terstruktur dan alat produktivitas terintegrasi.
        </p>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('courses')}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
          >
            <Rocket size={18} /> Mulai Belajar
          </button>
          <button
            onClick={() => onNavigate('tools')}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-white backdrop-blur transition hover:bg-white/10"
          >
            <Clock size={18} /> Produktivitas
          </button>
        </div>

        <div className="relative mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: <Star className="text-yellow-400" size={18} />, label: 'Modul Kurikulum RPL' },
            { icon: <Clock className="text-cyan-400" size={18} />, label: 'Tracker Progres' },
            { icon: <Rocket className="text-pink-400" size={18} />, label: 'Catatan & Pengingat' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 backdrop-blur"
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
