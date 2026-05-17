type Props = {
  onLogin?: () => void;
};

export default function Navbar({ onLogin }: Props) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black text-[#3B2565]">RECI</div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-[#6B3FA0]">MAPA</a>
            <a href="#" className="hover:text-[#6B3FA0]">BLOGS</a>
            <a href="#" className="hover:text-[#6B3FA0]">ESTADÍSTICAS</a>
            <a href="#" className="hover:text-[#6B3FA0]">SOBRE NOSOTROS</a>
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 bg-slate-100 rounded-full font-semibold text-slate-700">100 pts</div>
          <div className="px-4 py-2 bg-[#6B3FA0] text-white rounded-full font-semibold">JUANITA</div>
          {onLogin ? (
            <button
              onClick={onLogin}
              className="hidden md:inline-flex bg-white text-black px-5 py-2 rounded-xl font-medium hover:bg-slate-200"
            >
              Iniciar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}