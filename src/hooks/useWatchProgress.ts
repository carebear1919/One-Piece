import { useState, useEffect } from 'react';

export interface WatchProgress {
  watchedEpisodes: number;
  watchedArcs: string[];
  watchedMovies: number[];
  dailyGoal: number;
  history: { date: string; count: number }[];
  lastUpdate: string;
  showFiller: boolean;
}

const STORAGE_KEY = 'op_tracker_progress';

const INITIAL_PROGRESS: WatchProgress = {
  watchedEpisodes: 0,
  watchedArcs: [],
  watchedMovies: [],
  dailyGoal: 3,
  history: [],
  lastUpdate: new Date().toISOString(),
  showFiller: true,
};

export function useWatchProgress() {
  const [progress, setProgress] = useState<WatchProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<WatchProgress>) => {
    setProgress((prev) => {
      const newProgress = { ...prev, ...updates, lastUpdate: new Date().toISOString() };
      
      // Update history if episodes changed
      if (updates.watchedEpisodes !== undefined && updates.watchedEpisodes > prev.watchedEpisodes) {
        const today = new Date().toISOString().split('T')[0];
        const diff = updates.watchedEpisodes - prev.watchedEpisodes;
        const newHistory = [...prev.history];
        const todayIndex = newHistory.findIndex((h) => h.date === today);
        
        if (todayIndex > -1) {
          newHistory[todayIndex].count += diff;
        } else {
          newHistory.push({ date: today, count: diff });
        }
        
        newProgress.history = newHistory.slice(-30); // Keep last 30 days
      }
      
      return newProgress;
    });
  };

  const markArcWatched = (arcId: string, endEpisode: number) => {
    setProgress((prev) => {
      const newArcs = prev.watchedArcs.includes(arcId) 
        ? prev.watchedArcs 
        : [...prev.watchedArcs, arcId];
      
      const newEpisodes = Math.max(prev.watchedEpisodes, endEpisode);
      
      return {
        ...prev,
        watchedArcs: newArcs,
        watchedEpisodes: newEpisodes,
        lastUpdate: new Date().toISOString()
      };
    });
  };

  const toggleMovie = (movieId: number) => {
    setProgress((prev) => {
      const newMovies = prev.watchedMovies.includes(movieId)
        ? prev.watchedMovies.filter(id => id !== movieId)
        : [...prev.watchedMovies, movieId];
      
      return { ...prev, watchedMovies: newMovies, lastUpdate: new Date().toISOString() };
    });
  };

  const resetProgress = () => {
    if (confirm("Are ye sure, pirate? This cannot be undone!")) {
      setProgress(INITIAL_PROGRESS);
    }
  };

  return {
    progress,
    updateProgress,
    markArcWatched,
    toggleMovie,
    resetProgress
  };
}
