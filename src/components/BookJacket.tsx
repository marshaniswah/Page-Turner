import React from 'react';
import { Book } from '../types/book';

interface BookJacketProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showRibbon?: boolean;
}

export const BookJacket: React.FC<BookJacketProps> = ({
  book,
  size = 'md',
  className = '',
  showRibbon = true,
}) => {
  const { coverPalette, title, author, originalYear, category } = book;

  const sizeClasses = {
    sm: 'w-24 h-36 text-[10px]',
    md: 'w-44 h-64 text-xs',
    lg: 'w-56 h-80 text-sm',
    hero: 'w-64 h-96 md:w-72 md:h-[420px] text-base',
  }[size];

  // Pattern overlays in SVG
  const renderPattern = () => {
    switch (coverPalette.pattern) {
      case 'batik':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`batik-${book.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M16 0 L32 16 L16 32 L0 16 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <path d="M8 8 L24 24 M24 8 L8 24" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#batik-${book.id})`} style={{ color: coverPalette.accent }} />
          </svg>
        );
      case 'waves':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`waves-${book.id}`} width="40" height="24" patternUnits="userSpaceOnUse">
                <path d="M0 12 Q10 0 20 12 T40 12" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M0 20 Q10 8 20 20 T40 20" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#waves-${book.id})`} style={{ color: coverPalette.accent }} />
          </svg>
        );
      case 'geometry':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`geom-${book.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                <rect x="2" y="2" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="14" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#geom-${book.id})`} style={{ color: coverPalette.accent }} />
          </svg>
        );
      case 'foliage':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`foliage-${book.id}`} width="36" height="36" patternUnits="userSpaceOnUse">
                <path d="M18 4 C24 12 30 18 30 26 C30 32 24 34 18 34 C12 34 6 32 6 26 C6 18 12 12 18 4 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <path d="M18 4 L18 34" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#foliage-${book.id})`} style={{ color: coverPalette.accent }} />
          </svg>
        );
      default:
        return (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30 pointer-events-none" />
        );
    }
  };

  return (
    <div
      className={`relative select-none rounded-r-md rounded-l-xs overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between shrink-0 group ${sizeClasses} ${className}`}
      style={{
        background: `linear-gradient(145deg, ${coverPalette.bgFrom} 0%, ${coverPalette.bgTo} 100%)`,
        color: coverPalette.textColor,
      }}
    >
      {/* Book spine simulation (left fold and shadow) */}
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-10 pointer-events-none" />
      <div className="absolute left-3 top-0 bottom-0 w-[1px] bg-white/10 z-10 pointer-events-none" />

      {/* Book edge highlights */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-black/25 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/40 pointer-events-none" />

      {/* Texture & Motifs */}
      {renderPattern()}

      {/* Satin Ribbon Bookmark */}
      {showRibbon && (
        <div
          className="absolute right-4 -top-1 w-3 h-8 shadow-xs z-20 pointer-events-none"
          style={{
            backgroundColor: coverPalette.accent,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
          }}
        />
      )}

      {/* Book Cover Header: Publisher / Category / Era */}
      <div className="relative z-10 p-3.5 pl-5 pt-3 flex items-center justify-between border-b border-white/10">
        <span
          className="font-mono text-[9px] uppercase tracking-widest font-medium opacity-85"
          style={{ color: coverPalette.accent }}
        >
          {category.split(' ')[0]}
        </span>
        <span className="font-mono text-[9px] opacity-60 tabular-nums">
          {originalYear}
        </span>
      </div>

      {/* Book Cover Center: Title & Artwork Centerpiece */}
      <div className="relative z-10 px-4 pl-5 py-2 my-auto text-center flex flex-col items-center">
        {/* Artistic Foil Emblem */}
        <div
          className="w-10 h-10 mb-2.5 rounded-full border border-dashed flex items-center justify-center opacity-75"
          style={{ borderColor: coverPalette.accent, color: coverPalette.accent }}
        >
          <span className="font-serif-title text-base font-semibold italic">
            {title.charAt(0)}
          </span>
        </div>

        <h3 className="font-serif-title font-bold tracking-tight text-center leading-snug drop-shadow-xs line-clamp-3 text-balance">
          {title}
        </h3>

        <div
          className="w-12 h-[1px] my-2 opacity-50 mx-auto"
          style={{ backgroundColor: coverPalette.accent }}
        />

        <p className="font-sans-body text-[11px] font-medium tracking-wide opacity-85 line-clamp-1">
          {author}
        </p>
      </div>

      {/* Book Cover Footer: Edition mark */}
      <div className="relative z-10 p-3 pl-5 pb-2.5 flex items-center justify-between border-t border-white/10 text-[9px] opacity-70 font-mono">
        <span>PAGETURNERS SMA</span>
        <span className="tracking-widest">EDISI KLUB</span>
      </div>
    </div>
  );
};
