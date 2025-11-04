import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

const modules = [
  { id: '01', title: 'Pemrograman Dasar', desc: 'Variabel, tipe data, kontrol alur, dan struktur data.', level: 'Dasar' },
  { id: '02', title: 'Pemrograman Berorientasi Objek', desc: 'Class, objek, inheritance, polymorphism, encapsulation.', level: 'Menengah' },
  { id: '03', title: 'Basis Data & SQL', desc: 'Relasional, normalisasi, query dasar hingga lanjutan.', level: 'Menengah' },
  { id: '04', title: 'Pengembangan Web', desc: 'HTML, CSS, JavaScript, React, dan integrasi API.', level: 'Lanjutan' },
];

const Courses = React.forwardRef(function Courses(_, ref) {
  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-center gap-2 text-indigo-400">
        <BookOpen size={20} />
        <h2 className="text-xl font-semibold">Modul RPL</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {modules.map((m) => (
          <div key={m.id} className="group rounded-xl border border-slate-200/10 bg-white/5 p-5 text-white shadow-sm backdrop-blur transition hover:bg-white/10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-slate-300">{m.level}</span>
              <CheckCircle2 className="opacity-0 transition group-hover:opacity-100 text-emerald-400" size={18} />
            </div>
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{m.desc}</p>
            <button className="mt-4 inline-flex rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400">Lihat Silabus</button>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Courses;
