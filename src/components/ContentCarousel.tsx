import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { ContentRow } from '@/data/mockData';
import ContentCard from './ContentCard';
import { Button } from '@/components/ui/button';

interface ContentCarouselProps {
  row: ContentRow;
}

const ContentCarousel = ({ row }: ContentCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isContinueWatching = row.id === 'continue-watching';

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const cardWidth = 280 + 16; // card width + gap
    const visibleCards = Math.floor(container.clientWidth / cardWidth);
    const scrollAmount = cardWidth * Math.max(1, visibleCards - 1);
    
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(
          container.scrollWidth - container.clientWidth,
          scrollPosition + scrollAmount
        );
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current 
    ? scrollPosition < containerRef.current.scrollWidth - containerRef.current.clientWidth
    : true;

  return (
    <div className="group relative py-6">
      {/* Section Title */}
      <div className="mb-4 px-4 lg:px-6">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-neon-green transition-colors">
          {row.title}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white hover:text-neon-green p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white hover:text-neon-green p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Cards Container */}
        <div 
          ref={containerRef}
          className="flex gap-4 px-4 lg:px-6 overflow-x-auto custom-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {row.items.map((item) => (
            <ContentCard 
              key={item.id} 
              item={item} 
              showProgress={isContinueWatching}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;