import Navbar from '@/components/Navbar';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { mockContent } from '@/data/mockData';

const Movies = () => {
  const movieContent = mockContent.filter(item => item.type === 'movie');
  
  // Group movies by genres for different rows
  const allMovies = { id: 'all-movies', title: 'All Movies', items: movieContent };
  const sciFiMovies = { 
    id: 'sci-fi-movies', 
    title: 'Sci-Fi Movies', 
    items: movieContent.filter(item => item.genre.includes('Sci-Fi')) 
  };
  const actionMovies = { 
    id: 'action-movies', 
    title: 'Action Movies', 
    items: movieContent.filter(item => item.genre.includes('Action')) 
  };
  const thrillerMovies = { 
    id: 'thriller-movies', 
    title: 'Thriller Movies', 
    items: movieContent.filter(item => item.genre.includes('Thriller')) 
  };

  const rows = [allMovies, sciFiMovies, actionMovies, thrillerMovies].filter(row => row.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="text-3xl md:text-4xl font-bold font-brand text-neon-green">
            Movies
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover blockbuster movies and hidden gems
          </p>
        </div>
      </div>

      {/* Content Rows */}
      <div className="space-y-8 pb-12">
        {rows.map((row) => (
          <ContentCarousel key={row.id} row={row} />
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Movies;