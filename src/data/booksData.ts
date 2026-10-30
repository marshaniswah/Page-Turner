import { Book } from '../types/book';

export const BOOKS_DATA: Book[] = [
  {
    id: 'bumi-tere-liye',
    title: 'Bumi',
    author: 'Tere Liye',
    originalYear: 2014,
    category: 'Fiksi & Petualangan',
    pages: 440,
    readTimeHours: 6.5,
    rating: 4.9,
    reviewCount: 3410,
    coverPalette: {
      bgFrom: '#1A365D',
      bgTo: '#0F172A',
      accent: '#38BDF8',
      textColor: '#F0F9FF',
      pattern: 'stars',
    },
    synopsis: 'Kisah Raib, siswi SMA berusia 15 tahun yang tampak biasa namun memiliki rahasia besar: ia bisa menghilang hanya dengan menutup wajahnya dengan kedua telapak tangan. Bersama Seli yang bisa mengeluarkan petir dan Ali si jenius super usil, mereka terlempar ke Klan Bulan dan membuka gerbang dunia paralel yang penuh bahaya.',
    literaryContext: 'Buku pertama dari serial Dunia Paralel karya Tere Liye yang menjadi bacaan fiksi petualangan paling digemari remaja dan siswa SMA di seluruh Indonesia.',
    tags: ['Dunia Paralel', 'Persahabatan SMA', 'Kekuatan Unik', 'Petualangan Seru'],
    mood: 'Menggugah Aksi & Pikiran',
    excerpt: {
      chapterTitle: 'Bab 1: Menutup Wajah dengan Telapak Tangan',
      content: [
        'Namaku Raib. Umurku lima belas tahun, duduk di kelas sepuluh SMA. Aku anak perempuan sama seperti kalian, punya teman-teman yang asyik, orang tua yang penyayang, dan dua ekor kucing lucu bernama si Putih dan si Hitam.',
        'Tapi aku punya satu rahasia kecil yang tak pernah kuceritakan pada siapa pun: sejak kecil, jika aku menutup wajahku dengan kedua telapak tangan, aku bisa menghilang seketika.',
        'Awalnya aku mengira ini hanya trik sulap khayalan anak kecil. Sampai suatu sore di tiang gardu listrik belakang sekolah, petir menyambar tiang besi tepat di samping meja belajarku, dan Ali menatapku dengan mata melotot.',
        'Sejak hari itu, kehidupan SMA-ku yang tenang berubah total menjadi petualangan melintasi gerbang dunia yang tak pernah kubayangkan sebelumnya.'
      ]
    },
    keyQuote: {
      text: 'Sahabat sejati bukan mereka yang selalu sepakat dalam segala hal, melainkan mereka yang tetap berdiri di sisimu saat dunia paralel runtuh.',
      speakerOrContext: 'Raib, Seli, dan Ali'
    },
    userReviews: [
      {
        id: 'rev-1',
        userName: 'Nabila (Kelas XI IPA 2)',
        rating: 5,
        date: '20 Oktober 2026',
        comment: 'Seru banget! Karakter Ali kocak tapi jenius parah. Sangat direkomendasikan buat teman-teman SMA yang suka cerita petualangan fantasi!'
      },
      {
        id: 'rev-2',
        userName: 'Reza (Kelas X IPS 1)',
        rating: 5,
        date: '12 Oktober 2026',
        comment: 'Plot twist-nya nggak ketebak. Sekali baca langsung nggak bisa berhenti sampai halaman terakhir.'
      }
    ]
  },
  {
    id: 'negeri-5-menara',
    title: 'Negeri 5 Menara',
    author: 'A. Fuadi',
    originalYear: 2009,
    category: 'Inspirasi & Remaja',
    pages: 423,
    readTimeHours: 6.2,
    rating: 4.88,
    reviewCount: 2850,
    coverPalette: {
      bgFrom: '#1E3A2F',
      bgTo: '#0D1F18',
      accent: '#F59E0B',
      textColor: '#FDFBF7',
      pattern: 'geometry',
    },
    synopsis: 'Perjalanan Alif dan 5 sahabatnya (Sahibul Menara) dari berbagai pelosok nusantara yang berkumpul di pondok pesantren Madani. Dengan mantra sakti "Man Jadda Wajada" (Siapa yang bersungguh-sungguh, ia akan berhasil), mereka merajut impian menaklukkan lima menara impian dunia di London, Mesir, New York, dan tanah air.',
    literaryContext: 'Buku motivasi dan sastra remaja pemenang Anugerah Pembaca Indonesia. Menginspirasi jutaan pelajar SMA tentang arti kerja keras, kejujuran, dan persahabatan sejati.',
    tags: ['Man Jadda Wajada', 'Cita-Cita Masa Muda', 'Persahabatan', 'Motivasi Belajar'],
    mood: 'Menggugah Aksi & Pikiran',
    excerpt: {
      chapterTitle: 'Bab 3: Mantra Sakti di Bawah Menara',
      content: [
        'Ustadz Salman berdiri tegak di depan kelas, memegang sebilah parang tumpul dan sebatang kayu jati tebal di tangannya.',
        'Dengan tatapan tajam, beliau mengayunkan parang itu berkali-kali ke titik yang sama pada kayu. Satu kali, dua kali, sepuluh kali, hingga pada tebasan ketiga puluh, kayu keras itu terbelah dua.',
        '"Kalian lihat ini?" ujar Ustadz Salman lantang. "Parang ini tumpul, tapi karena diarahkan ke titik yang sama berulang-ulang dengan kesungguhan penuh, ia mampu membelah kayu yang paling keras sekalipun!"',
        'Lalu beliau menuliskan tiga kata di papan tulis yang selamanya terpatri dalam dada kami: Man Jadda Wajada. Siapa yang bersungguh-sungguh, pasti akan berhasil!'
      ]
    },
    keyQuote: {
      text: 'Man Jadda Wajada — Siapa yang bersungguh-sungguh menuntut ilmu dan mengejar mimpi, ia pasti akan berhasil.',
      speakerOrContext: 'Mantra Sahibul Menara'
    },
    userReviews: [
      {
        id: 'rev-3',
        userName: 'Faris (Kelas XII MIPA 4)',
        rating: 5,
        date: '5 Oktober 2026',
        comment: 'Buku ini booster motivasi terbaik waktu lagi capek belajar buat ujian seleksi masuk kuliah. Wajib baca buat semua siswa SMA!'
      }
    ]
  },
  {
    id: 'laut-bercerita',
    title: 'Laut Bercerita',
    author: 'Leila S. Chudori',
    originalYear: 2017,
    category: 'Sastra Populer',
    pages: 379,
    readTimeHours: 6.8,
    rating: 4.92,
    reviewCount: 3100,
    coverPalette: {
      bgFrom: '#0A2540',
      bgTo: '#03101E',
      accent: '#63B3ED',
      textColor: '#F7FAFC',
      pattern: 'waves',
    },
    synopsis: 'Novel yang menyentuh hati tentang persahabatan, cinta, dan kehilangan mendalam para pemuda aktivis mahasiswa. Diceritakan lewat dua sudut pandang: Biru Laut dari dasar samudera yang hening, dan adiknya Asmara Jati yang berjuang bersama keluarga mencari kepastian dan keadilan.',
    literaryContext: 'Pemenang S.E.A. Write Award 2020. Salah satu novel paling populer yang dibaca dan didiskusikan oleh klub membaca remaja di seluruh Indonesia.',
    tags: ['Persahabatan & Empati', 'Sejarah 1998', 'Keluarga & Rindu', 'Buku Favorit'],
    mood: 'Emosional & Menghanyutkan',
    excerpt: {
      chapterTitle: 'Bagian Pertama: Suara dari Kedalaman',
      content: [
        'Mati, bagi kami yang dibuang ke laut, bukanlah ketiadaan suara. Di kedalaman air yang dingin, kenangan justru menjadi satu-satunya hal yang tinggal dan abadi.',
        'Kami tidak pernah ingin menjadi pahlawan. Kami hanya anak-anak muda yang ingin membaca buku tanpa rasa waswas, berdiskusi bebas tanpa ketakutan, dan memimpikan hari esok yang lebih adil.',
        'Aroma masakan tenggiri asam pedas Ibu di hari Minggu sore masih tercium jelas dalam ingatanku.',
        'Untuk adikku Asmara, ketahuilah bahwa kami tak pernah benar-benar lenyap selama keberanian dan kasih sayang kalian masih menyala.'
      ]
    },
    keyQuote: {
      text: 'Menghilang tanpa kabar adalah luka abadi bagi mereka yang ditinggalkan, namun kasih sayang keluarga adalah lentera yang menolak padam.',
      speakerOrContext: 'Biru Laut kepada Asmara'
    },
    userReviews: [
      {
        id: 'rev-4',
        userName: 'Siti Rahma (Kelas XI Bahasa)',
        rating: 5,
        date: '18 Oktober 2026',
        comment: 'Bikin nangis dan makin menghargai pengorbanan anak-anak muda di masa lalu. Ceritanya ditulis dengan sangat indah dan bikin kita lebih berempati.'
      }
    ]
  },
  {
    id: 'filosofi-teras',
    title: 'Filosofi Teras',
    author: 'Henry Manampiring',
    originalYear: 2018,
    category: 'Pengembangan Diri',
    pages: 320,
    readTimeHours: 5.5,
    rating: 4.85,
    reviewCount: 4200,
    coverPalette: {
      bgFrom: '#8C4B27',
      bgTo: '#422110',
      accent: '#F3C98B',
      textColor: '#FFFBF2',
      pattern: 'geometry',
    },
    synopsis: 'Panduan stoisisme praktis yang pas banget untuk remaja dan siswa SMA. Mengajarkan cara jitu mengatasi overthinking tugas sekolah, cemas nilai ujian, drama pertemanan, dan stres akibat membandingkan diri di media sosial lewat konsep "Dikotomi Kendali".',
    literaryContext: 'Mega Best Seller Indonesia peraih Book of the Year IIBF. Ditulis dengan bahasa santai, ilustrasi jenaka, dan contoh kasus kehidupan remaja masa kini.',
    tags: ['Bebas Overthinking', 'Kesehatan Mental SMA', 'Ketenangan Batin', 'Tips Belajar'],
    mood: 'Menenangkan & Hangat',
    excerpt: {
      chapterTitle: 'Bab 3: Mengendalikan yang Bisa Dikendalikan',
      content: [
        'Bayangkan kamu sudah belajar mati-matian semalaman untuk ulangan harian. Besok paginya, soalnya ternyata beda banget dari kisi-kisi atau kamu mendadak kena macet parah di jalan.',
        'Pertanyaannya: apakah tingkat kesulitan soal atau macetnya jalan berada di bawah kendalimu? Jawabannya: sama sekali tidak.',
        'Yang ada di bawah kendalimu adalah: seberapa fokus kamu membaca soal, caramu bersikap tenang, dan bagaimana responmu menghadapi hasil nilai nanti.',
        'Stres pada siswa SMA biasanya bukan karena banyaknya tugas, tapi karena kita menghabiskan energi memikirkan omongan orang lain yang sebenarnya di luar kuasa kita.'
      ]
    },
    keyQuote: {
      text: 'Bukan nilai ujian atau komentar orang yang bikin kamu stres, melainkan caramu sendiri menanggapi dan merespon hal itu.',
      speakerOrContext: 'Henry Manampiring'
    },
    userReviews: [
      {
        id: 'rev-5',
        userName: 'Bima (Kelas X MIPA 1)',
        rating: 5,
        date: '14 Oktober 2026',
        comment: 'Buku penolong di saat lagi overthinking mikirin ranking dan masa depan. Wajib dibaca anak SMA biar hidup lebih santai tapi tetap produktif.'
      }
    ]
  },
  {
    id: 'hujan-tere-liye',
    title: 'Hujan',
    author: 'Tere Liye',
    originalYear: 2016,
    category: 'Misteri & Sains',
    pages: 318,
    readTimeHours: 5.0,
    rating: 4.87,
    reviewCount: 3900,
    coverPalette: {
      bgFrom: '#1E293B',
      bgTo: '#0B132B',
      accent: '#38BDF8',
      textColor: '#F8FAFC',
      pattern: 'waves',
    },
    synopsis: 'Mengisahkan persahabatan dan cinta antara Lail dan Esok di bumi masa depan tahun 2042 yang dilanda bencana alam dahsyat. Ketika teknologi modifikasi ingatan diciptakan untuk menghapus rasa sakit dan memori luka, Lail harus memilih: melupakan kenangan atau berdamai dengan hujan.',
    literaryContext: 'Salah satu novel fiksi sains remaja paling laris di Indonesia yang memadukan teknologi futuristik canggih dengan kehangatan perasaan manusia.',
    tags: ['Sci-Fi Remaja', 'Arti Kenangan', 'Cinta & Harapan', 'Masa Depan'],
    mood: 'Menenangkan & Hangat',
    excerpt: {
      chapterTitle: 'Bab 2: Pertemuan di Gerbong Bawah Tanah',
      content: [
        'Hujan selalu membawa aroma tanah basah dan kenangan yang menolak terhapus oleh waktu.',
        'Di tengah kepanikan kota bawah tanah saat gempa tektonik melanda, sebuah tangan kokoh menarik Lail dari reruntuhan tangga peron. Anak laki-laki itu tersenyum dan berkata, "Jangan takut, kita akan selamat."',
        'Tahun demi tahun berlalu, teknologi dunia melesat dengan mobil terbang dan kapsul pengubah iklim. Namun satu hal yang tak pernah berubah adalah janji untuk saling menjaga saat awan kelabu datang.',
        'Apakah manusia benar-benar perlu menghapus memori pedihnya di mesin modifikasi ingatan, ataukah justru luka itulah yang membuat kita menjadi manusia seutuhnya?'
      ]
    },
    keyQuote: {
      text: 'Bukan melupakan yang membuat kita kuat, melainkan menerima bahwa setiap peristiwa adalah bagian dari kedewasaan kita.',
      speakerOrContext: 'Esok kepada Lail'
    },
    userReviews: [
      {
        id: 'rev-6',
        userName: 'Dinda (Kelas XI IPS 3)',
        rating: 5,
        date: '9 Oktober 2026',
        comment: 'Konsep sci-fi masa depannya keren banget dan ceritanya bikin baper tapi juga sarat pesan moral tentang ikhlas.'
      }
    ]
  },
  {
    id: 'laskar-pelangi',
    title: 'Laskar Pelangi',
    author: 'Andrea Hirata',
    originalYear: 2005,
    category: 'Inspirasi & Remaja',
    pages: 529,
    readTimeHours: 7.5,
    rating: 4.89,
    reviewCount: 4500,
    coverPalette: {
      bgFrom: '#2A4365',
      bgTo: '#1A202C',
      accent: '#F6E05E',
      textColor: '#FEFCBF',
      pattern: 'foliage',
    },
    synopsis: 'Kisah penuh tawa, haru, dan keajaiban dari 10 anak kampung di Belitung (Laskar Pelangi) dan dua guru berhati mulia, Bu Muslimah dan Pak Harfan, yang berjuang mempertahankan sekolah reot mereka agar tidak ditutup.',
    literaryContext: 'Karya legendaris Indonesia yang telah diterjemahkan ke dalam puluhan bahasa dunia dan menginspirasi jutaan generasi muda tentang keajaiban pendidikan.',
    tags: ['Persahabatan Sejati', 'Semangat Belajar', 'Inspirasi Sekolah', 'Belitung'],
    mood: 'Menggugah Aksi & Pikiran',
    excerpt: {
      chapterTitle: 'Bab 1: Sepuluh Anak yang Menyelamatkan Sekolah',
      content: [
        'Pagi itu, kami duduk di bangku kayu panjang yang goyang, menatap pintu kelas dengan jantung berdebar kencang.',
        'Syarat agar SD Muhammadiyah Gantong tidak ditutup oleh pengawas sekolah adalah harus ada minimal sepuluh orang murid baru. Sementara kami yang duduk di kelas baru berjumlah sembilan orang.',
        'Bu Muslimah sudah menyeka air matanya dengan ujung jilbab. Tepat ketika Pak Harfan hendak menyampaikan pidato penutupan sekolah, tiba-tiba seorang anak melompat turun dari boncengan sepeda tua: Harun!',
        'Sejak detik itulah petualangan sepuluh anak Laskar Pelangi dimulai, membuktikan bahwa mimpi anak miskin berhak terbang setinggi pelangi di langit Belitung.'
      ]
    },
    keyQuote: {
      text: 'Hiduplah untuk memberi sebanyak-banyaknya, bukan untuk menerima sebanyak-banyaknya.',
      speakerOrContext: 'Pesan Pak Harfan'
    },
    userReviews: [
      {
        id: 'rev-7',
        userName: 'Rian (Kelas XII Bahasa)',
        rating: 5,
        date: '28 September 2026',
        comment: 'Karakter Lintang benar-benar inspiratif! Bikin kita yang fasilitasnya lengkap jadi malu kalau malas belajar.'
      }
    ]
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    translator: 'Alex Tri Kantjono',
    originalYear: 2018,
    category: 'Pengembangan Diri',
    pages: 352,
    readTimeHours: 5.8,
    rating: 4.9,
    reviewCount: 5200,
    coverPalette: {
      bgFrom: '#1E293B',
      bgTo: '#0F172A',
      accent: '#F59E0B',
      textColor: '#F8FAFC',
      pattern: 'geometry',
    },
    synopsis: 'Buku panduan membangun kebiasaan positif yang sangat mudah diterapkan oleh pelajar SMA. Belajar konsisten membaca 10 halaman setiap hari atau belajar fokus 25 menit (Teknik Pomodoro) dapat mendongkrak prestasi belajarmu secara drastis lewat efek bunga majemuk kebiasaan.',
    literaryContext: 'Terjual belasan juta eksemplar di dunia dan jadi referensi utama para juara kelas dan mahasiswa berprestasi.',
    tags: ['Tips Produktif SMA', '1% Tiap Hari', 'Fokus Belajar', 'Manajemen Waktu'],
    mood: 'Menggugah Aksi & Pikiran',
    excerpt: {
      chapterTitle: 'Bab 1: Kekuatan Ajaib 1% Perubahan Kecil',
      content: [
        'Banyak siswa mengira bahwa untuk jadi juara kelas atau meraih nilai tinggi, kita harus melakukan perubahan raksasa dalam semalam.',
        'Padahal rahasia orang-orang berprestasi justru terletak pada kebiasaan mikro yang dilakukan setiap hari. Jika kamu bisa berkembang 1% saja lebih baik setiap hari selama satu tahun, kamu akan menjadi 37 kali lebih baik di akhir tahun!',
        'Jangan fokus pada target yang muluk-muluk; fokuslah pada sistem belajar harianmu.',
        'Kamu tidak naik ke tingkat impianmu, kamu jatuh ke tingkat sistem yang kamu jalankan setiap hari.'
      ]
    },
    keyQuote: {
      text: 'Kalian tidak naik ke tingkat impian kalian, melainkan jatuh ke tingkat kebiasaan yang kalian bangun setiap hari.',
      speakerOrContext: 'James Clear'
    },
    userReviews: [
      {
        id: 'rev-8',
        userName: 'Ayu (Kelas XI MIPA 1)',
        rating: 5,
        date: '15 Oktober 2026',
        comment: 'Tips 2-minute rule di buku ini ngebantu banget ngilangin rasa mager waktu mau mulai ngerjain PR sekolah!'
      }
    ]
  },
  {
    id: 'dilan-1990',
    title: 'Dilan: Dia adalah Dilanku Tahun 1990',
    author: 'Pidi Baiq',
    originalYear: 2014,
    category: 'Inspirasi & Remaja',
    pages: 332,
    readTimeHours: 4.8,
    rating: 4.86,
    reviewCount: 3800,
    coverPalette: {
      bgFrom: '#4C1D95',
      bgTo: '#1E1B4B',
      accent: '#F472B6',
      textColor: '#FDF4FF',
      pattern: 'minimal',
    },
    synopsis: 'Kisah masa SMA di Bandung tahun 1990 antara Milea, siswi pindahan dari Jakarta, dengan Dilan, siswa cerdas, anggota geng motor, dan pujangga kata-kata kocak yang unik. Menghadirkan nostalgia masa sekolah, pertemanan akrab, dan masa remaja yang polos tanpa gawai.',
    literaryContext: 'Novel remaja paling fenomenal di Indonesia yang sukses memecahkan rekor adaptasi film layar lebar.',
    tags: ['Masa SMA Seru', 'Humor Remaja', 'Persahabatan', 'Bandung 1990'],
    mood: 'Menenangkan & Hangat',
    excerpt: {
      chapterTitle: 'Bab 1: Ramalan di Depan Sekolah',
      content: [
        'Aku tidak pernah menyangka bahwa kepindahanku dari Jakarta ke sebuah SMA di Bandung akan mempertemukanku dengan anak laki-laki paling aneh di muka bumi.',
        'Sore itu di jalan setapak depan gerbang sekolah, dia mengendarai motor CB tua dan menyejajariku. Bukannya meminta nomor telepon, dia justru berkata dengan nada sok serius: "Boleh aku meramal? Nanti sore kita akan bertemu di kantin."',
        'Caranya mendekati orang lain selalu di luar dugaan, tidak klise, dan selalu berhasil membuat orang tertawa.',
        'Masa SMA tahun 1990 itu sederhana: tidak ada smartphone atau pesan instan, yang ada hanya obrolan langsung di bawah rindangnya pohon asam Jawa.'
      ]
    },
    keyQuote: {
      text: 'Jangan rindu, berat. Kamu tidak akan kuat, biar aku saja.',
      speakerOrContext: 'Dilan kepada Milea'
    },
    userReviews: [
      {
        id: 'rev-9',
        userName: 'Karin (Kelas X IPS 2)',
        rating: 5,
        date: '2 Oktober 2026',
        comment: 'Lucu banget dan bikin senyum-senyum sendiri. Penggambaran suasana SMA-nya asyik dan bikin pengen menikmati masa sekolah.'
      }
    ]
  },
  {
    id: 'the-alchemist',
    title: 'The Alchemist: Sang Alkemis',
    author: 'Paulo Coelho',
    translator: 'Tanti Lesmana',
    originalYear: 1988,
    category: 'Fiksi & Petualangan',
    pages: 216,
    readTimeHours: 4.0,
    rating: 4.87,
    reviewCount: 2900,
    coverPalette: {
      bgFrom: '#78350F',
      bgTo: '#451A03',
      accent: '#FDE047',
      textColor: '#FEFCE8',
      pattern: 'geometry',
    },
    synopsis: 'Kisah memikat tentang Santiago, seorang pemuda pengembala domba Andalusia yang berani meninggalkan zona nyamannya untuk melintasi padang pasir Afrika demi mencari harta karun di Piramida Mesir. Sebuah petualangan yang mengajarkan remaja untuk mendengarkan kata hati dan mengejar Takdir Pribadi.',
    literaryContext: 'Buku fabel modern legendaris dunia yang telah diterjemahkan ke lebih dari 80 bahasa dan menjadi bacaan wajib klub literasi pemuda internasional.',
    tags: ['Mengejar Impian', 'Petualangan Padang Pasir', 'Filosofi Hidup', 'Klasik Dunia'],
    mood: 'Reflektif & Filosofis',
    excerpt: {
      chapterTitle: 'Bab 2: Petualangan Menyeberang Selat',
      content: [
        'Anak muda itu menatap kawanan dombanya. Ia menyayangi mereka, tapi ia tahu bahwa jika ia terus tinggal di padang rumput yang sama, ia tak akan pernah tahu apa yang ada di balik cakrawala luas.',
        'Seorang raja tua di kota Tarifa pernah berbisik kepadanya: "Ketika kau benar-benar menginginkan sesuatu dengan segenap hatimu, seluruh alam semesta akan berkonspirasi membantumu mencapainya."',
        'Padang pasir tampak garang dan tak bertepi, namun Santiago belajar bahwa butir-butir pasir pun berbicara dengan bahasa yang sama: Bahasa Jiwa Semesta.',
        'Keberanian melangkah keluar dari kenyamanan adalah kunci pertama untuk menemukan harta karun terbesar yang tersimpan dalam diri kita sendiri.'
      ]
    },
    keyQuote: {
      text: 'Ketika kau benar-benar menginginkan sesuatu untuk mewujudkan impianmu, seluruh alam semesta akan bersatu membantumu mencapainya.',
      speakerOrContext: 'Raja Melkisedek kepada Santiago'
    },
    userReviews: [
      {
        id: 'rev-10',
        userName: 'Aldo (Kelas XII MIPA 2)',
        rating: 5,
        date: '19 September 2026',
        comment: 'Buku pendek tapi maknanya nendang banget buat kita siswa SMA yang lagi bimbang milih jurusan kuliah dan arah masa depan.'
      }
    ]
  },
  {
    id: 'hujan-bulan-juni',
    title: 'Hujan Bulan Juni',
    author: 'Sapardi Djoko Damono',
    originalYear: 1994,
    category: 'Puisi & Seni',
    pages: 144,
    readTimeHours: 2.2,
    rating: 4.88,
    reviewCount: 2600,
    coverPalette: {
      bgFrom: '#1A2A3A',
      bgTo: '#0B131C',
      accent: '#90CDF4',
      textColor: '#F0F8FF',
      pattern: 'waves',
    },
    synopsis: 'Kumpulan puisi liris legendaris yang sangat ramah bagi siswa SMA yang ingin mulai menyukai seni sastra. Mengajarkan kelembutan bertutur, ketabahan dalam diam, dan keindahan cinta yang sederhana tanpa kata-kata berlebihan.',
    literaryContext: 'Puisi paling terkenal karya Guru Besar Sastra Universitas Indonesia, sering dibawakan dalam lomba musikalisasi puisi dan resitasi sastra SMA.',
    tags: ['Puisi SMA', 'Musikalisasi Puisi', 'Sederhana & Indah', 'Sastra Indonesia'],
    mood: 'Menenangkan & Hangat',
    excerpt: {
      chapterTitle: 'Sajak Pilihan: Hujan Bulan Juni',
      content: [
        'Tak ada yang lebih tabah / dari hujan bulan Juni / dirahasiakannya rintik rindunya / kepada pohon berbunga itu.',
        'Tak ada yang lebih bijak / dari hujan bulan Juni / dihapuskannya jejak-jejak kakinya / yang ragu-ragu di jalan itu.',
        'Tak ada yang lebih arif / dari hujan bulan Juni / dibiarkannya yang tak terucapkan / diserap akar pohon bunga itu.',
        'Aku ingin mencintaimu dengan sederhana: / dengan kata yang tak sempat diucapkan / kayu kepada api yang menjadikannya abu.'
      ]
    },
    keyQuote: {
      text: 'Tak ada yang lebih tabah dari hujan bulan Juni, dirahasiakannya rintik rindunya kepada pohon berbunga itu.',
      speakerOrContext: 'Sapardi Djoko Damono'
    },
    userReviews: [
      {
        id: 'rev-11',
        userName: 'Gita (Kelas XI IPS 1)',
        rating: 5,
        date: '10 Oktober 2026',
        comment: 'Sangat cocok dibaca sore hari pas istirahat belajar. Puisi-puisinya sederhana tapi maknanya nancep banget.'
      }
    ]
  }
];
