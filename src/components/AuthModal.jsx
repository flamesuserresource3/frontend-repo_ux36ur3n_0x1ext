import { useState } from 'react';
import { X, Mail, Lock } from 'lucide-react';

export default function AuthModal({ open, onClose }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    alert(`${mode === 'login' ? 'Login' : 'Daftar'} berhasil (demo UI)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Masuk ke Getteng Apps' : 'Buat Akun Getteng'}
          </h3>
          <p className="text-gray-600 mt-1">Akses modul RPL, proyek, dan sertifikat.</p>
          <form onSubmit={submit} className="mt-5 space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border">
              <Mail className="w-4 h-4 text-gray-500" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email kampus" className="flex-1 outline-none" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border">
              <Lock className="w-4 h-4 text-gray-500" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Kata sandi" className="flex-1 outline-none" />
            </div>
            <button type="submit" className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">{mode === 'login' ? 'Masuk' : 'Daftar'}</button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-600">
            {mode === 'login' ? (
              <span>
                Belum punya akun?{' '}
                <button onClick={() => setMode('signup')} className="text-indigo-600 font-semibold hover:underline">Daftar</button>
              </span>
            ) : (
              <span>
                Sudah punya akun?{' '}
                <button onClick={() => setMode('login')} className="text-indigo-600 font-semibold hover:underline">Masuk</button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
