import React from 'react';
import { Book, ReadingMood } from '../types/book';
import { BookJacket } from './BookJacket';
import { Search, BookOpen, Bookmark, Sparkles, Volume2, ArrowRight, CheckCircle2, Check, Plus } from 'lucide-react';

interface HeroProps {
  featuredBook: Book;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedMood: ReadingMood;
  setSelectedMood: (m: ReadingMood) => void;
  onOpenReader: (book: Book) => void;
  onOpenDetails: (book: Book) => void;
  onAddToShelf: (book: Book) => void;
  onOpenQuiz: () => void;
  isWantToRead?: boolean;
  onToggleWantToRead?: (bookId: string) => void;
}

const MOOD_OPTIONS: ReadingMood[] = [
  'Semua Mood',
  'Reflektif & Filosofis',
  'Emosional & Menghanyutkan',
  'Menenangkan & Hangat',
  'Menggugah Aksi & Pikiran',
];

export const Hero: React.FC<HeroProps> = ({
  featuredBook,
  searchQuery,
  setSearchQuery,
  selectedMood,
  setSelectedMood,
  onOpenReader,
  onOpenDetails,
  onAddToShelf,
  onOpenQuiz,
  isWantToRead = false,
  onToggleWantToRead,
}) => {
  return (
    <section className="relative pt-16 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-[#E8E1F2]">
      {/* Pastel background with soft lavender, mint, and coral ambient radial glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F3EEFA] via-[#FAF8FC] to-[#FAF8FC] -z-10" />
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#EDE4F9] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#E6F8F0] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-[#FFF0ED] rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Literary Mission & Discovery (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4F9] border border-[#DDD0F5] text-xs font-semibold text-[#6D28D9]">
                <Sparkles className="w-3.5 h-3.5 text-[#E05A47]" />
                <span className="tracking-wide">Klub Membaca Siswa SMA — PageTurners</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#1E1B2E] tracking-tight leading-[1.12] text-balance">
                Find Your Next <span className="text-[#E05A47]">Favorite Book</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4B445E] font-sans-body leading-relaxed max-w-2xl">
                Selamat datang di <strong className="text-[#1E1B2E] font-bold">PageTurners</strong>! Ruang seru bagi siswa SMA untuk menjelajahi cerita-cerita hebat, melepas penat sekolah lewat bacaan berkualitas, dan bertukar ide seru bersama teman-teman. Temukan buku favoritmu hari ini dan gabung dalam diskusi asyik klub membaca kami!
              </p>

              {/* Prominent, Clearly Visible Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href="#kegiatan-klub"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#E05A47]/30 active:scale-95 transition-all"
                >
                  <span>Gabung Klub Membaca</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#koleksi-buku"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#E6F8F0] hover:bg-[#D1F4E3] border border-[#A7EBD0] text-[#065F46] rounded-2xl text-sm font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#059669]" />
                  <span>Jelajahi Rekomendasi Buku</span>
                </a>
              </div>
            </div>

            {/* Search Input Bar with Pastel Border & Focus Ring */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#867B9E]" />
              <input
                type="text"
                placeholder="Cari judul buku, penulis (Tere Liye, Leila, James Clear), atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#DDD0F5] rounded-2xl text-sm text-[#1E1B2E] placeholder-[#9E95B3] shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#6D28D9] hover:text-[#1E1B2E] px-2 py-1 rounded-lg bg-[#EDE4F9]"
                >
                  Hapus
                </button>
              )}
            </div>

            {/* Reading Mood Quick Selectors (Segmented Pastel Buttons) */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#585170]">
                  Pilih Suasana Hati Membaca:
                </span>
                <button
                  onClick={onOpenQuiz}
                  className="text-xs font-semibold text-[#E05A47] hover:underline flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E05A47]" />
                  <span>Bingung mau baca apa? Ikuti Kuis</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map((mood) => {
                  const isActive = selectedMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => {
                        setSelectedMood(mood);
                        const el = document.getElementById('koleksi-buku');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#7C3AED] text-white font-semibold shadow-xs'
                          : 'bg-white hover:bg-[#F3EEFA] text-[#585170] border border-[#E8E1F2]'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Markers / Proof Points with Mint & Lavender accents */}
            <div className="pt-4 border-t border-[#E8E1F2] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#585170]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span className="font-bold text-[#1E1B2E] text-sm tabular-nums">120+</span>
                <span>Siswa SMA Bergabung</span>
              </div>
              <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span className="font-bold text-[#1E1B2E] text-sm">Tiap Jumat</span>
                <span>Sesi Diskusi Santai</span>
              </div>
              <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span className="font-bold text-[#1E1B2E] text-sm">Gratis</span>
                <span>Cuplikan & Audio Hujan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Spotlight Card with Rounded-3xl */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1F2] shadow-lg shadow-[#DDD0F5]/40 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBF7]">
                <div className="flex items-center gap-2 text-xs text-[#585170]">
                  <span className="font-bold uppercase tracking-wider text-[#E05A47]">
                    Buku Pilihan Klub Bulan Ini
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Baca Bareng SMA</span>
                </div>
                <div className="text-xs text-[#585170] flex items-center gap-1 font-mono bg-[#FFF0ED] text-[#E05A47] px-2 py-0.5 rounded-full font-bold">
                  <span>★</span>
                  <span>{featuredBook.rating}</span>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* 3D Perspective Book Jacket */}
                <div 
                  className="cursor-pointer transition-transform hover:-translate-y-1.5 hover:rotate-1"
                  onClick={() => onOpenDetails(featuredBook)}
                >
                  <BookJacket book={featuredBook} size="md" />
                </div>

                {/* Spotlight Metadata & Actions */}
                <div className="space-y-3.5 text-center sm:text-left flex-1">
                  <div className="text-xs text-[#6D28D9] font-medium space-x-1 bg-[#EDE4F9] inline-block px-2.5 py-1 rounded-lg">
                    <span>{featuredBook.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{featuredBook.pages} Hal</span>
                  </div>

                  <h2 
                    onClick={() => onOpenDetails(featuredBook)}
                    className="font-display text-2xl font-bold text-[#1E1B2E] hover:text-[#7C3AED] cursor-pointer transition-colors leading-tight"
                  >
                    {featuredBook.title}
                  </h2>

                  <p className="text-xs font-semibold text-[#585170]">
                    Karya <span className="text-[#1E1B2E] font-bold">{featuredBook.author}</span>
                  </p>

                  <p className="text-xs text-[#585170] line-clamp-3 leading-relaxed">
                    "{featuredBook.keyQuote.text}"
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    {/* Ingin Membaca / Ditambahkan Button for Spotlight Book */}
                    <button
                      type="button"
                      onClick={() => onToggleWantToRead?.(featuredBook.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 ${
                        isWantToRead
                          ? 'bg-[#E6F8F0] border border-[#A7EBD0] text-[#065F46] shadow-xs hover:bg-[#D1F4E3]'
                          : 'bg-[#F3EEFA] hover:bg-[#EDE4F9] border border-[#DDD0F5] text-[#6D28D9] hover:text-[#5B21B6]'
                      }`}
                      aria-pressed={isWantToRead}
                      title={isWantToRead ? 'Klik untuk membatalkan pilihan' : 'Klik untuk menandai ingin membaca'}
                    >
                      {isWantToRead ? (
                        <>
                          <Check className="w-4 h-4 text-[#059669]" />
                          <span>Ditambahkan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-[#7C3AED]" />
                          <span>Ingin Membaca</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenReader(featuredBook)}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#E05A47]/20 active:scale-95 transition-all"
                    >
                      <BookOpen className="w-4 h-4 text-white" />
                      <span>Baca Cuplikan Sekarang</span>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onAddToShelf(featuredBook)}
                        className="py-2.5 px-3 bg-[#E6F8F0] hover:bg-[#D1F4E3] border border-[#A7EBD0] text-[#065F46] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Simpan ke Rak</span>
                      </button>
                      <button
                        onClick={() => onOpenDetails(featuredBook)}
                        className="py-2.5 px-3 bg-[#F3EEFA] hover:bg-[#EDE4F9] border border-[#DDD0F5] text-[#6D28D9] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Sinopsis Lengkap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
