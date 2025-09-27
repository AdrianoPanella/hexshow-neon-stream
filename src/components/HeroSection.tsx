import { Play, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentItem } from '@/data/mockData';
import cyberBg from '@/assets/cyber-bg.jpg';

interface HeroSectionProps {
  content: ContentItem;
}

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cyberBg})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            {/* Genre Tags */}
            <div className="flex gap-2">
              {content.genre.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-cyber-card/80 backdrop-blur-sm text-xs font-medium rounded-full border border-neon-green/30"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-brand text-neon-green leading-tight">
              {content.title}
            </h1>

            {/* Rating and Details */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-neon-green font-semibold">★ {content.rating}</span>
                <span className="text-muted-foreground">{content.year}</span>
                <span className="text-muted-foreground">{content.duration}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/90 leading-relaxed max-w-xl">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                className="bg-neon-green hover:bg-neon-green/90 text-black font-semibold px-8 py-3 text-base transition-all hover:scale-105 hover:glow-neon-green"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Now
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-neon-purple hover:border-neon-purple hover:bg-neon-purple/10 text-neon-purple hover:text-neon-purple px-8 py-3 text-base transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to List
              </Button>
              
              <Button 
                variant="ghost" 
                className="hover:bg-cyber-card/80 backdrop-blur-sm text-foreground hover:text-neon-green px-6 py-3 text-base transition-all"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default HeroSection;