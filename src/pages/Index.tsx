import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { contentRows, featuredContent, mockContent } from '@/data/mockData';
import { getContinueWatchingItems } from '@/store/progressStore';

const Index = () => {
  // Get continue watching items dynamically
  const continueWatchingIds = getContinueWatchingItems();
  const continueWatchingItems = continueWatchingIds
    .map(id => mockContent.find(item => item.id === id))
    .filter(Boolean) as typeof mockContent;

  // Create updated content rows with dynamic continue watching
  const updatedContentRows = [
    ...contentRows.filter(row => row.id !== 'continue-watching'), // Remove static continue watching
    ...(continueWatchingItems.length > 0 ? [{
      id: 'continue-watching',
      title: 'Continue Watching',
      items: continueWatchingItems
    }] : []) // Only add if there are items
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection content={featuredContent} />
      
      {/* Content Rows */}
      <div className="space-y-8 pb-12">
        {updatedContentRows.map((row) => (
          <ContentCarousel key={row.id} row={row} />
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
