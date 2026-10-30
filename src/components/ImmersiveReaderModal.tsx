import React, { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { audioAmbience, AmbienceType } from '../utils/audioAmbience';
import {
  X,
  Volume2,
  VolumeX,
  Type,
  Sun,
  Moon,
  Bookmark,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';

interface ImmersiveReaderModalProps {
  book: Book;
  onClose: () => void;
  onAddToShelf: (book: Book) => void;
  isSavedOnShelf?: boolean;
}

type ReaderTheme = 'parchment' | 'sepia' | 'night' | 'clean';
type FontPreference = 'serif' | 'sans' | 'mono';

export const ImmersiveReaderModal: React.FC<ImmersiveReaderModalProps> = ({
  book,
  onClose,
  onAddToShelf,
  isSavedOnShelf = false,
}) => {
  const [theme, setTheme] = useState<ReaderTheme>('parchment');
  const [font, setFont] = useState<FontPreference>('serif');
  const [fontSize, setFontSize] = useState<number>(18);
  const [currentAmbience, setCurrentAmbience] = useState<AmbienceType>('none');
  const [volume, setVolume] = useState<number>(0.4);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [savedHighlights, setSavedHighlights] = useState<number[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Keyboard shortcut to close (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      audioAmbience.stop();
    };
  }, [onClose]);

  const handleAmbienceChange = (type: AmbienceType) => {
    if (currentAmbience === type) {
      audioAmbience.stop();
      setCurrentAmbience('none');
    } else {
      audioAmbience.setVolume(volume);
      audioAmbience.play(type);
      setCurrentAmbience(type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioAmbience.setVolume(newVol);
  };

  const toggleHighlight = (index: number) => {
    if (savedHighlights.includes(index)) {
      setSavedHighlights(savedHighlights.filter((i) => i !== index));
    } else {
      setSavedHighlights([...savedHighlights, index]);
    }
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`"${book.keyQuote.text}" — ${book.author} (${book.title})`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  // Theme style mapping
  const themeStyles = {
    parchment: {
      bg: 'bg-[#FAF7F2]',
      text: 'text-[#241F1A]',
      headerBg: 'bg-[#FAF7F2]/95 border-[#E7DFD5]',
      cardBg: 'bg-[#F2ECE1]',
      highlightBg: 'bg-[#F7E0A3]/50',
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#2C2114]',
      headerBg: 'bg-[#F4ECD8]/95 border-[#E2D5BA]',
      cardBg: 'bg-[#EADDC2]',
      highlightBg: 'bg-[#E5C988]/60',
    },
    night: {
      bg: 'bg-[#181B20]',
      text: 'text-[#E2E8F0]',
      headerBg: 'bg-[#181B20]/95 border-[#2D333B]',
      cardBg: 'bg-[#22272E]',
      highlightBg: 'bg-[#8B5CF6]/30',
    },
    clean: {
      bg: 'bg-[#FFFFFF]',
      text: 'text-[#1F2937]',
      headerBg: 'bg-[#FFFFFF]/95 border-[#E5E7EB]',
      cardBg: 'bg-[#F3F4F6]',
      highlightBg: 'bg-[#FEF08A]/60',
    },
  }[theme];

  const fontClass = {
    serif: 'font-serif-title',
    sans: 'font-sans-body',
    mono: 'font-mono',
  }[font];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex flex-col bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Reader Container */}
      <div className={`min-h-screen w-full flex flex-col transition-colors duration-200 ${themeStyles.bg} ${themeStyles.text}`}>
        
        {/* Top Control Bar */}
        <header className={`sticky top-0 z-30 px-6 py-3.5 border-b backdrop-blur-md flex items-center justify-between gap-4 transition-colors ${themeStyles.headerBg}`}>
          
          {/* Left: Book Title & Progress info */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
              aria-label="Tutup pembaca"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-hidden">
              <h2 className="text-sm font-semibold truncate leading-tight">
                {book.title}
              </h2>
              <div className="text-xs opacity-75 truncate">
                <span>{book.author}</span>
                <span aria-hidden="true" className="mx-1">·</span>
                <span>{book.excerpt.chapterTitle}</span>
              </div>
            </div>
          </div>

          {/* Right: Ambient Sounds, Typography Settings & Close */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Quick Ambience Toggles */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/10 text-xs">
              <button
                onClick={() => handleAmbienceChange('rain')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentAmbience === 'rain' ? 'bg-[#E05A47] text-white font-medium shadow-xs' : 'hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title="Suara Hujan Rintik"
              >
                Hujan
              </button>
              <button
                onClick={() => handleAmbienceChange('fireplace')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentAmbience === 'fireplace' ? 'bg-[#E05A47] text-white font-medium shadow-xs' : 'hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title="Suara Perapian Hangat"
              >
                Perapian
              </button>
              <button
                onClick={() => handleAmbienceChange('library')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentAmbience === 'library' ? 'bg-[#E05A47] text-white font-medium shadow-xs' : 'hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title="Suara Hening Perpustakaan"
              >
                Perpustakaan
              </button>
              <button
                onClick={() => handleAmbienceChange('cafe')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  currentAmbience === 'cafe' ? 'bg-[#E05A47] text-white font-medium shadow-xs' : 'hover:bg-black/5 dark:hover:bg-white/10'
                }`}
                title="Suara Kedai Kopi"
              >
                Kedai Kopi
              </button>
            </div>

            {/* Volume control if ambience active */}
            {currentAmbience !== 'none' && (
              <div className="hidden md:flex items-center gap-1.5 pl-2">
                <Volume2 className="w-3.5 h-3.5 opacity-70" />
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-16 h-1 accent-[#E05A47] cursor-pointer"
                  title="Volume suara latar"
                />
              </div>
            )}

            {/* Typography & Display Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                showSettings
                  ? 'bg-[#7C3AED] text-white border-transparent shadow-xs'
                  : 'border-current/20 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              title="Atur Tampilan Pembaca"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">Tampilan</span>
            </button>

            {/* Save to Shelf */}
            <button
              onClick={() => onAddToShelf(book)}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                isSavedOnShelf
                  ? 'bg-[#D1F4E3] text-[#065F46] border-[#A7EBD0]'
                  : 'border-current/20 hover:bg-black/5 dark:hover:bg-white/10'
              }`}
              title="Simpan ke Rak Buku"
            >
              <Bookmark className={`w-4 h-4 ${isSavedOnShelf ? 'fill-current text-[#059669]' : ''}`} />
            </button>
          </div>
        </header>

        {/* Floating Settings Drawer / Panel */}
        {showSettings && (
          <div className="sticky top-14 z-20 mx-auto max-w-xl w-full px-6 py-4 mt-2">
            <div className={`p-5 rounded-xl shadow-lg border border-black/10 dark:border-white/10 backdrop-blur-lg ${themeStyles.cardBg} space-y-4`}>
              
              {/* Paper Theme Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium opacity-80">Warna Kertas Bacaan</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'parchment', name: 'Alami', bg: 'bg-[#FAF7F2] text-[#241F1A] border-[#E7DFD5]' },
                    { id: 'sepia', name: 'Sepia', bg: 'bg-[#F4ECD8] text-[#2C2114] border-[#E2D5BA]' },
                    { id: 'clean', name: 'Putih', bg: 'bg-white text-gray-900 border-gray-200' },
                    { id: 'night', name: 'Malam', bg: 'bg-[#181B20] text-gray-100 border-[#2D333B]' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id as ReaderTheme)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1 transition-all ${item.bg} ${
                        theme === item.id ? 'ring-2 ring-[#7C3AED] font-semibold' : ''
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium opacity-80">Jenis Huruf</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFont('serif')}
                    className={`py-2 px-3 rounded-xl text-xs font-serif transition-all border border-current/20 ${
                      font === 'serif' ? 'bg-black/10 dark:bg-white/20 font-bold' : ''
                    }`}
                  >
                    Serif Klasik
                  </button>
                  <button
                    onClick={() => setFont('sans')}
                    className={`py-2 px-3 rounded-xl text-xs font-sans transition-all border border-current/20 ${
                      font === 'sans' ? 'bg-black/10 dark:bg-white/20 font-bold' : ''
                    }`}
                  >
                    Modern Sans
                  </button>
                  <button
                    onClick={() => setFont('mono')}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition-all border border-current/20 ${
                      font === 'mono' ? 'bg-black/10 dark:bg-white/20 font-bold' : ''
                    }`}
                  >
                    Monospace
                  </button>
                </div>
              </div>

              {/* Font Size Adjustment */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium opacity-80">
                  <span>Ukuran Teks</span>
                  <span className="font-mono">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs">A</span>
                  <input
                    type="range"
                    min="15"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 accent-[#E05A47] cursor-pointer"
                  />
                  <span className="text-lg font-serif">A</span>
                </div>
              </div>

              {/* Mobile Ambience controls */}
              <div className="sm:hidden space-y-1.5 pt-2 border-t border-current/10">
                <label className="text-xs font-medium opacity-80">Suara Latar (Ambience)</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['rain', 'fireplace', 'library', 'cafe'] as AmbienceType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleAmbienceChange(type)}
                      className={`py-1.5 px-2.5 rounded-xl text-xs capitalize border border-current/20 ${
                        currentAmbience === type ? 'bg-[#E05A47] text-white font-medium shadow-xs' : ''
                      }`}
                    >
                      {type === 'rain' ? 'Hujan' : type === 'fireplace' ? 'Perapian' : type === 'library' ? 'Perpustakaan' : 'Kedai Kopi'}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Main Reading Flow */}
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 md:py-16">
          
          {/* Chapter Opening Header */}
          <div className="text-center space-y-4 pb-12 border-b border-current/10">
            <span className="text-xs uppercase tracking-widest font-mono opacity-60">
              Cuplikan Resmi Terpilih
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              {book.excerpt.chapterTitle}
            </h1>
            <div className="text-sm opacity-70">
              Dari mahakarya <strong className="font-semibold">{book.title}</strong> karya {book.author}
            </div>
            
            <div className="w-12 h-0.5 bg-current opacity-20 mx-auto mt-6" />
          </div>

          {/* Reading Paragraphs */}
          <article 
            className={`pt-10 space-y-8 leading-relaxed selection:bg-[#E05A47] selection:text-white ${fontClass}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
          >
            {book.excerpt.content.map((paragraph, index) => {
              const isHighlighted = savedHighlights.includes(index);
              return (
                <p 
                  key={index}
                  onClick={() => toggleHighlight(index)}
                  title="Klik untuk menandai paragraf ini"
                  className={`transition-all duration-200 cursor-pointer rounded-lg p-2.5 -mx-2 hover:bg-black/5 dark:hover:bg-white/5 ${
                    isHighlighted ? `${themeStyles.highlightBg} ring-1 ring-[#E05A47]/40` : ''
                  }`}
                >
                  {index === 0 && (
                    <span className="float-left text-4xl sm:text-5xl font-serif font-bold leading-none pr-3 pt-1 text-[#E05A47]">
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              );
            })}
          </article>

          {/* Key Quote Callout & Share */}
          <div className={`mt-16 p-6 sm:p-8 rounded-3xl border border-current/10 ${themeStyles.cardBg} space-y-3`}>
            <span className="text-xs uppercase tracking-widest font-mono text-[#E05A47] font-semibold">
              Kutipan Menggugah
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl italic leading-snug">
              "{book.keyQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between pt-2 text-xs opacity-75">
              <span>— {book.keyQuote.speakerOrContext}</span>
              <button
                onClick={handleCopyQuote}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-current/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-medium"
              >
                {copiedQuote ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Salin Kutipan</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reader Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs opacity-70">
              {savedHighlights.length > 0 ? (
                <span>{savedHighlights.length} paragraf ditandai</span>
              ) : (
                <span>Tip: Klik paragraf mana pun untuk menandai catatan</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onAddToShelf(book)}
                className={`py-2.5 px-5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs ${
                  isSavedOnShelf
                    ? 'bg-[#D1F4E3] text-[#065F46] border border-[#A7EBD0]'
                    : 'bg-[#E05A47] hover:bg-[#C94735] text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSavedOnShelf ? 'Tersimpan di Rak' : 'Simpan Buku Ini'}</span>
              </button>
              <button
                onClick={onClose}
                className="py-2.5 px-5 border border-current/20 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl text-xs font-medium transition-colors"
              >
                Kembali ke Katalog
              </button>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};
