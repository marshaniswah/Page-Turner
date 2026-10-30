import React, { useState } from 'react';
import { LiteraryQuote } from '../types/book';
import { LITERARY_QUOTES } from '../data/quotesData';
import { Quote, Check, Copy, Sparkles } from 'lucide-react';

export const QuoteStudio: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('Semua');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQuote, setActiveQuote] = useState<LiteraryQuote>(LITERARY_QUOTES[0]);

  const themes = ['Semua', 'Keadilan & Nurani', 'Cinta & Keheningan', 'Ketenangan Batin', 'Kekuatan Literasi'];

  const filteredQuotes = selectedTheme === 'Semua' 
    ? LITERARY_QUOTES 
    : LITERARY_QUOTES.filter((q) => q.theme === selectedTheme);

  const handleCopy = (quote: LiteraryQuote) => {
    const textToCopy = `"${quote.text}" — ${quote.author} (${quote.sourceBook})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="kutipan-jiwa" className="py-20 md:py-28 bg-[#FAF8FC] border-b border-[#E8E1F2]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E1F2]">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#E05A47] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E05A47]" />
              <span>Kutipan Jiwa & Refleksi Pelajar</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1E1B2E]">
              Untaian Makna yang Menginspirasi
            </h2>
            <p className="text-base text-[#4B445E] max-w-xl leading-relaxed">
              Kutipan terpilih dari para pemikir dan sastrawan besar yang memberi suntikan semangat, ketenangan batin, dan inspirasi belajar.
            </p>
          </div>

          {/* Theme Filters (Segmented Pastel Buttons) */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#EDE4F9] rounded-2xl self-start md:self-auto border border-[#DDD0F5]">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedTheme === t
                    ? 'bg-white text-[#1E1B2E] shadow-sm font-bold'
                    : 'text-[#6D28D9] hover:text-[#1E1B2E]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Big Quote Stage */}
        <div className="bg-gradient-to-br from-[#2D2147] via-[#241A3E] to-[#1C1431] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[280px]">
          {/* Subtle watermark quote icon */}
          <Quote className="absolute right-8 bottom-4 w-40 h-40 text-white/5 pointer-events-none" />

          <div className="space-y-5 relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="bg-[#E6F8F0] text-[#065F46] px-2.5 py-0.5 rounded-full font-bold">
                {activeQuote.theme}
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-[#D7CEE8]">SUMBER: {activeQuote.sourceBook}</span>
            </div>

            <blockquote className="font-literary-serif text-2xl sm:text-3xl md:text-4xl italic font-normal leading-relaxed text-balance text-[#FAF8FC]">
              "{activeQuote.text}"
            </blockquote>

            <div className="pt-2 text-sm sm:text-base font-bold text-[#FB7185] font-display">
              — {activeQuote.author} {activeQuote.year && <span className="opacity-75 font-mono text-xs font-normal text-[#D7CEE8]">({activeQuote.year})</span>}
            </div>
          </div>

          <div className="pt-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 mt-6 text-xs text-[#D7CEE8]">
            <span>
              Klik salah satu kutipan di bawah untuk menampilkan di panggung utama
            </span>
            <button
              onClick={() => handleCopy(activeQuote)}
              className="py-2.5 px-5 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl transition-all flex items-center gap-2 font-bold shadow-md shadow-[#E05A47]/30 active:scale-95 shrink-0"
            >
              {copiedId === activeQuote.id ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Kutipan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Kutipan Ini</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quotes Grid with Rounded-3xl Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((quote) => {
            const isActive = activeQuote.id === quote.id;
            const isCopied = copiedId === quote.id;

            return (
              <div
                key={quote.id}
                onClick={() => setActiveQuote(quote)}
                className={`p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-5 ${
                  isActive
                    ? 'bg-white border-[#7C3AED] shadow-lg shadow-[#DDD0F5]/40 ring-2 ring-[#7C3AED]/20'
                    : 'bg-white hover:bg-[#FAF8FC] border-[#E8E1F2] hover:border-[#C4B5FD] shadow-2xs hover:shadow-md'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#6D28D9] truncate bg-[#EDE4F9] px-2.5 py-0.5 rounded-full text-[11px]">
                      {quote.theme}
                    </span>
                    <span className="font-mono tabular-nums text-[#867B9E]">{quote.year}</span>
                  </div>

                  <p className="font-literary-serif text-lg sm:text-xl italic text-[#1E1B2E] leading-relaxed line-clamp-3">
                    "{quote.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBF7] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#1E1B2E]">{quote.author}</div>
                    <div className="text-[11px] text-[#585170] truncate">{quote.sourceBook}</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(quote);
                    }}
                    className="p-2 rounded-xl bg-[#F3EEFA] hover:bg-[#EDE4F9] text-[#6D28D9] transition-colors"
                    title="Salin kutipan"
                    aria-label={`Salin kutipan dari ${quote.author}`}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
