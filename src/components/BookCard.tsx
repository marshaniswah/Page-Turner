import React, { useState } from 'react';
import { Book } from '../types/book';
import { BookJacket } from './BookJacket';
import { BookOpen, Bookmark, Star, ArrowUpRight, Check, Plus } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onOpenReader: (book: Book) => void;
  onOpenDetails: (book: Book) => void;
  onAddToShelf: (book: Book) => void;
  isSavedOnShelf?: boolean;
  isWantToRead?: boolean;
  onToggleWantToRead?: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onOpenReader,
  onOpenDetails,
  onAddToShelf,
  isSavedOnShelf = false,
  isWantToRead = false,
  onToggleWantToRead,
}) => {
  const [internalWantToRead, setInternalWantToRead] = useState(false);
  const isSelected = onToggleWantToRead !== undefined ? isWantToRead : internalWantToRead;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWantToRead) {
      onToggleWantToRead(book.id);
    } else {
      setInternalWantToRead((prev) => !prev);
    }
  };
  return (
    <article className="group bg-white rounded-3xl border border-[#E8E1F2] p-5 sm:p-6 flex flex-col justify-between hover:border-[#C4B5FD] hover:shadow-xl hover:shadow-[#DDD0F5]/30 transition-all duration-300">
      
      {/* Top Section: Visual Book Jacket & Quick Actions */}
      <div>
        <div 
          onClick={() => onOpenDetails(book)}
          className="cursor-pointer bg-gradient-to-br from-[#F5F0FB] via-[#FAF8FC] to-[#EDFAF3] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden transition-all group-hover:from-[#EDE4F9] group-hover:to-[#D1F4E3]"
        >
          <div className="transform group-hover:-translate-y-2 group-hover:rotate-1 transition-transform duration-300">
            <BookJacket book={book} size="md" />
          </div>

          {/* Quick Overlay Action on Hover */}
          <div className="absolute inset-0 bg-[#1E1B2E]/30 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenReader(book);
              }}
              className="py-2.5 px-4 bg-white text-[#1E1B2E] rounded-xl text-xs font-bold shadow-lg hover:bg-[#FAF8FC] active:scale-95 transition-all flex items-center gap-2"
              aria-label={`Baca cuplikan ${book.title}`}
            >
              <BookOpen className="w-4 h-4 text-[#E05A47]" />
              <span>Baca Cuplikan</span>
            </button>
          </div>
        </div>

        {/* Card Body: Clean typography with distinct visual hierarchy */}
        <div className="pt-5 space-y-2.5">
          
          {/* Metadata line with typographic separators */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="font-semibold text-[#6D28D9] truncate">{book.category}</span>
              <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
              <span className="font-mono text-[#867B9E] tabular-nums">{book.originalYear}</span>
            </div>
            <div className="flex items-center gap-1 font-mono bg-[#FFF0ED] text-[#E05A47] px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{book.rating}</span>
            </div>
          </div>

          {/* Title in legible Outfit font */}
          <h3 
            onClick={() => onOpenDetails(book)}
            className="font-display text-xl font-bold text-[#1E1B2E] group-hover:text-[#7C3AED] cursor-pointer transition-colors line-clamp-1 leading-snug"
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs text-[#585170] font-semibold">
            {book.author}
          </p>

          {/* Brief synopsis teaser */}
          <p className="text-xs text-[#6B6280] line-clamp-2 leading-relaxed pt-0.5">
            {book.synopsis}
          </p>

          {/* Reading Time & Page count */}
          <div className="text-[11px] text-[#867B9E] pt-1 flex items-center gap-2">
            <span className="tabular-nums font-medium">{book.pages} halaman</span>
            <span aria-hidden="true" className="text-[#DDD0F5]">·</span>
            <span className="tabular-nums font-medium">Estimasi {book.readTimeHours} jam baca</span>
          </div>

          {/* Tombol Ingin Membaca / Ditambahkan */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handleToggle}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? 'bg-[#E6F8F0] border border-[#A7EBD0] text-[#065F46] shadow-xs hover:bg-[#D1F4E3]'
                  : 'bg-[#F3EEFA] hover:bg-[#EDE4F9] border border-[#DDD0F5] text-[#6D28D9] hover:text-[#5B21B6]'
              }`}
              aria-pressed={isSelected}
              title={isSelected ? 'Klik untuk membatalkan pilihan' : 'Klik untuk menandai ingin membaca'}
            >
              {isSelected ? (
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
          </div>
        </div>
      </div>

      {/* Card Footer: Stable, High-Contrast Action Buttons */}
      <div className="pt-4 mt-4 border-t border-[#F0EBF7] flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(book)}
          className="text-xs font-semibold text-[#6D28D9] hover:text-[#5B21B6] flex items-center gap-1 transition-colors"
        >
          <span>Detail Buku</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {/* Mint Bookmark Button */}
          <button
            onClick={() => onAddToShelf(book)}
            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center ${
              isSavedOnShelf
                ? 'bg-[#E6F8F0] border-[#A7EBD0] text-[#065F46]'
                : 'border-[#E8E1F2] hover:bg-[#F3EEFA] text-[#6B6280]'
            }`}
            title={isSavedOnShelf ? 'Tersimpan di rak Anda' : 'Simpan ke rak'}
            aria-label={isSavedOnShelf ? 'Tersimpan di rak' : 'Simpan ke rak'}
          >
            <Bookmark className={`w-4 h-4 ${isSavedOnShelf ? 'fill-current text-[#059669]' : ''}`} />
          </button>

          {/* Punchy Coral Read Button */}
          <button
            onClick={() => onOpenReader(book)}
            className="py-2.5 px-4 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white font-bold rounded-xl text-xs shadow-xs hover:shadow-md active:scale-95 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Baca</span>
          </button>
        </div>
      </div>

    </article>
  );
};
