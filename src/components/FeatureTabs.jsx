import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckSquare, Clock, Code, Bell, Pause, Play, RotateCcw, Copy, Download } from 'lucide-react';

// Utilities
const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
};

function StudyTracker() {
  const items = [
    'Pengantar RPL', 'Algoritma', 'OOP', 'Web', 'AI', 'Database'
  ];
  const [done, setDone] = useLocalStorage('getteng-tracker', {});
  const progress = useMemo(() => Math.round((Object.values(done).filter(Boolean).length / items.length) * 100), [done]);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-900">Study Tracker</h4>
        <span className="text-sm text-gray-600">{progress}% selesai</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border">
            <span className="text-gray-800">{it}</span>
            <button onClick={() => setDone((d) => ({ ...d, [it]: !d[it] }))} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border ${done[it] ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
              <CheckSquare className="w-4 h-4" /> {done[it] ? 'Selesai' : 'Tandai'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pomodoro() {
  const [seconds, setSeconds] = useLocalStorage('getteng-pomodoro', 25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, setSeconds]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="text-center">
      <div className="text-6xl font-extrabold tracking-tight text-gray-900">{mm}:{ss}</div>
      <p className="text-gray-600 mt-2">Fokus 25 menit, istirahat 5 menit.</p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button onClick={() => setRunning((r) => !r)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold ${running ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {running ? 'Pause' : 'Mulai'}
        </button>
        <button onClick={() => setSeconds(25 * 60)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
}

function CodeNotes() {
  const [code, setCode] = useLocalStorage('getteng-code-notes', '// Tulis catatan kode di sini\nfunction hello(){\n  return "Halo Getteng!"\n}\n');
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); } catch {}
  };
  const download = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'notes.js'; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-900">Code Notes Playground</h4>
        <div className="flex items-center gap-2">
          <button onClick={copy} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium text-sm"><Copy className="w-4 h-4" /> Salin</button>
          <button onClick={download} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm"><Download className="w-4 h-4" /> Unduh</button>
        </div>
      </div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-56 p-4 font-mono text-sm bg-gray-900 text-emerald-300 rounded-xl outline-none border border-gray-800" />
    </div>
  );
}

function DailyReminder() {
  const [reminders, setReminders] = useLocalStorage('getteng-reminders', []);
  const [text, setText] = useState('Belajar 30 menit');
  const [time, setTime] = useState('18:00');

  const addReminder = () => {
    if (!text || !time) return;
    setReminders((r) => [...r, { id: Date.now(), text, time }]);
    setText('');
  };

  return (
    <div>
      <h4 className="font-bold text-gray-900 mb-3">Daily Reminder</h4>
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Apa yang ingin diingatkan?" className="flex-1 px-3 py-2 rounded-lg border" />
        <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="px-3 py-2 rounded-lg border w-36" />
        <button onClick={addReminder} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Tambah</button>
      </div>
      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r.id} className="flex items-center justify-between p-3 bg-white rounded-xl border">
            <span className="text-gray-800">{r.text} • {r.time}</span>
            <button onClick={() => setReminders((list) => list.filter((x) => x.id !== r.id))} className="text-sm text-red-600 hover:underline">Hapus</button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Bell className="w-3 h-3" /> Notifikasi lokal akan ditambahkan pada versi berikutnya.</p>
    </div>
  );
}

export default function FeatureTabs() {
  const tabs = [
    { key: 'tracker', label: 'Study Tracker', icon: CheckSquare, node: <StudyTracker /> },
    { key: 'pomodoro', label: 'Pomodoro', icon: Clock, node: <Pomodoro /> },
    { key: 'notes', label: 'Code Notes', icon: Code, node: <CodeNotes /> },
    { key: 'reminder', label: 'Daily Reminder', icon: Bell, node: <DailyReminder /> },
  ];
  const [active, setActive] = useState(tabs[0].key);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Alat Belajar Terintegrasi</h2>
            <p className="text-gray-600 mt-2">Tetap fokus, teratur, dan produktif saat belajar.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActive(t.key)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold ${active === t.key ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-6 border shadow-sm">
            {tabs.find((t) => t.key === active)?.node}
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 p-6 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Belajar yang Konsisten = Hasil Maksimal</h3>
            <p className="text-white/90">Gabungkan tracker, pomodoro, catatan kode, dan pengingat harian untuk menciptakan kebiasaan belajar yang berkelanjutan.</p>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li>• Rencanakan target mingguan</li>
              <li>• Sesi fokus 25 menit</li>
              <li>• Catat ide dan snippet penting</li>
              <li>• Ingatkan diri sendiri setiap hari</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
