import React, { useMemo, useState } from 'react';
import { ClipboardList, NotebookPen, Bell, Trash2, Plus } from 'lucide-react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  }, [key, value]);

  return [value, setValue];
}

const FeatureTabs = React.forwardRef(function FeatureTabs(_, ref) {
  const [tab, setTab] = useState('tracker');

  const [progress, setProgress] = useLocalStorage('ga_progress', []);
  const [notes, setNotes] = useLocalStorage('ga_notes', []);
  const [reminders, setReminders] = useLocalStorage('ga_reminders', []);

  const completed = useMemo(() => progress.filter((p) => p.done).length, [progress]);

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-slate-200">
        <button onClick={() => setTab('tracker')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab==='tracker' ? 'bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
          <ClipboardList size={16} /> Study Tracker
        </button>
        <button onClick={() => setTab('notes')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab==='notes' ? 'bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
          <NotebookPen size={16} /> Code Notes
        </button>
        <button onClick={() => setTab('reminders')} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab==='reminders' ? 'bg-indigo-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
          <Bell size={16} /> Reminders
        </button>
      </div>

      {tab === 'tracker' && (
        <div className="rounded-xl border border-slate-200/10 bg-white/5 p-5 text-white">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Progres Belajar</h3>
            <span className="text-sm text-slate-300">Selesai: {completed}/{progress.length}</span>
          </div>
          <Tracker progress={progress} setProgress={setProgress} />
        </div>
      )}

      {tab === 'notes' && (
        <div className="rounded-xl border border-slate-200/10 bg-white/5 p-5 text-white">
          <Notes notes={notes} setNotes={setNotes} />
        </div>
      )}

      {tab === 'reminders' && (
        <div className="rounded-xl border border-slate-200/10 bg-white/5 p-5 text-white">
          <Reminders reminders={reminders} setReminders={setReminders} />
        </div>
      )}
    </section>
  );
});

function Tracker({ progress, setProgress }) {
  const [text, setText] = useState('');
  const add = () => {
    const t = text.trim();
    if (!t) return;
    setProgress([{ id: crypto.randomUUID(), title: t, done: false }, ...progress]);
    setText('');
  };
  const toggle = (id) => setProgress(progress.map((p) => p.id === id ? { ...p, done: !p.done } : p));
  const remove = (id) => setProgress(progress.filter((p) => p.id !== id));

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tambah topik atau modul yang dipelajari"
          className="flex-1 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={add} className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-sm text-white hover:bg-indigo-400">
          <Plus size={16} /> Tambah
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {progress.map((p) => (
          <li key={p.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={p.done} onChange={() => toggle(p.id)} />
              <span className={p.done ? 'line-through text-slate-400' : ''}>{p.title}</span>
            </label>
            <button onClick={() => remove(p.id)} className="text-slate-300 hover:text-red-400" aria-label="hapus">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Notes({ notes, setNotes }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const add = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t || !b) return;
    setNotes([{ id: crypto.randomUUID(), title: t, body: b, createdAt: new Date().toISOString() }, ...notes]);
    setTitle('');
    setBody('');
  };
  const remove = (id) => setNotes(notes.filter((n) => n.id !== id));

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul catatan" className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-1" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Isi catatan / snippet kode" rows={3} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-2" />
      </div>
      <div className="mt-3">
        <button onClick={add} className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400">Simpan Catatan</button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {notes.map((n) => (
          <article key={n.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium text-white">{n.title}</h4>
              <button onClick={() => remove(n.id)} className="text-slate-300 hover:text-red-400" aria-label="hapus">
                <Trash2 size={16} />
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm text-slate-300">{n.body}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(n.createdAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Reminders({ reminders, setReminders }) {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setReminders([{ id: crypto.randomUUID(), text: t, time, done: false }, ...reminders]);
    setText('');
    setTime('');
  };
  const toggle = (id) => setReminders(reminders.map((r) => r.id === id ? { ...r, done: !r.done } : r));
  const remove = (id) => setReminders(reminders.filter((r) => r.id !== id));

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Apa yang ingin diingatkan?" className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-2" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="mt-3">
        <button onClick={add} className="rounded-md bg-indigo-500 px-4 py-2 text-sm text-white hover:bg-indigo-400">Tambah Reminder</button>
      </div>

      <ul className="mt-4 space-y-2">
        {reminders.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={r.done} onChange={() => toggle(r.id)} />
              <span className={r.done ? 'line-through text-slate-400' : ''}>{r.text} {r.time && <em className="text-slate-400">@ {r.time}</em>}</span>
            </label>
            <button onClick={() => remove(r.id)} className="text-slate-300 hover:text-red-400" aria-label="hapus">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeatureTabs;
