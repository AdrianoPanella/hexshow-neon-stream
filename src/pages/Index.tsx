import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ContentCarousel from '@/components/ContentCarousel';
import Footer from '@/components/Footer';
import { contentRows, featuredContent } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection content={featuredContent} />
      
      {/* Content Rows */}
      <div className="space-y-8 pb-12">
        {contentRows.map((row) => (
          <ContentCarousel key={row.id} row={row} />
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
