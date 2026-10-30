import React, { useState } from 'react';
import { Book } from '../types/book';
import { BookJacket } from './BookJacket';
import { X, Sparkles, BookOpen, Bookmark, ArrowRight, RotateCcw } from 'lucide-react';

interface BookQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  allBooks: Book[];
  onOpenReader: (book: Book) => void;
  onAddToShelf: (book: Book) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    targetBookId: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Cerita seperti apa yang paling bikin kamu penasaran saat ini?',
    subtitle: 'Pilih tema yang paling pas dengan mood membaca kamu di masa SMA.',
    options: [
      {
        label: 'Petualangan Fantasi & Dunia Paralel yang Penuh Rahasia',
        description: 'Kisah seru tiga sahabat SMA yang punya kekuatan unik menjelajahi dunia lain.',
        targetBookId: 'bumi-tere-liye',
      },
      {
        label: 'Ketenangan Mental & Anti-Overthinking Pelajar',
        description: 'Cara santai stoisisme biar nggak gampang stres mikirin nilai ulangan atau omongan orang.',
        targetBookId: 'filosofi-teras',
      },
      {
        label: 'Semangat Mengejar Mimpi & Sahabat Seperjuangan',
        description: 'Kekuatan tekad Man Jadda Wajada untuk meraih cita-cita setinggi langit.',
        targetBookId: 'negeri-5-menara',
      },
      {
        label: 'Nostalgia SMA yang Manis, Kocak, dan Bikin Senyum',
        description: 'Obrolan santai, motor tua, dan puisi-puisi jenius masa sekolah tahun 90-an.',
        targetBookId: 'dilan-1990',
      },
      {
        label: 'Trik Bangun Kebiasaan Belajar Tanpa Rasa Mager',
        description: 'Perubahan kecil 1% setiap hari yang bikin kamu makin jago dan produktif.',
        targetBookId: 'atomic-habits',
      },
    ],
  },
  {
    id: 2,
    title: 'Kapan waktu membaca yang paling kamu sukai?',
    subtitle: 'Sesuaikan dengan kesibukan jadwal sekolah dan ekskul kamu.',
    options: [
      {
        label: '15-20 Menit Santai Sebelum Tidur',
        description: 'Bab-bab ringkas yang bikin pikiran adem setelah seharian belajar.',
        targetBookId: 'filosofi-teras',
      },
      {
        label: 'Marathon Seharian di Akhir Pekan',
        description: 'Novel tebal seru yang bikin lupa waktu sampai tamat.',
        targetBookId: 'bumi-tere-liye',
      },
      {
        label: 'Waktu Istirahat atau Sore Sepulang Sekolah',
        description: 'Kisah hangat persahabatan yang bikin hati bersemangat kembali.',
        targetBookId: 'laskar-pelangi',
      },
      {
        label: 'Saat Hujan Turun Sambil Mendengarkan Musik',
        description: 'Puisi atau narasi puitis yang liris dan menenangkan.',
        targetBookId: 'hujan-bulan-juni',
      },
    ],
  },
  {
    id: 3,
    title: 'Gaya cerita mana yang paling asyik kamu nikmati?',
    subtitle: 'Pilih alur dan gaya bahasa yang paling nyaman di telingamu.',
    options: [
      {
        label: 'Penuh Aksi Cepat, Misteri, dan Plot Twist Menghentak',
        description: 'Setiap bab bikin penasaran buat buka halaman berikutnya.',
        targetBookId: 'bumi-tere-liye',
      },
      {
        label: 'Lugas, Aplikatif, dan Langsung Mengubah Cara Pikir',
        description: 'Buku non-fiksi yang memberikan tips nyata untuk keseharian siswa.',
        targetBookId: 'atomic-habits',
      },
      {
        label: 'Inspiratif, Penuh Haru, dan Menguatkan Persahabatan',
        description: 'Perjuangan tulus anak-anak sekolah yang tak pernah menyerah pada keadaan.',
        targetBookId: 'laskar-pelangi',
      },
      {
        label: 'Petualangan Filosofis Mengikuti Suara Hati',
        description: 'Kisah pengembala muda mencari harta karun dan takdir hidupnya.',
        targetBookId: 'the-alchemist',
      },
    ],
  },
];

export const BookQuizModal: React.FC<BookQuizModalProps> = ({
  isOpen,
  onClose,
  allBooks,
  onOpenReader,
  onAddToShelf,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedBook, setRecommendedBook] = useState<Book | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (bookId: string) => {
    const nextAnswers = [...answers, bookId];
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate matching: find highest frequent or last strong pick
      const countMap: Record<string, number> = {};
      nextAnswers.forEach((id) => {
        countMap[id] = (countMap[id] || 0) + 1;
      });

      let winnerId = nextAnswers[0];
      let maxCount = 0;
      Object.entries(countMap).forEach(([id, count]) => {
        if (count > maxCount) {
          maxCount = count;
          winnerId = id;
        }
      });

      const matched = allBooks.find((b) => b.id === winnerId) || allBooks[0];
      setRecommendedBook(matched);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendedBook(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="bg-white max-w-2xl w-full rounded-3xl border border-[#E8E1F2] shadow-2xl overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8E1F2] bg-[#F8F5FD] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#FB7185] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-[#1E1B2E]">
                Pencari Jodoh Buku Siswa SMA
              </h2>
              <span className="text-xs text-[#585170]">
                {recommendedBook ? 'Hasil Rekomendasi Khusus Kamu' : `Pertanyaan ${currentStep + 1} dari ${QUIZ_QUESTIONS.length}`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B6280] hover:text-[#1E1B2E] hover:bg-[#EDE4F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          
          {!recommendedBook ? (
            <div className="space-y-6">
              
              {/* Question Title */}
              <div className="space-y-1.5">
                <h3 className="font-display text-2xl font-bold text-[#1E1B2E] leading-snug">
                  {currentQ.title}
                </h3>
                <p className="text-xs text-[#585170]">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.targetBookId)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-[#DDD0F5] bg-[#FAF8FC] hover:bg-white hover:border-[#7C3AED] hover:shadow-md transition-all flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="font-display text-base font-bold text-[#1E1B2E] group-hover:text-[#7C3AED] transition-colors">
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#4B445E] leading-relaxed">
                        {opt.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#867B9E] group-hover:text-[#E05A47] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                  </button>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#867B9E]">
                <div className="flex gap-1.5">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentStep
                          ? 'w-8 bg-[#E05A47]'
                          : i < currentStep
                          ? 'w-4 bg-[#7C3AED]'
                          : 'w-4 bg-[#DDD0F5]'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">3 Langkah Praktis</span>
              </div>

            </div>
          ) : (
            /* Result Screen */
            <div className="space-y-6 text-center sm:text-left">
              
              <div className="text-center space-y-1.5 pb-2">
                <span className="text-xs uppercase tracking-widest font-mono text-[#E05A47] font-bold">
                  Buku Paling Selaras dengan Mood Kamu
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
                  Sebuah Perjumpaan Buku yang Pas!
                </h3>
              </div>

              <div className="bg-[#FAF8FC] p-6 sm:p-7 rounded-3xl border border-[#DDD0F5] flex flex-col sm:flex-row items-center gap-6 shadow-sm">
                <div className="shrink-0">
                  <BookJacket book={recommendedBook} size="md" />
                </div>

                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div className="text-xs text-[#585170]">
                    <span className="font-semibold text-[#6D28D9] bg-[#EDE4F9] px-2.5 py-0.5 rounded-full">{recommendedBook.category}</span>
                    <span aria-hidden="true" className="mx-1.5 text-[#DDD0F5]">·</span>
                    <span className="font-mono text-[#867B9E]">Tahun {recommendedBook.originalYear}</span>
                    <span aria-hidden="true" className="mx-1.5 text-[#DDD0F5]">·</span>
                    <span className="font-bold text-[#E05A47]">★ {recommendedBook.rating}</span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-[#1E1B2E]">
                    {recommendedBook.title}
                  </h4>

                  <p className="text-xs font-semibold text-[#585170]">
                    Karya {recommendedBook.author}
                  </p>

                  <p className="text-xs text-[#4B445E] leading-relaxed line-clamp-3">
                    {recommendedBook.synopsis}
                  </p>

                  <div className="p-3.5 bg-white rounded-2xl border border-[#E8E1F2] text-xs italic font-literary-serif text-[#1E1B2E]">
                    "{recommendedBook.keyQuote.text}"
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-[#585170] hover:text-[#1E1B2E] flex items-center gap-1.5 transition-colors order-2 sm:order-1"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Ulangi Kuis</span>
                </button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    onClick={() => {
                      onAddToShelf(recommendedBook);
                    }}
                    className="flex-1 sm:flex-none py-3 px-5 rounded-xl border border-[#A7EBD0] bg-[#E6F8F0] hover:bg-[#D1F4E3] text-[#065F46] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                  >
                    <Bookmark className="w-4 h-4 text-[#059669]" />
                    <span>Simpan ke Rak</span>
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenReader(recommendedBook);
                    }}
                    className="flex-1 sm:flex-none py-3 px-6 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#E05A47]/30 transition-all active:scale-95"
                  >
                    <BookOpen className="w-4 h-4 text-white" />
                    <span>Mulai Membaca</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
