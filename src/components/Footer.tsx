import React from 'react';
import { ArrowUp, BookOpen, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241F1A] text-[#FAF7F2] border-t border-[#3D352E]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#9A3412] text-white flex items-center justify-center font-serif-title text-base font-bold">
                PT
              </span>
              <span className="text-xl font-serif-title font-bold tracking-tight text-[#FAF7F2]">
                PageTurners SMA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#C4B7A6] leading-relaxed max-w-sm">
              Klub membaca santai dan inspiratif siswa SMA. Ruang bagi siapa pun yang ingin menemukan buku favorit, bertukar wawasan, dan membangun kebiasaan membaca tanpa tekanan.
            </p>
            <div className="text-xs text-[#9C8F82] font-mono">
              "Find Your Next Favorite Book · Turn the Page, Change Your World."
            </div>
          </div>

          {/* Nav Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              Navigasi Klub
            </div>
            <ul className="space-y-2 text-xs text-[#C4B7A6]">
              <li>
                <a href="#koleksi-buku" className="hover:text-white transition-colors">
                  Koleksi Buku Favorit
                </a>
              </li>
              <li>
                <a href="#kegiatan-klub" className="hover:text-white transition-colors">
                  Kegiatan & Jadwal Klub
                </a>
              </li>
              <li>
                <a href="#ruang-baca-preview" className="hover:text-white transition-colors">
                  Ruang Baca Imersif
                </a>
              </li>
              <li>
                <a href="#kutipan-jiwa" className="hover:text-white transition-colors">
                  Kutipan Menggugah
                </a>
              </li>
            </ul>
          </div>

          {/* Literary Principles & Note (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-mono text-[#D4AF37] font-semibold">
              Komunitas Pelajar
            </div>
            <p className="text-xs text-[#C4B7A6] leading-relaxed">
              Klub terbuka untuk seluruh siswa SMA tanpa batasan jurusan. Diadakan secara rutin setiap Jumat sore di perpustakaan sekolah dengan pendamping guru literasi.
            </p>
            <div className="pt-2 text-xs text-[#9C8F82]">
              Didukung fitur audio rintik hujan dan perapian sintetis untuk sesi silent reading.
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9C8F82]">
          <div>
            © {new Date().getFullYear()} PageTurners — Klub Membaca Siswa SMA.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
