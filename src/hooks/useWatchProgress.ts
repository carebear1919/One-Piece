import { useState, useEffect } from 'react';
import { SAGAS, Arc } from '../data/onePieceData';

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

const allArcs: Arc[] = SAGAS.flatMap(saga => saga.arcs);

function calculateWatchedEpisodes(watchedArcs: string[], showFiller: boolean): number {
  let total = 0;
  for (const arcId of watchedArcs) {
    const arc = allArcs.find(a => a.id === arcId);
    if (arc && (showFiller || arc.type === 'Main Story')) {
      total += arc.episodes.end - arc.episodes.start + 1;
    }
  }
  return total;
}

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
    if (saved) {
      const parsed = JSON.parse(saved);
      // Recalculate episodes on load for data consistency
      parsed.watchedEpisodes = calculateWatchedEpisodes(parsed.watchedArcs, parsed.showFiller);
      return parsed;
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<WatchProgress>) => {
    setProgress((prev) => {
      const newProgress = { ...prev, ...updates, lastUpdate: new Date().toISOString() };

      if (updates.watchedArcs || updates.showFiller !== undefined) {
        newProgress.watchedEpisodes = calculateWatchedEpisodes(newProgress.watchedArcs ?? prev.watchedArcs, newProgress.showFiller);
      }
      
      // Update history if episodes changed
      if (newProgress.watchedEpisodes !== prev.watchedEpisodes) {
        const today = new Date().toISOString().split('T')[0];
        const diff = newProgress.watchedEpisodes - prev.watchedEpisodes;
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

  const markArcWatched = (arcId: string, watched: boolean) => {
    setProgress(prev => {
      const newArcs = watched
        ? [...prev.watchedArcs, arcId]
        : prev.watchedArcs.filter(id => id !== arcId);
      
      const newEpisodes = calculateWatchedEpisodes(newArcs, prev.showFiller);

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

  const markEpisodesAsWatched = (targetEpisode: number) => {
    let arcsToWatch: string[] = [];
    let episodesCounted = 0;
    const allArcsSorted = SAGAS.flatMap(s => s.arcs).sort((a, b) => a.episodes.start - b.episodes.start);

    for (const arc of allArcsSorted) {
        if (episodesCounted < targetEpisode) {
            if (progress.showFiller || arc.type === 'Main Story') {
                const arcEpisodeCount = arc.episodes.end - arc.episodes.start + 1;
                if (episodesCounted + arcEpisodeCount <= targetEpisode) {
                    arcsToWatch.push(arc.id);
                    episodesCounted += arcEpisodeCount;
                } else {
                    // Partial arc watching is not handled, so we stop here
                    break;
                }
            }
        } else {
            break;
        }
    }

    updateProgress({ watchedArcs: arcsToWatch });
  };

  return {
    progress,
    updateProgress,
    markArcWatched,
    toggleMovie,
    resetProgress,
    markEpisodesAsWatched,
  };
}
