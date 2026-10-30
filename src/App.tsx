import React, { useState, useEffect } from 'react';
import { Book, BookCategory, BookReview, ReadingMood, ShelfItem } from './types/book';
import { BOOKS_DATA } from './data/booksData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookCard } from './components/BookCard';
import { BookDetailModal } from './components/BookDetailModal';
import { ImmersiveReaderModal } from './components/ImmersiveReaderModal';
import { PersonalShelf } from './components/PersonalShelf';
import { BookQuizModal } from './components/BookQuizModal';
import { QuoteStudio } from './components/QuoteStudio';
import { ClubActivities } from './components/ClubActivities';
import { Footer } from './components/Footer';
import {
  BookOpen,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Volume2,
  Check,
  Search,
  BookMarked,
} from 'lucide-react';

const CATEGORIES: BookCategory[] = [
  'Semua',
  'Fiksi & Petualangan',
  'Inspirasi & Remaja',
  'Pengembangan Diri',
  'Misteri & Sains',
  'Sastra Populer',
  'Puisi & Seni',
];

const INITIAL_SHELF: ShelfItem[] = [
  {
    bookId: 'bumi-tere-liye',
    status: 'reading',
    currentPage: 142,
    totalPages: 440,
    startedDate: '12 Okt 2026',
    personalNotes: 'Karakter Ali si jenius super kocak, ceritanya seru banget!',
  },
  {
    bookId: 'negeri-5-menara',
    status: 'want_to_read',
    currentPage: 0,
    totalPages: 423,
  },
  {
    bookId: 'filosofi-teras',
    status: 'finished',
    currentPage: 320,
    totalPages: 320,
    finishedDate: '1 Okt 2026',
    personalRating: 5,
  },
];

export default function App() {
  const [books, setBooks] = useState<Book[]>(BOOKS_DATA);
  const [shelfItems, setShelfItems] = useState<ShelfItem[]>(() => {
    try {
      const saved = localStorage.getItem('pustaka_nusa_shelf');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_SHELF;
  });

  const [activeTab, setActiveTab] = useState('koleksi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Semua');
  const [selectedMood, setSelectedMood] = useState<ReadingMood>('Semua Mood');
  const [sortBy, setSortBy] = useState<'rating' | 'popular' | 'year' | 'pages'>('rating');

  // Individual "Ingin Membaca" state map for each book
  const [wantToReadMap, setWantToReadMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('pageturners_want_to_read');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // Modals state
  const [readerBook, setReaderBook] = useState<Book | null>(null);
  const [detailBook, setDetailBook] = useState<Book | null>(null);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync wantToReadMap to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pageturners_want_to_read', JSON.stringify(wantToReadMap));
    } catch {
      // Storage unavailable
    }
  }, [wantToReadMap]);

  // Sync shelf to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pustaka_nusa_shelf', JSON.stringify(shelfItems));
    } catch {
      // Storage unavailable
    }
  }, [shelfItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleWantToRead = (bookId: string) => {
    setWantToReadMap((prev) => {
      const isCurrentlyAdded = !!prev[bookId];
      const nextState = !isCurrentlyAdded;
      const targetBook = books.find((b) => b.id === bookId);
      if (targetBook) {
        if (nextState) {
          showToast(`"${targetBook.title}" ditambahkan ke daftar Ingin Membaca!`);
        } else {
          showToast(`Pilihan "${targetBook.title}" dibatalkan dari daftar Ingin Membaca.`);
        }
      }
      return {
        ...prev,
        [bookId]: nextState,
      };
    });
  };

  const handleAddToShelf = (book: Book) => {
    const existing = shelfItems.find((item) => item.bookId === book.id);
    if (existing) {
      showToast(`"${book.title}" sudah ada di rak Anda.`);
      setIsShelfOpen(true);
      return;
    }

    const newItem: ShelfItem = {
      bookId: book.id,
      status: 'reading',
      currentPage: 0,
      totalPages: book.pages,
      startedDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    setShelfItems([newItem, ...shelfItems]);
    showToast(`"${book.title}" berhasil ditambahkan ke rak bacaan!`);
  };

  const handleUpdateShelfItem = (updated: ShelfItem) => {
    setShelfItems(shelfItems.map((item) => (item.bookId === updated.bookId ? updated : item)));
  };

  const handleRemoveFromShelf = (bookId: string) => {
    setShelfItems(shelfItems.filter((item) => item.bookId !== bookId));
    showToast('Buku dihapus dari rak.');
  };

  const handleAddCustomBook = (customItem: ShelfItem) => {
    setShelfItems([customItem, ...shelfItems]);
    showToast('Buku kustom berhasil ditambahkan ke rak!');
  };

  const handleAddReview = (bookId: string, review: BookReview) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id === bookId) {
          return {
            ...b,
            userReviews: [review, ...b.userReviews],
            reviewCount: b.reviewCount + 1,
          };
        }
        return b;
      })
    );
    showToast('Terima kasih! Ulasan Anda telah diterbitkan.');
  };

  // Filter and sort books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;

    const matchesMood =
      selectedMood === 'Semua Mood' || book.mood === selectedMood;

    return matchesSearch && matchesCategory && matchesMood;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
    if (sortBy === 'year') return b.originalYear - a.originalYear;
    if (sortBy === 'pages') return a.pages - b.pages;
    return 0;
  });

  const featuredBook = books[0]; // Bumi Manusia

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E232A]">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241F1A] text-[#FAF7F2] px-4 py-3 rounded-xl shadow-lg border border-[#4A4036] flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shelfCount={shelfItems.length}
        onOpenShelf={() => setIsShelfOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        featuredBook={featuredBook}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        onOpenReader={(b) => setReaderBook(b)}
        onOpenDetails={(b) => setDetailBook(b)}
        onAddToShelf={handleAddToShelf}
        onOpenQuiz={() => setIsQuizOpen(true)}
        isWantToRead={!!wantToReadMap[featuredBook.id]}
        onToggleWantToRead={handleToggleWantToRead}
      />

      {/* Main Book Catalog Section */}
      <section id="koleksi-buku" className="py-20 md:py-28 border-b border-[#E8E1F2]">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          {/* Section Heading & Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E8E1F2]">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-mono text-[#E05A47] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Koleksi Rekomendasi PageTurners</span>
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1E1B2E]">
                Buku Favorit Pilihan Siswa SMA
              </h2>
              <p className="text-sm sm:text-base text-[#4B445E]">
                Temukan novel petualangan seru, motivasi belajar, dan cerita inspiratif yang pas banget buat menemani masa SMA-mu. ({sortedBooks.length} buku tersedia)
              </p>
            </div>

            {/* Category Filter Tabs (Interactive pastel buttons) */}
            <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#EDE4F9] rounded-2xl self-start lg:self-auto border border-[#DDD0F5]">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#7C3AED] text-white shadow-sm font-bold'
                        : 'text-[#6D28D9] hover:text-[#1E1B2E] hover:bg-white/50'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Controls: Active Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-2 text-[#585170]">
              {(searchQuery || selectedCategory !== 'Semua' || selectedMood !== 'Semua Mood') && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1E1B2E]">Filter aktif:</span>
                  {selectedCategory !== 'Semua' && (
                    <span className="bg-[#EDE4F9] text-[#5B21B6] border border-[#DDD0F5] px-3 py-1 rounded-full font-medium">
                      Kategori: {selectedCategory}
                    </span>
                  )}
                  {selectedMood !== 'Semua Mood' && (
                    <span className="bg-[#E6F8F0] text-[#065F46] border border-[#A7EBD0] px-3 py-1 rounded-full font-medium">
                      Suasana: {selectedMood}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-[#FFF0ED] text-[#E05A47] border border-[#FECAC0] px-3 py-1 rounded-full font-medium">
                      Pencarian: "{searchQuery}"
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                      setSelectedMood('Semua Mood');
                    }}
                    className="text-[#E05A47] hover:underline font-bold ml-1.5"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2.5 ml-auto">
              <span className="text-[#585170] font-semibold">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'popular' | 'year' | 'pages')}
                className="bg-white border border-[#DDD0F5] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1E1B2E] focus:outline-hidden focus:ring-2 focus:ring-[#7C3AED]"
              >
                <option value="rating">Rating Tertinggi</option>
                <option value="popular">Paling Banyak Diulas</option>
                <option value="year">Tahun Terbit</option>
                <option value="pages">Ketebalan Buku</option>
              </select>
            </div>
          </div>

          {/* Book Cards Grid */}
          {sortedBooks.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#E8E1F2] p-8 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#EDE4F9] text-[#7C3AED] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1E1B2E]">
                Tidak ada buku yang sesuai dengan pencarian
              </h3>
              <p className="text-sm text-[#585170] max-w-md mx-auto">
                Coba gunakan kata kunci lain atau bersihkan filter suasana hati untuk menjelajahi kembali koleksi PageTurners.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setSelectedMood('Semua Mood');
                }}
                className="py-3 px-6 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Tampilkan Semua Koleksi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedBooks.map((book) => {
                const isSaved = shelfItems.some((item) => item.bookId === book.id);
                const isWantToRead = !!wantToReadMap[book.id];
                return (
                  <BookCard
                    key={book.id}
                    book={book}
                    onOpenReader={(b) => setReaderBook(b)}
                    onOpenDetails={(b) => setDetailBook(b)}
                    onAddToShelf={handleAddToShelf}
                    isSavedOnShelf={isSaved}
                    isWantToRead={isWantToRead}
                    onToggleWantToRead={handleToggleWantToRead}
                  />
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Informasi Kegiatan Klub Membaca Siswa SMA */}
      <ClubActivities
        onJoinSuccess={(memberName) =>
          showToast(`Selamat datang di PageTurners, ${memberName}! Kartu anggotamu telah aktif.`)
        }
      />

      {/* Immersive Reading Preview Showcase Section */}
      <section id="ruang-baca-preview" className="py-20 md:py-28 bg-gradient-to-br from-[#E6F8F0] via-[#FAF8FC] to-[#F3EEFA] border-b border-[#E8E1F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#2D2147] via-[#241A3E] to-[#1C1431] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl">
            
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-widest font-mono text-[#A7EBD0] font-bold flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#059669]" />
                <span>Ruang Baca Santai Siswa</span>
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight text-balance">
                Membaca Tenang Ditemani Suara Hujan & Kafe
              </h2>

              <p className="text-sm text-[#D7CEE8] leading-relaxed">
                Butuh jeda dari tumpukan tugas dan PR sekolah? Buka cuplikan novel favoritmu di sini dengan tampilan kertas klasik yang ramah di mata, plus audio rintik hujan atau perapian sintetis yang menenangkan.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setReaderBook(books[0])} // Bumi (Tere Liye)
                  className="py-3 px-6 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#E05A47]/30 active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Coba Baca: Bumi (Tere Liye)</span>
                </button>
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="py-3 px-5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-[#A7EBD0]" />
                  <span>Kuis Jodoh Buku</span>
                </button>
              </div>
            </div>

            {/* Visual Preview Graphic */}
            <div className="w-full lg:w-auto p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-6">
              <div className="space-y-3 text-xs">
                <div className="font-display text-base font-bold text-white">Fitur Ruang Baca Siswa:</div>
                <div className="space-y-2 text-[#D7CEE8]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A7EBD0]" />
                    <span>4 Palet Kertas: Alami, Sepia, Putih, Malam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FB7185]" />
                    <span>Audio Ambience: Hujan, Api, Perpustakaan, Kafe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DDD0F5]" />
                    <span>Penanda Paragraf & Salin Kutipan Cepat</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Literary Quotes Studio Section */}
      <QuoteStudio />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {readerBook && (
        <ImmersiveReaderModal
          book={readerBook}
          onClose={() => setReaderBook(null)}
          onAddToShelf={handleAddToShelf}
          isSavedOnShelf={shelfItems.some((i) => i.bookId === readerBook.id)}
        />
      )}

      {detailBook && (
        <BookDetailModal
          book={detailBook}
          onClose={() => setDetailBook(null)}
          onOpenReader={(b) => setReaderBook(b)}
          onAddToShelf={handleAddToShelf}
          isSavedOnShelf={shelfItems.some((i) => i.bookId === detailBook.id)}
          isWantToRead={!!wantToReadMap[detailBook.id]}
          onToggleWantToRead={handleToggleWantToRead}
          onAddReview={handleAddReview}
        />
      )}

      <PersonalShelf
        isOpen={isShelfOpen}
        onClose={() => setIsShelfOpen(false)}
        shelfItems={shelfItems}
        allBooks={books}
        onUpdateShelfItem={handleUpdateShelfItem}
        onRemoveFromShelf={handleRemoveFromShelf}
        onOpenReader={(b) => {
          setIsShelfOpen(false);
          setReaderBook(b);
        }}
        onOpenDetails={(b) => {
          setIsShelfOpen(false);
          setDetailBook(b);
        }}
        onAddCustomBook={handleAddCustomBook}
      />

      <BookQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        allBooks={books}
        onOpenReader={(b) => setReaderBook(b)}
        onAddToShelf={handleAddToShelf}
      />

    </div>
  );
}
