import React, { useState } from 'react';
import { Book, BookReview } from '../types/book';
import { BookJacket } from './BookJacket';
import { X, BookOpen, Bookmark, Star, MessageSquare, Send, Check, Plus } from 'lucide-react';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  onOpenReader: (book: Book) => void;
  onAddToShelf: (book: Book) => void;
  isSavedOnShelf?: boolean;
  isWantToRead?: boolean;
  onToggleWantToRead?: (bookId: string) => void;
  onAddReview: (bookId: string, review: BookReview) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onOpenReader,
  onAddToShelf,
  isSavedOnShelf = false,
  isWantToRead = false,
  onToggleWantToRead,
  onAddReview,
}) => {
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newRev: BookReview = {
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      rating: userRating,
      date: 'Baru saja',
      comment: userComment.trim(),
    };

    onAddReview(book.id, newRev);
    setUserName('');
    setUserComment('');
    setSubmittedReview(true);
    setTimeout(() => setSubmittedReview(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Surface */}
      <div 
        className="bg-white max-w-4xl w-full rounded-3xl border border-[#E8E1F2] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="p-4 sm:p-5 border-b border-[#E8E1F2] flex items-center justify-between bg-[#F8F5FD]">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#E05A47] uppercase tracking-wider">{book.category}</span>
            <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
            <span className="tabular-nums font-semibold text-[#585170]">Tahun {book.originalYear}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B6280] hover:text-[#1E1B2E] hover:bg-[#EDE4F9] transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-[#F0EBF7]">
          
          {/* Top Section: Jacket + Title + Primary Details */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Book Jacket */}
            <div className="shrink-0">
              <BookJacket book={book} size="lg" />
            </div>

            {/* Info Column */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1.5">
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1E1B2E] leading-tight">
                  {book.title}
                </h1>
                <p className="text-sm font-semibold text-[#585170]">
                  Penulis: <span className="text-[#1E1B2E] font-bold">{book.author}</span>
                  {book.translator && (
                    <span className="text-xs text-[#867B9E] block sm:inline sm:ml-2">
                      (Penerjemah: {book.translator})
                    </span>
                  )}
                </p>
              </div>

              {/* Clean metadata strip */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-xs text-[#585170]">
                <div className="flex items-center gap-1 font-mono bg-[#FFF0ED] text-[#E05A47] px-2.5 py-1 rounded-full font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{book.rating}</span>
                  <span className="text-[#867B9E] font-normal">({book.reviewCount} ulasan)</span>
                </div>
                <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
                <span className="tabular-nums font-semibold">{book.pages} Halaman</span>
                <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
                <span className="tabular-nums font-semibold">~{book.readTimeHours} Jam Baca</span>
                <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
                <span className="font-medium text-[#7C3AED] bg-[#EDE4F9] px-2.5 py-0.5 rounded-full">{book.mood}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                {/* Ingin Membaca / Ditambahkan Toggle Button */}
                <button
                  type="button"
                  onClick={() => onToggleWantToRead?.(book.id)}
                  className={`py-3 px-5 rounded-xl text-sm font-bold border flex items-center gap-2 transition-all cursor-pointer active:scale-95 ${
                    isWantToRead
                      ? 'bg-[#E6F8F0] border-[#A7EBD0] text-[#065F46] shadow-xs hover:bg-[#D1F4E3]'
                      : 'border-[#DDD0F5] bg-[#F8F5FD] hover:bg-[#EDE4F9] text-[#6D28D9] hover:text-[#5B21B6]'
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
                  onClick={() => {
                    onClose();
                    onOpenReader(book);
                  }}
                  className="py-3 px-6 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-[#E05A47]/30 transition-all active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>Baca Cuplikan Interaktif</span>
                </button>

                <button
                  onClick={() => onAddToShelf(book)}
                  className={`py-3 px-5 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all ${
                    isSavedOnShelf
                      ? 'bg-[#E6F8F0] border-[#A7EBD0] text-[#065F46]'
                      : 'border-[#DDD0F5] bg-[#F8F5FD] hover:bg-[#EDE4F9] text-[#6D28D9]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSavedOnShelf ? 'fill-current text-[#059669]' : ''}`} />
                  <span>{isSavedOnShelf ? 'Tersimpan di Rak' : 'Simpan ke Rak Saya'}</span>
                </button>
              </div>

              {/* Tags */}
              <div className="pt-2 flex flex-wrap gap-1.5 justify-center md:justify-start">
                {book.tags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-[#6D28D9] bg-[#EDE4F9] px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Synopsis & Literary Context */}
          <div className="pt-8 space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#1E1B2E]">
                Sinopsis Cerita
              </h2>
              <p className="text-sm text-[#4B445E] leading-relaxed">
                {book.synopsis}
              </p>
            </div>

            <div className="space-y-2 bg-[#F8F5FD] p-5 rounded-2xl border border-[#E8E1F2]">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#E05A47] font-bold">
                Konteks Sastra & Catatan Bacaan
              </h3>
              <p className="text-xs sm:text-sm text-[#585170] leading-relaxed">
                {book.literaryContext}
              </p>
            </div>

            {/* Quote of the book */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2D2147] to-[#1C1431] text-white space-y-2 shadow-md">
              <span className="text-[11px] uppercase tracking-widest font-mono text-[#A7EBD0] font-bold">
                Kutipan Kunci
              </span>
              <p className="font-literary-serif text-lg sm:text-xl italic leading-relaxed text-[#FAF8FC]">
                "{book.keyQuote.text}"
              </p>
              <p className="text-xs text-[#D7CEE8] text-right font-medium">
                — {book.keyQuote.speakerOrContext}
              </p>
            </div>
          </div>

          {/* Section: Community Reviews & User Review Box */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#1E1B2E] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#7C3AED]" />
                <span>Ulasan & Diskusi Siswa</span>
              </h2>
              <span className="text-xs font-mono font-bold text-[#6D28D9] bg-[#EDE4F9] px-2.5 py-1 rounded-full">
                {book.userReviews.length} Ulasan
              </span>
            </div>

            {/* Review List */}
            <div className="space-y-3">
              {book.userReviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl border border-[#E8E1F2] bg-[#FAF8FC] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1E1B2E]">{rev.userName}</span>
                    <div className="flex items-center gap-2 text-[#585170]">
                      <div className="flex text-[#E05A47]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px]">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4B445E] leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleSubmitReview} className="p-6 rounded-2xl border border-[#DDD0F5] bg-[#F8F5FD] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E1B2E]">
                  Tulis Ulasan atau Catatan Kamu
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-[#585170] mr-1">Beri Bintang:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-0.5 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= userRating ? 'text-[#E05A47] fill-[#E05A47]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nama & Kelas..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3.5 py-2.5 bg-white border border-[#DDD0F5] rounded-xl text-xs text-[#1E1B2E] focus:outline-hidden focus:ring-2 focus:ring-[#7C3AED]"
                  required
                />
                <input
                  type="text"
                  placeholder="Kesan membaca, kalimat favorit, atau teori cerita..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  className="sm:col-span-2 px-3.5 py-2.5 bg-white border border-[#DDD0F5] rounded-xl text-xs text-[#1E1B2E] focus:outline-hidden focus:ring-2 focus:ring-[#7C3AED]"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                {submittedReview ? (
                  <span className="text-xs text-[#065F46] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#059669]" /> Ulasan kamu berhasil ditambahkan!
                  </span>
                ) : (
                  <span className="text-[11px] text-[#867B9E]">
                    Ulasan kamu akan langsung tampil dan tersimpan di sesi membaca ini.
                  </span>
                )}

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#E05A47]/20 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Ulasan</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};
