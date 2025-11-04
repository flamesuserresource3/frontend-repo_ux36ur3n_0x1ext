export default function Footer() {
  return (
    <footer className="py-12 bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-extrabold text-xl tracking-tight">Getteng Apps</p>
          <p className="text-sm text-gray-600">Platform belajar RPL modern untuk mahasiswa. © {new Date().getFullYear()}</p>
        </div>
        <div className="text-sm text-gray-600">
          Dibuat dengan ❤️ untuk generasi tech-savvy.
        </div>
      </div>
    </footer>
  );
}
