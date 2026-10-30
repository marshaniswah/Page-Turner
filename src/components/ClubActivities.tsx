import React, { useState } from 'react';
import { ClubActivity, ClubMember } from '../types/book';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  Award,
} from 'lucide-react';

interface ClubActivitiesProps {
  onJoinSuccess: (memberName: string) => void;
}

const ACTIVITIES: ClubActivity[] = [
  {
    id: 'act-1',
    title: 'Friday Book Talk (Diskusi Santai Mingguan)',
    dayTime: 'Setiap Jumat · 15.30 - 16.30 WIB',
    location: 'Ruang Multimedia / Perpustakaan Sekolah Lantai 2',
    description: 'Nongkrong santai sambil bedah alur cerita, karakter yang paling bikin gregetan, dan teori ending novel yang lagi tren. Ada camilan dan teh hangat!',
    badge: 'Agenda Wajib Seru',
    facilitator: 'Kak Nayla (XII IPS 1) & Tim Pengurus',
  },
  {
    id: 'act-2',
    title: 'Book Swap & Borrow (Tukar Pinjam Koleksi)',
    dayTime: 'Setiap Rabu · Istirahat Kedua (12.00 - 12.45 WIB)',
    location: 'Pojok Baca & Gazebo Taman Tengah Sekolah',
    description: 'Bawa 1 novel atau buku seru dari rumah, tukar pinjam dengan koleksi anggota klub lainnya. Nggak perlu jajan buku baru terus!',
    badge: 'Hemat & Berbagi',
    facilitator: 'Bima (XI MIPA 3)',
  },
  {
    id: 'act-3',
    title: '20-Minute Silent Reading with Ambience',
    dayTime: 'Setiap Selasa · 06.45 - 07.15 WIB (Sebelum KBM)',
    location: 'Selasar Perpustakaan Hening',
    description: 'Membaca hening 20 menit diiringi audio rintik hujan dan kedai kopi tenang. Bikin pikiran rileks dan super fokus sebelum ulangan harian.',
    badge: 'Anti-Stress Belajar',
    facilitator: 'Rara (X-4) & Dinda (XI Bahasa)',
  },
  {
    id: 'act-4',
    title: 'Bedah Karya & Nobar Adaptasi Film',
    dayTime: 'Sabtu Pertama Tiap Bulan · 09.00 - 12.00 WIB',
    location: 'Aula Mini / Daring Discord PageTurners',
    description: 'Nonton bareng film yang diadaptasi dari novel (seperti Dilan, Laskar Pelangi, atau film fantasi), lalu diskusi seru: lebih keren versi buku atau filmnya?',
    badge: 'Edisi Spesial Bulanan',
    facilitator: 'Pembina Klub: Bu Siti Nurjanah, M.Pd.',
  },
];

export const ClubActivities: React.FC<ClubActivitiesProps> = ({ onJoinSuccess }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('X (Kelas 10)');
  const [favGenre, setFavGenre] = useState('Fiksi & Petualangan');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredMember, setRegisteredMember] = useState<ClubMember | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: ClubMember = {
      id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      grade,
      favGenre,
      joinedDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    try {
      const existing = localStorage.getItem('pageturners_members');
      const list = existing ? JSON.parse(existing) : [];
      list.push(newMember);
      localStorage.setItem('pageturners_members', JSON.stringify(list));
    } catch {
      // Storage unavailable
    }

    setRegisteredMember(newMember);
    setIsSubmitted(true);
    onJoinSuccess(newMember.name);
  };

  return (
    <section id="kegiatan-klub" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF8FC] via-[#F4EFFB] to-[#FAF8FC] border-b border-[#E8E1F2]">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E1F2]">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#E05A47] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E05A47]" />
              <span>Agenda & Komunitas Siswa SMA</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#1E1B2E]">
              Kegiatan Seru Klub Membaca PageTurners
            </h2>
            <p className="text-base text-[#4B445E] max-w-2xl leading-relaxed">
              Membaca di sini bukan tugas berat yang bikin ngantuk! Di PageTurners, kita kumpul buat berbagi cerita seru, ngobrol santai tanpa takut dihakimi, dan saling rekomendasikan buku yang beneran asyik dibaca.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs self-start md:self-auto bg-white px-4 py-3 rounded-2xl border border-[#E8E1F2] shadow-xs">
            <div className="flex items-center gap-2 font-semibold text-[#1E1B2E]">
              <Users className="w-4 h-4 text-[#7C3AED]" />
              <span>Terbuka untuk Semua Siswa Kelas X, XI, & XII</span>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACTIVITIES.map((act) => {
            const isSpecial = act.badge.includes('Spesial');
            const isAntiStress = act.badge.includes('Anti-Stress');

            const badgeBg = isSpecial
              ? 'bg-[#FFF0ED] text-[#E05A47] border-[#FECAC0]'
              : isAntiStress
              ? 'bg-[#E6F8F0] text-[#065F46] border-[#A7EBD0]'
              : 'bg-[#EDE4F9] text-[#6D28D9] border-[#DDD0F5]';

            return (
              <div
                key={act.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E8E1F2] hover:border-[#C4B5FD] shadow-xs hover:shadow-xl hover:shadow-[#DDD0F5]/30 transition-all flex flex-col justify-between gap-6 group"
              >
                <div className="space-y-4">
                  {/* Clean unboxed metadata strip */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
                      {act.badge}
                    </span>
                    <span className="text-[#867B9E] font-mono text-[11px] font-semibold">
                      Klub PageTurners
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#1E1B2E] group-hover:text-[#7C3AED] transition-colors leading-snug">
                    {act.title}
                  </h3>

                  <p className="text-sm text-[#4B445E] leading-relaxed">
                    {act.description}
                  </p>
                </div>

                {/* Timing & Location Details */}
                <div className="pt-5 border-t border-[#F0EBF7] space-y-2.5 text-xs text-[#585170]">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#E05A47] shrink-0" />
                    <span className="font-bold text-[#1E1B2E] text-sm">{act.dayTime}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>{act.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px] text-[#867B9E]">
                    <Users className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                    <span>Fasilitator: {act.facilitator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Club Registration Banner & Form */}
        <div className="bg-gradient-to-br from-[#2D2147] via-[#241A3E] to-[#1C1431] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Why Join */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-widest font-mono text-[#D1F4E3] font-bold flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#059669]" />
                <span>Pendaftaran Anggota Baru</span>
              </span>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight text-balance">
                Mau Gabung Bareng Teman-Teman <span className="text-[#FB7185]">PageTurners</span>?
              </h3>

              <p className="text-sm text-[#D7CEE8] leading-relaxed">
                Nggak ada syarat rumit dan nggak perlu sudah jago membaca tebal. Kalau kamu pengin mulai suka membaca atau cari teman ngobrol buku yang seru di sekolah, pintu PageTurners selalu terbuka lebar buatmu!
              </p>

              <div className="space-y-3 text-xs text-[#EDE4F9] pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A7EBD0] shrink-0" />
                  <span>Dapat kartu anggota digital & akses grup WhatsApp diskusi santai</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A7EBD0] shrink-0" />
                  <span>Bisa pinjam koleksi buku seru pengurus klub tanpa biaya</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#A7EBD0] shrink-0" />
                  <span>Ikut silent reading bareng sebelum jam belajar sekolah</span>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form or Member Card */}
            <div className="lg:col-span-6">
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 space-y-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-lg font-display font-bold text-white">
                      Formulir Pendaftaran Siswa
                    </h4>
                    <p className="text-xs text-[#D7CEE8]">
                      Isi data dirimu di bawah untuk langsung terdaftar di klub membaca.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#EDE4F9] mb-1">
                        Nama Lengkap Siswa
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Raditya Pratama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-[#1E1B2E] rounded-xl text-xs font-medium placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-[#FB7185]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#EDE4F9] mb-1">
                          Kelas di SMA
                        </label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full px-3.5 py-3 bg-white text-[#1E1B2E] rounded-xl text-xs font-semibold focus:outline-hidden"
                        >
                          <option value="X (Kelas 10)">X (Kelas 10)</option>
                          <option value="XI (Kelas 11)">XI (Kelas 11)</option>
                          <option value="XII (Kelas 12)">XII (Kelas 12)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#EDE4F9] mb-1">
                          Genre Buku Favorit
                        </label>
                        <select
                          value={favGenre}
                          onChange={(e) => setFavGenre(e.target.value)}
                          className="w-full px-3.5 py-3 bg-white text-[#1E1B2E] rounded-xl text-xs font-semibold focus:outline-hidden"
                        >
                          <option value="Fiksi & Petualangan">Fiksi & Petualangan</option>
                          <option value="Inspirasi & Remaja">Inspirasi & Remaja</option>
                          <option value="Pengembangan Diri">Pengembangan Diri</option>
                          <option value="Misteri & Sains">Misteri & Sains</option>
                          <option value="Sastra Populer">Sastra Populer</option>
                          <option value="Puisi & Seni">Puisi & Seni</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#EDE4F9] mb-1">
                        Nomor WhatsApp (Opsional, info jadwal & agenda)
                      </label>
                      <input
                        type="tel"
                        placeholder="0812xxxxxxx"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 bg-white text-[#1E1B2E] rounded-xl text-xs font-medium placeholder-gray-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Punchy Prominent Coral Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#E05A47] to-[#F43F5E] hover:from-[#C94735] hover:to-[#E11D48] text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#E05A47]/40 active:scale-95 flex items-center justify-center gap-2 mt-3"
                  >
                    <span>Kirim & Gabung PageTurners Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Digital Member Card Preview in Pastel Mint & Lavender */
                <div className="bg-white text-[#1E1B2E] p-7 rounded-3xl shadow-2xl border border-[#A7EBD0] space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E1F2]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E05A47] to-[#FB7185] text-white flex items-center justify-center font-display text-xs font-bold shadow-xs">
                        PT
                      </span>
                      <span className="font-display font-extrabold text-base tracking-tight text-[#1E1B2E]">
                        PageTurners Member Card
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#E05A47] bg-[#FFF0ED] px-2.5 py-1 rounded-full">
                      {registeredMember?.id}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase font-mono text-[#059669] font-bold">
                      Selamat Datang di Klub Membaca!
                    </span>
                    <h5 className="font-display text-2xl font-bold text-[#1E1B2E]">
                      {registeredMember?.name}
                    </h5>
                    <div className="text-xs text-[#585170] space-x-1 font-medium">
                      <span>{registeredMember?.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span>Genre Favorit: {registeredMember?.favGenre}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#E6F8F0] border border-[#A7EBD0] rounded-2xl text-xs text-[#065F46] flex items-center gap-2.5 font-medium">
                    <Award className="w-5 h-5 text-[#059669] shrink-0" />
                    <span>Status: Anggota Aktif Resmi PageTurners SMA ({registeredMember?.joinedDate})</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-[#585170]">
                      Sampai jumpa di Friday Book Talk berikutnya!
                    </span>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-[#E05A47] hover:underline"
                    >
                      Daftar Lagi
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
