import React from 'react';
import { Bookmark, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  shelfCount: number;
  onOpenShelf: () => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  shelfCount,
  onOpenShelf,
  onOpenQuiz,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8FC]/90 backdrop-blur-md border-b border-[#E8E1F2] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('koleksi');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-display font-extrabold tracking-tight text-[#1E1B2E] hover:text-[#E05A47] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#FB7185] text-white flex items-center justify-center font-display text-sm font-bold shadow-md shadow-[#E05A47]/20">
            PT
          </span>
          <span>PageTurners</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#585170]">
          <button
            onClick={() => {
              setActiveTab('koleksi');
              const el = document.getElementById('koleksi-buku');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hover:text-[#1E1B2E] transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'koleksi'
                ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] font-bold'
                : 'hover:border-b-2 hover:border-[#DDD0F5]'
            }`}
          >
            Koleksi Buku
          </button>
          <button
            onClick={() => {
              setActiveTab('kegiatan');
              const el = document.getElementById('kegiatan-klub');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hover:text-[#1E1B2E] transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'kegiatan'
                ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] font-bold'
                : 'hover:border-b-2 hover:border-[#DDD0F5]'
            }`}
          >
            Kegiatan Klub
          </button>
          <button
            onClick={() => {
              setActiveTab('ruang-baca');
              const el = document.getElementById('ruang-baca-preview');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hover:text-[#1E1B2E] transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'ruang-baca'
                ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] font-bold'
                : 'hover:border-b-2 hover:border-[#DDD0F5]'
            }`}
          >
            Ruang Baca
          </button>
          <button
            onClick={() => {
              setActiveTab('kutipan');
              const el = document.getElementById('kutipan-jiwa');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hover:text-[#1E1B2E] transition-colors whitespace-nowrap shrink-0 pb-1 ${
              activeTab === 'kutipan'
                ? 'text-[#7C3AED] border-b-2 border-[#7C3AED] font-bold'
                : 'hover:border-b-2 hover:border-[#DDD0F5]'
            }`}
          >
            Kutipan Jiwa
          </button>
          <button
            onClick={onOpenQuiz}
            className="hover:text-[#E05A47] transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 text-[#059669] font-medium"
          >
            <Sparkles className="w-4 h-4 text-[#059669]" />
            <span>Kuis Rekomendasi</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenShelf}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] active:scale-[0.98] rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md shadow-[#E05A47]/25"
            aria-label="Buka Rak Buku Saya"
          >
            <Bookmark className="w-4 h-4 text-white" />
            <span>Rak Saya</span>
            {shelfCount > 0 && (
              <span className="ml-1 px-2 py-0.5 font-mono text-xs font-bold bg-white text-[#E05A47] rounded-md shadow-2xs">
                {shelfCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
