import Navbar from '@/components/Navbar';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { mockContent } from '@/data/mockData';

const Series = () => {
  const seriesContent = mockContent.filter(item => item.type === 'series');
  
  // Group series by genres for different rows
  const allSeries = { id: 'all-series', title: 'All Series', items: seriesContent };
  const sciFiSeries = { 
    id: 'sci-fi-series', 
    title: 'Sci-Fi Series', 
    items: seriesContent.filter(item => item.genre.includes('Sci-Fi')) 
  };
  const thrillerSeries = { 
    id: 'thriller-series', 
    title: 'Thriller Series', 
    items: seriesContent.filter(item => item.genre.includes('Thriller')) 
  };
  const dramaSeries = { 
    id: 'drama-series', 
    title: 'Drama Series', 
    items: seriesContent.filter(item => item.genre.includes('Drama')) 
  };

  const rows = [allSeries, sciFiSeries, thrillerSeries, dramaSeries].filter(row => row.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="text-3xl md:text-4xl font-bold font-brand text-neon-green">
            Series
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore our collection of binge-worthy series
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

export default Series;