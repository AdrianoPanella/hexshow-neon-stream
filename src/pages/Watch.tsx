import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockContent } from '@/data/mockData';
import { updateProgress, getProgress, formatTime } from '@/store/progressStore';

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const content = mockContent.find(item => item.id === id);

  useEffect(() => {
    if (!content) {
      navigate('/');
      return;
    }

    // Load saved progress
    const progress = getProgress(content.id);
    if (progress && videoRef.current) {
      videoRef.current.currentTime = progress.lastPositionSec;
    }
  }, [content, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Update progress every 5 seconds
      if (content && Math.floor(video.currentTime) % 5 === 0) {
        updateProgress(content.id, video.currentTime, video.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [content]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    video.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    // Hide controls after 3 seconds of inactivity
    setTimeout(() => setShowControls(false), 3000);
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Content not found</h1>
          <Button onClick={() => navigate('/')} className="bg-neon-green hover:bg-neon-green/90 text-black">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Video Player */}
      <video
        ref={videoRef}
        src={content.videoUrl}
        className="w-full h-screen object-contain"
        autoPlay
        onClick={togglePlay}
      />

      {/* Back Button - Always visible */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      </div>

      {/* Content Info - Top */}
      <div className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div className="mt-12">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{content.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span>★ {content.rating}</span>
              <span>{content.year}</span>
              <span>{content.duration}</span>
              <span className="capitalize">{content.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls - Bottom */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-neon-green rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="sm"
                className="hover:bg-white/20 text-white p-2"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
              </Button>

              <Button
                onClick={toggleMute}
                variant="ghost"
                size="sm"
                className="hover:bg-white/20 text-white p-2"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>

              <div className="text-sm text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="hover:bg-white/20 text-white p-2"
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;