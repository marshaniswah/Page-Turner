export type BookCategory = 
  | 'Semua'
  | 'Fiksi & Petualangan'
  | 'Inspirasi & Remaja'
  | 'Pengembangan Diri'
  | 'Misteri & Sains'
  | 'Sastra Populer'
  | 'Puisi & Seni';

export interface ClubActivity {
  id: string;
  title: string;
  dayTime: string;
  location: string;
  description: string;
  badge: string;
  facilitator: string;
}

export interface ClubMember {
  id: string;
  name: string;
  grade: string;
  favGenre: string;
  joinedDate: string;
}

export type ReadingMood = 
  | 'Semua Mood'
  | 'Reflektif & Filosofis'
  | 'Emosional & Menghanyutkan'
  | 'Menenangkan & Hangat'
  | 'Menggugah Aksi & Pikiran';

export interface BookReview {
  id: string;
  userName: string;
  rating: number; // 1-5
  date: string;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  translator?: string;
  originalYear: number;
  category: BookCategory;
  pages: number;
  readTimeHours: number;
  rating: number; // 4.5 - 5.0
  reviewCount: number;
  coverPalette: {
    bgFrom: string;
    bgTo: string;
    accent: string;
    textColor: string;
    pattern: 'batik' | 'waves' | 'geometry' | 'foliage' | 'stars' | 'minimal';
  };
  synopsis: string;
  literaryContext: string;
  tags: string[];
  mood: ReadingMood;
  excerpt: {
    chapterTitle: string;
    content: string[];
  };
  keyQuote: {
    text: string;
    speakerOrContext: string;
  };
  userReviews: BookReview[];
}

export type ShelfStatus = 'reading' | 'want_to_read' | 'finished';

export interface ShelfItem {
  bookId: string;
  status: ShelfStatus;
  currentPage: number;
  totalPages: number;
  startedDate?: string;
  finishedDate?: string;
  personalNotes?: string;
  personalRating?: number;
  customBook?: {
    title: string;
    author: string;
    category: string;
    totalPages: number;
  };
}

export interface LiteraryQuote {
  id: string;
  text: string;
  author: string;
  sourceBook: string;
  year?: number;
  theme: string;
}
