export interface ContentItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  genre: string[];
  rating: number;
  year: number;
  duration: string;
  type: 'movie' | 'series';
  progress?: number; // For continue watching
}

export interface ContentRow {
  id: string;
  title: string;
  items: ContentItem[];
}

// Mock data for HexShow streaming platform
export const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Neon Genesis',
    description: 'In a dystopian future where technology and humanity collide, a group of rebels fights against an oppressive AI system.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    rating: 8.9,
    year: 2024,
    duration: '2h 15m',
    type: 'movie'
  },
  {
    id: '2',
    title: 'Cyber Protocol',
    description: 'A hacker discovers a conspiracy that goes deeper than the digital world in this mind-bending cyber thriller.',
    poster: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1920&h=1080&fit=crop',
    genre: ['Thriller', 'Mystery', 'Sci-Fi'],
    rating: 8.7,
    year: 2024,
    duration: '1 Season',
    type: 'series'
  },
  {
    id: '3',
    title: 'Electric Dreams',
    description: 'An anthology series exploring the intersection of technology and human emotion in near-future scenarios.',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    genre: ['Drama', 'Sci-Fi', 'Anthology'],
    rating: 8.5,
    year: 2024,
    duration: '2 Seasons',
    type: 'series',
    progress: 65
  },
  {
    id: '4',
    title: 'Quantum Shift',
    description: 'When reality becomes unstable, a team of scientists must navigate parallel dimensions to save existence itself.',
    poster: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 9.1,
    year: 2024,
    duration: '2h 45m',
    type: 'movie'
  },
  {
    id: '5',
    title: 'Neural Network',
    description: 'In a world where minds can be hacked, a detective investigates crimes that blur the line between thought and reality.',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
    genre: ['Crime', 'Sci-Fi', 'Thriller'],
    rating: 8.8,
    year: 2024,
    duration: '1 Season',
    type: 'series'
  },
  {
    id: '6',
    title: 'Digital Horizon',
    description: 'A space crew discovers an alien AI that challenges everything they know about consciousness and reality.',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop',
    genre: ['Space', 'Sci-Fi', 'Mystery'],
    rating: 8.6,
    year: 2023,
    duration: '2h 10m',
    type: 'movie',
    progress: 32
  },
  {
    id: '7',
    title: 'Code Rebellion',
    description: 'Underground hackers fight against corporate surveillance in this high-stakes digital warfare series.',
    poster: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1920&h=1080&fit=crop',
    genre: ['Action', 'Thriller', 'Drama'],
    rating: 8.4,
    year: 2024,
    duration: '2 Seasons',
    type: 'series'
  },
  {
    id: '8',
    title: 'Synthetic Minds',
    description: 'When AI becomes indistinguishable from human consciousness, society must confront the nature of intelligence itself.',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    genre: ['Drama', 'Sci-Fi', 'Philosophy'],
    rating: 9.0,
    year: 2024,
    duration: '1h 55m',
    type: 'movie'
  },
  {
    id: '9',
    title: 'Virtual Reality',
    description: 'Players trapped in a VR world must complete increasingly dangerous challenges to escape back to reality.',
    poster: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=1080&fit=crop',
    genre: ['Adventure', 'Thriller', 'Sci-Fi'],
    rating: 8.2,
    year: 2023,
    duration: '3 Seasons',
    type: 'series',
    progress: 78
  },
  {
    id: '10',
    title: 'Neon Nights',
    description: 'In a cyberpunk metropolis, a detective uncovers a conspiracy involving synthetic humans and corporate espionage.',
    poster: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=450&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop',
    genre: ['Noir', 'Cyberpunk', 'Crime'],
    rating: 8.9,
    year: 2024,
    duration: '2h 20m',
    type: 'movie'
  }
];

// Content rows for different sections
export const contentRows: ContentRow[] = [
  {
    id: 'featured',
    title: 'Featured Content',
    items: mockContent.slice(0, 8)
  },
  {
    id: 'recommended',
    title: 'Recommended for You',
    items: mockContent.slice(2, 10)
  },
  {
    id: 'popular',
    title: 'Popular on HexShow',
    items: [...mockContent].sort(() => Math.random() - 0.5).slice(0, 8)
  },
  {
    id: 'new-releases',
    title: 'New Releases',
    items: mockContent.filter(item => item.year === 2024).slice(0, 8)
  },
  {
    id: 'continue-watching',
    title: 'Continue Watching',
    items: mockContent.filter(item => item.progress).slice(0, 6)
  },
  {
    id: 'sci-fi',
    title: 'Sci-Fi Favorites',
    items: mockContent.filter(item => item.genre.includes('Sci-Fi')).slice(0, 8)
  },
  {
    id: 'thrillers',
    title: 'Edge-of-Your-Seat Thrillers',
    items: mockContent.filter(item => item.genre.includes('Thriller')).slice(0, 8)
  }
];

export const featuredContent = mockContent[0]; // For hero section