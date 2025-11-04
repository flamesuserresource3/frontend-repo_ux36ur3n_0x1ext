import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';

const modules = [
  {
    id: 'pengantar-rpl',
    title: 'Pengantar Rekayasa Perangkat Lunak',
    duration: '6 jam',
    desc: 'Konsep dasar RPL, SDLC, requirement, dan kualitas perangkat lunak.',
    projects: ['Dokumen Requirement Sederhana', 'Studi Kasus SDLC']
  },
  {
    id: 'algoritma',
    title: 'Algoritma & Struktur Data',
    duration: '10 jam',
    desc: 'Pemrograman dasar, kompleksitas, array, stack, queue, tree, graph.',
    projects: ['Mini Library System', 'Visualizer Sorting']
  },
  {
    id: 'oop',
    title: 'Pemrograman Berorientasi Objek (OOP)',
    duration: '8 jam',
    desc: 'Class, object, inheritance, polymorphism, SOLID principles.',
    projects: ['Aplikasi Rental Sederhana', 'Design Pattern Dasar']
  },
  {
    id: 'web',
    title: 'Pengembangan Web',
    duration: '12 jam',
    desc: 'HTML, CSS, JS, REST API, autentikasi, dan deployment dasar.',
    projects: ['Landing Page Responsif', 'CRUD App']
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning Dasar',
    duration: '10 jam',
    desc: 'Pembelajaran mesin, model dasar, evaluasi, dan etika AI.',
    projects: ['Klasifikasi Dataset Sederhana', 'ML Pipeline Dasar']
  },
  {
    id: 'database',
    title: 'Basis Data',
    duration: '8 jam',
    desc: 'Model data, ERD, SQL/NoSQL, normalisasi, indexing, dan transaksi.',
    projects: ['Desain ERD Proyek', 'Query Optimization']
  }
];

function CourseCard({ m }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600"><BookOpen className="w-6 h-6" /></div>
          <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" /> {m.duration}
        </div>
      </div>
      <p className="mt-3 text-gray-600">{m.desc}</p>
      <div className="mt-4">
        <p className="text-sm font-semibold text-gray-700">Proyek setelah modul:</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          {m.projects.map((p, i) => (
            <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {p}</li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <button className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Mulai Belajar</button>
      </div>
    </div>
  );
}

export default function Courses({ innerRef }) {
  return (
    <section ref={innerRef} className="relative py-16 bg-gradient-to-b from-white to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Modul Kurikulum RPL</h2>
            <p className="text-gray-600 mt-2">Semua materi disusun dari fundamental hingga siap industri.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <CourseCard key={m.id} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
