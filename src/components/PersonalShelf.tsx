import React, { useState } from 'react';
import { Book, ShelfItem, ShelfStatus } from '../types/book';
import { BookJacket } from './BookJacket';
import {
  X,
  Bookmark,
  CheckCircle2,
  Clock,
  Plus,
  BookOpen,
  Trash2,
  Trophy,
  Sliders,
  Sparkles,
  Download,
  Upload,
} from 'lucide-react';

interface PersonalShelfProps {
  isOpen: boolean;
  onClose: () => void;
  shelfItems: ShelfItem[];
  allBooks: Book[];
  onUpdateShelfItem: (item: ShelfItem) => void;
  onRemoveFromShelf: (bookId: string) => void;
  onOpenReader: (book: Book) => void;
  onOpenDetails: (book: Book) => void;
  onAddCustomBook: (item: ShelfItem) => void;
}

export const PersonalShelf: React.FC<PersonalShelfProps> = ({
  isOpen,
  onClose,
  shelfItems,
  allBooks,
  onUpdateShelfItem,
  onRemoveFromShelf,
  onOpenReader,
  onOpenDetails,
  onAddCustomBook,
}) => {
  const [activeTab, setActiveTab] = useState<ShelfStatus>('reading');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customAuthor, setCustomAuthor] = useState('');
  const [customPages, setCustomPages] = useState('300');
  const [customStatus, setCustomStatus] = useState<ShelfStatus>('reading');
  const [readingTarget, setReadingTarget] = useState(12);

  if (!isOpen) return null;

  // Filter items by status
  const currentTabItems = shelfItems.filter((item) => item.status === activeTab);
  const readingCount = shelfItems.filter((i) => i.status === 'reading').length;
  const wantCount = shelfItems.filter((i) => i.status === 'want_to_read').length;
  const finishedCount = shelfItems.filter((i) => i.status === 'finished').length;

  // Calculate statistics
  const totalPagesRead = shelfItems.reduce((acc, curr) => {
    if (curr.status === 'finished') return acc + curr.totalPages;
    if (curr.status === 'reading') return acc + curr.currentPage;
    return acc;
  }, 0);

  const handlePageChange = (item: ShelfItem, newPage: number) => {
    const validPage = Math.max(0, Math.min(item.totalPages, newPage));
    const isFinished = validPage >= item.totalPages;
    onUpdateShelfItem({
      ...item,
      currentPage: validPage,
      status: isFinished ? 'finished' : item.status,
      finishedDate: isFinished ? new Date().toLocaleDateString('id-ID') : undefined,
    });
  };

  const handleStatusChange = (item: ShelfItem, newStatus: ShelfStatus) => {
    onUpdateShelfItem({
      ...item,
      status: newStatus,
      finishedDate: newStatus === 'finished' ? new Date().toLocaleDateString('id-ID') : undefined,
      currentPage: newStatus === 'finished' ? item.totalPages : item.currentPage,
    });
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customAuthor.trim()) return;

    const pages = parseInt(customPages, 10) || 250;
    const customId = `custom-${Date.now()}`;

    const newItem: ShelfItem = {
      bookId: customId,
      status: customStatus,
      currentPage: customStatus === 'finished' ? pages : 0,
      totalPages: pages,
      startedDate: new Date().toLocaleDateString('id-ID'),
      customBook: {
        title: customTitle.trim(),
        author: customAuthor.trim(),
        category: 'Koleksi Pribadi',
        totalPages: pages,
      },
    };

    onAddCustomBook(newItem);
    setCustomTitle('');
    setCustomAuthor('');
    setShowAddCustom(false);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(shelfItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `rak-buku-pageturners-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-white max-w-4xl w-full rounded-3xl border border-[#E8E1F2] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E1F2] bg-[#F8F5FD] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E05A47] to-[#FB7185] text-white flex items-center justify-center shadow-sm">
              <Bookmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1E1B2E]">
                Rak Buku Siswa & Target Membaca
              </h2>
              <p className="text-xs text-[#585170]">
                Pantau progres halaman harian, kelola wishlist bacaan, dan arsip buku favoritmu.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B6280] hover:text-[#1E1B2E] hover:bg-[#EDE4F9] transition-colors"
            aria-label="Tutup rak buku"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Challenge & Stats Banner in Pastel Mint */}
        <div className="px-6 py-4 bg-[#E6F8F0] border-b border-[#A7EBD0] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-2xl bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#1E1B2E] flex items-center gap-2">
                <span>Tantangan Membaca 2026:</span>
                <span className="font-mono text-xs text-[#065F46] font-bold">
                  {finishedCount} dari {readingTarget} Buku ({Math.round((finishedCount / readingTarget) * 100)}%)
                </span>
              </div>
              <div className="w-48 sm:w-64 bg-white/80 h-2.5 rounded-full overflow-hidden mt-1.5 border border-[#A7EBD0]/50">
                <div
                  className="bg-gradient-to-r from-[#E05A47] to-[#F43F5E] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, (finishedCount / readingTarget) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#065F46] font-semibold">
            <div>
              <span className="font-bold text-[#1E1B2E] tabular-nums font-mono text-sm">{totalPagesRead}</span>
              <span className="ml-1.5">Halaman Dibaca</span>
            </div>
            <span aria-hidden="true" className="text-[#A7EBD0]">·</span>
            <div>
              <span className="font-bold text-[#1E1B2E] tabular-nums font-mono text-sm">{shelfItems.length}</span>
              <span className="ml-1.5">Buku di Rak</span>
            </div>
          </div>
        </div>

        {/* Shelf Segmented Tabs & Actions in Pastel Lavender */}
        <div className="px-6 py-3.5 border-b border-[#E8E1F2] flex flex-wrap items-center justify-between gap-3 bg-[#FAF8FC]">
          <div className="flex items-center gap-1.5 p-1 bg-[#EDE4F9] rounded-2xl text-xs border border-[#DDD0F5]">
            <button
              onClick={() => setActiveTab('reading')}
              className={`px-3.5 py-1.5 font-semibold rounded-xl transition-all ${
                activeTab === 'reading'
                  ? 'bg-white text-[#1E1B2E] shadow-xs font-bold'
                  : 'text-[#6D28D9] hover:text-[#1E1B2E]'
              }`}
            >
              Sedang Dibaca ({readingCount})
            </button>
            <button
              onClick={() => setActiveTab('want_to_read')}
              className={`px-3.5 py-1.5 font-semibold rounded-xl transition-all ${
                activeTab === 'want_to_read'
                  ? 'bg-white text-[#1E1B2E] shadow-xs font-bold'
                  : 'text-[#6D28D9] hover:text-[#1E1B2E]'
              }`}
            >
              Ingin Dibaca ({wantCount})
            </button>
            <button
              onClick={() => setActiveTab('finished')}
              className={`px-3.5 py-1.5 font-semibold rounded-xl transition-all ${
                activeTab === 'finished'
                  ? 'bg-white text-[#1E1B2E] shadow-xs font-bold'
                  : 'text-[#6D28D9] hover:text-[#1E1B2E]'
              }`}
            >
              Selesai Dibaca ({finishedCount})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCustom(!showAddCustom)}
              className="py-2 px-4 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Buku Sendiri</span>
            </button>

            {shelfItems.length > 0 && (
              <button
                onClick={handleExportData}
                title="Unduh cadangan rak buku Anda (JSON)"
                className="p-2 rounded-xl border border-[#DDD0F5] bg-white text-[#6D28D9] hover:bg-[#EDE4F9] transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>


        {/* Add Custom Book Form Drawer */}
        {showAddCustom && (
          <form onSubmit={handleCreateCustom} className="p-5 bg-[#FAF7F2] border-b border-[#E7DFD5] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1E232A]">
                Tambah Judul Buku ke Rak Pribadi
              </span>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="text-xs text-[#736659] hover:text-[#1E232A]"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Judul Buku..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="sm:col-span-2 px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-xs"
                required
              />
              <input
                type="text"
                placeholder="Nama Penulis..."
                value={customAuthor}
                onChange={(e) => setCustomAuthor(e.target.value)}
                className="px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-xs"
                required
              />
              <input
                type="number"
                placeholder="Jumlah Hal"
                value={customPages}
                onChange={(e) => setCustomPages(e.target.value)}
                className="px-3 py-2 bg-white border border-[#DDD3C7] rounded-lg text-xs"
                min="1"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 text-xs text-[#736659]">
                <span>Status:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="customStatus"
                    checked={customStatus === 'reading'}
                    onChange={() => setCustomStatus('reading')}
                    className="accent-[#9A3412]"
                  />
                  <span>Sedang Dibaca</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="customStatus"
                    checked={customStatus === 'want_to_read'}
                    onChange={() => setCustomStatus('want_to_read')}
                    className="accent-[#9A3412]"
                  />
                  <span>Ingin Dibaca</span>
                </label>
              </div>

              <button
                type="submit"
                className="py-1.5 px-3 bg-[#9A3412] text-white rounded-lg text-xs font-semibold hover:bg-[#7C2D12] transition-colors"
              >
                Simpan Buku
              </button>
            </div>
          </form>
        )}

        {/* Shelf Items List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {currentTabItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F5EFE6] text-[#8C7A6B] flex items-center justify-center mx-auto">
                <Bookmark className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-xl font-bold text-[#1E232A]">
                Belum ada buku di kategori ini
              </h3>
              <p className="text-xs text-[#736659] max-w-sm mx-auto">
                {activeTab === 'reading'
                  ? 'Pilih buku dari katalog beranda untuk mulai menandai halaman yang sedang Anda baca.'
                  : activeTab === 'want_to_read'
                  ? 'Simpan judul-judul menarik ke dalam daftar keinginan membaca Anda.'
                  : 'Setiap buku yang selesai Anda baca akan tersimpan di sini sebagai pencapaian literasi.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentTabItems.map((item) => {
                const catalogBook = allBooks.find((b) => b.id === item.bookId);
                const title = catalogBook ? catalogBook.title : item.customBook?.title || 'Buku Tanpa Judul';
                const author = catalogBook ? catalogBook.author : item.customBook?.author || 'Penulis';
                const totalPages = item.totalPages || catalogBook?.pages || 300;
                const percentage = Math.round((item.currentPage / totalPages) * 100);

                return (
                  <div
                    key={item.bookId}
                    className="p-5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2] hover:border-[#D1C7BA] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    {/* Left: Book Cover / Minimal Silhouette & Title */}
                    <div className="flex items-center gap-4 flex-1 overflow-hidden">
                      {catalogBook ? (
                        <div 
                          className="shrink-0 cursor-pointer"
                          onClick={() => onOpenDetails(catalogBook)}
                        >
                          <BookJacket book={catalogBook} size="sm" showRibbon={false} />
                        </div>
                      ) : (
                        <div className="w-16 h-24 rounded-r-md rounded-l-xs bg-[#241F1A] text-white p-2 flex flex-col justify-between shrink-0 shadow-xs border-l-2 border-white/20">
                          <span className="text-[8px] font-mono text-[#E2D4C0]">PRIBADI</span>
                          <span className="font-serif-title text-[10px] font-bold line-clamp-2 leading-tight">
                            {title}
                          </span>
                          <span className="text-[7px] text-gray-400 truncate">{author}</span>
                        </div>
                      )}

                      <div className="space-y-1 overflow-hidden">
                        <div className="text-xs text-[#8C7A6B]">
                          <span>{catalogBook?.category || item.customBook?.category || 'Koleksi'}</span>
                          {item.startedDate && (
                            <>
                              <span aria-hidden="true" className="mx-1.5">·</span>
                              <span>Mulai {item.startedDate}</span>
                            </>
                          )}
                        </div>

                        <h3 
                          className={`font-serif-title text-lg font-bold text-[#1E232A] truncate leading-snug ${
                            catalogBook ? 'hover:text-[#9A3412] cursor-pointer' : ''
                          }`}
                          onClick={() => catalogBook && onOpenDetails(catalogBook)}
                        >
                          {title}
                        </h3>

                        <p className="text-xs text-[#574E45]">
                          {author}
                        </p>

                        {/* Interactive Page Slider & Numeric Inputs */}
                        {item.status === 'reading' && (
                          <div className="pt-2 space-y-1 max-w-sm">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-[#9A3412] font-semibold">{percentage}% selesai</span>
                              <span className="text-[#736659] tabular-nums">
                                Hal {item.currentPage} / {totalPages}
                              </span>
                            </div>

                            <input
                              type="range"
                              min="0"
                              max={totalPages}
                              value={item.currentPage}
                              onChange={(e) => handlePageChange(item, parseInt(e.target.value, 10))}
                              className="w-full h-1.5 accent-[#9A3412] cursor-pointer"
                            />
                          </div>
                        )}

                        {item.status === 'finished' && (
                          <div className="text-xs text-emerald-800 font-medium flex items-center gap-1 pt-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tuntas dibaca ({totalPages} halaman)</span>
                            {item.finishedDate && <span>· {item.finishedDate}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 w-full sm:w-auto justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E7DFD5]">
                      
                      {/* Status Selector Dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item, e.target.value as ShelfStatus)}
                        className="text-xs bg-white border border-[#DDD3C7] rounded-lg px-2.5 py-1.5 text-[#1E232A] font-medium"
                      >
                        <option value="reading">Sedang Dibaca</option>
                        <option value="want_to_read">Ingin Dibaca</option>
                        <option value="finished">Selesai Dibaca</option>
                      </select>

                      <div className="flex items-center gap-2">
                        {catalogBook && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenReader(catalogBook);
                            }}
                            className="py-1.5 px-3 bg-[#241F1A] text-white hover:bg-[#3D352E] rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                          >
                            <BookOpen className="w-3 h-3 text-[#E2D4C0]" />
                            <span>Baca Cuplikan</span>
                          </button>
                        )}

                        <button
                          onClick={() => onRemoveFromShelf(item.bookId)}
                          className="p-1.5 rounded-lg border border-[#DDD3C7] text-gray-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Hapus dari rak"
                          aria-label={`Hapus ${title} dari rak`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
