import { getStorageItem, setStorageItem } from '@/lib/storage';

export interface ProgressData {
  lastPositionSec: number;
  durationSec: number;
  lastPlayedAtISO: string;
}

export interface ProgressMap {
  [contentId: string]: ProgressData;
}

const PROGRESS_STORAGE_KEY = 'hexshow:progress';

export const getProgress = (contentId: string): ProgressData | null => {
  const progress = getStorageItem<ProgressMap>(PROGRESS_STORAGE_KEY, {});
  return progress[contentId] || null;
};

export const getAllProgress = (): ProgressMap => {
  return getStorageItem<ProgressMap>(PROGRESS_STORAGE_KEY, {});
};

export const updateProgress = (
  contentId: string, 
  lastPositionSec: number, 
  durationSec: number
): void => {
  const progress = getAllProgress();
  
  // If watched more than 95%, remove from continue watching
  const percentWatched = (lastPositionSec / durationSec) * 100;
  if (percentWatched >= 95) {
    delete progress[contentId];
  } else if (lastPositionSec > 0) {
    // Only track if there's actual progress
    progress[contentId] = {
      lastPositionSec,
      durationSec,
      lastPlayedAtISO: new Date().toISOString()
    };
  } else {
    // Remove if starting from 0
    delete progress[contentId];
  }
  
  setStorageItem(PROGRESS_STORAGE_KEY, progress);
};

export const getProgressPercentage = (contentId: string): number => {
  const progress = getProgress(contentId);
  if (!progress) return 0;
  
  return Math.round((progress.lastPositionSec / progress.durationSec) * 100);
};

export const getContinueWatchingItems = (): string[] => {
  const progress = getAllProgress();
  
  return Object.entries(progress)
    .filter(([_, data]) => {
      const percentage = (data.lastPositionSec / data.durationSec) * 100;
      return percentage > 0 && percentage < 95;
    })
    .sort((a, b) => new Date(b[1].lastPlayedAtISO).getTime() - new Date(a[1].lastPlayedAtISO).getTime())
    .slice(0, 5) // Limit to 5 items
    .map(([contentId]) => contentId);
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};