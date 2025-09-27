import { useState } from 'react';
import { Play, Plus, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContentItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAllLists, addToList, createList } from '@/store/listsStore';
import { getProgressPercentage } from '@/store/progressStore';

interface ContentCardProps {
  item: ContentItem;
  showProgress?: boolean;
}

const ContentCard = ({ item, showProgress = false }: ContentCardProps) => {
  const navigate = useNavigate();
  const [lists, setLists] = useState(getAllLists());
  
  const progressPercentage = getProgressPercentage(item.id);
  const actualProgress = showProgress && progressPercentage > 0 ? progressPercentage : (item.progress || 0);

  const handlePlay = () => {
    if (item.videoUrl) {
      navigate(`/watch/${item.id}`);
    }
  };

  const handleAddToList = (listName: string) => {
    if (listName === 'create-new') {
      const newListName = prompt('Enter list name:');
      if (newListName?.trim()) {
        createList(newListName.trim());
        addToList(newListName.trim(), item.id);
        setLists(getAllLists());
      }
    } else {
      addToList(listName, item.id);
    }
  };

  return (
    <div className="group relative min-w-[280px] h-[380px] content-card cursor-pointer">
      {/* Poster Image */}
      <div className="relative w-full h-[300px] overflow-hidden rounded-t-lg">
        <img
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Progress Bar for Continue Watching */}
        {(showProgress || actualProgress > 0) && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="w-full bg-muted/30 h-1">
              <div 
                className="h-full bg-neon-green transition-all duration-300"
                style={{ width: `${actualProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 mb-3">
              <Button 
                size="sm" 
                onClick={handlePlay}
                disabled={!item.videoUrl}
                className="bg-neon-green hover:bg-neon-green/90 text-black p-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
              </Button>
              
              {/* Add to List Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-neon-purple text-neon-purple hover:bg-neon-purple/10 p-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-cyber-card border-cyber-border">
                  {Object.keys(lists).map((listName) => (
                    <DropdownMenuItem
                      key={listName}
                      onClick={() => handleAddToList(listName)}
                      className="hover:bg-cyber-border focus:bg-cyber-border"
                    >
                      Add to {listName}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    onClick={() => handleAddToList('create-new')}
                    className="hover:bg-cyber-border focus:bg-cyber-border border-t border-cyber-border"
                  >
                    Create new list...
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <p className="text-xs text-white/90 line-clamp-2 leading-tight">
              {item.description}
            </p>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-neon-green text-neon-green" />
          <span className="text-xs font-medium text-white">{item.rating}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 space-y-2 h-[80px] flex flex-col justify-between">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-neon-green transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{item.year}</span>
          <span>•</span>
          <span>{item.duration}</span>
          <span>•</span>
          <span className="capitalize">{item.type}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;