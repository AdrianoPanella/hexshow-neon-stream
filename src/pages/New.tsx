import Navbar from '@/components/Navbar';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { mockContent } from '@/data/mockData';

const New = () => {
  // Filter for new content (released in 2024 or marked as new)
  const newContent = mockContent.filter(item => item.isNew || item.year === 2024);
  const popularContent = [...mockContent].sort((a, b) => b.rating - a.rating);
  
  const newReleases = { id: 'new-releases', title: 'New Releases', items: newContent };
  const popular = { id: 'popular-now', title: 'Popular Now', items: popularContent.slice(0, 8) };
  const trendingThisWeek = { 
    id: 'trending-week', 
    title: 'Trending This Week', 
    items: [...mockContent].sort(() => Math.random() - 0.5).slice(0, 8) 
  };
  const justAdded = { 
    id: 'just-added', 
    title: 'Just Added', 
    items: newContent.slice(0, 8) 
  };

  const rows = [newReleases, popular, trendingThisWeek, justAdded].filter(row => row.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="text-3xl md:text-4xl font-bold font-brand text-neon-green">
            New & Popular
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay up to date with the latest releases and trending content
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

export default New;