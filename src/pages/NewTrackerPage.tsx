import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCircle2, Search, Filter, Play, Film, Star, Info } from 'lucide-react';
import { useWatchProgress } from '../hooks/useWatchProgress';
import { SAGAS, MOVIES, Arc, Movie, EpisodeRange } from '../data/onePieceData';
import { cn } from '../lib/utils';

type TimelineItem = 
  | { itemType: 'arc'; id: string; name: string; episodes: EpisodeRange; type: "Main Story" | "Filler" | "Special"; recommendation?: "Watch It" | "Skip" | "Optional"; note?: string; }
  | { itemType: 'movie'; id: number; title: string; watchAfter: number; episodes: { start: number; end: number; }; canonStatus: "Non-Canon" | "Mostly Canon"; description: string; isBest?: boolean; isRemake?: boolean; };

const allItems = [
  ...SAGAS.flatMap(saga => saga.arcs.map(arc => ({ ...arc, itemType: 'arc' }))),
  ...MOVIES.map(movie => ({ ...movie, itemType: 'movie', episodes: { start: movie.watchAfter, end: movie.watchAfter } }))
].sort((a, b) => a.episodes.start - b.episodes.start);

interface ArcCardProps { arc: Arc; isWatched: boolean; onToggle: () => void; }
const ArcCard: React.FC<ArcCardProps> = ({ arc, isWatched, onToggle }) => (
  <div className="bg-navy/30 rounded-lg overflow-hidden border border-wood/20 flex flex-col">
    <div className="p-4 grow">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-cream flex-1 pr-2">{arc.name}</h4>
        <div className={cn(
          "text-xs font-bold px-2 py-0.5 rounded-full",
          arc.type === 'Main Story' ? "bg-blue-900/50 text-blue-300" : "bg-purple-900/50 text-purple-300"
        )}>
          {arc.type}
        </div>
      </div>
      <p className="text-xs text-cream/40 mt-1">Episodes {arc.episodes.start} - {arc.episodes.end}</p>
      {arc.note && <p className="text-xs text-amber-300/60 mt-2 italic flex gap-2"><Info size={14} className="shrink-0" /> {arc.note}</p>}
    </div>
    <button 
      onClick={onToggle}
      className={cn(
        "w-full p-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors",
        isWatched 
          ? "bg-gold/20 text-gold hover:bg-gold/30" 
          : "bg-white/5 text-cream/60 hover:bg-white/10"
      )}
    >
      {isWatched ? <CheckCircle2 size={16} /> : <Play size={16} />}
      {isWatched ? 'Watched' : 'Mark as Watched'}
    </button>
    </div>
);

interface MovieCardProps { movie: Movie; isWatched: boolean; onToggle: () => void; }
const MovieCard: React.FC<MovieCardProps> = ({ movie, isWatched, onToggle }) => (
  <div className="bg-navy/30 rounded-lg overflow-hidden border border-wood/20 flex flex-col">
    <div className="p-4 grow">
      <h4 className="font-bold text-cream flex-1 pr-2">{movie.title}</h4>
      <div className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-900/50 text-rose-300 flex items-center gap-1">
        <Film size={12} /> Movie
      </div>
      <p className="text-xs text-cream/40 mt-1">Watch after episode {movie.watchAfter}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className={cn(
          "text-xs font-semibold px-1.5 py-0.5 rounded",
          movie.canonStatus === 'Mostly Canon' ? 'bg-green-800/50 text-green-300' : 'bg-red-800/50 text-red-300'
        )}>
          {movie.canonStatus}
        </span>
        {movie.isBest && <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-yellow-700/50 text-yellow-200 flex items-center gap-1"><Star size={12} /> Best</span>}
      </div>
    </div>
    <button 
      onClick={onToggle}
      className={cn(
        "w-full p-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors",
        isWatched 
          ? "bg-gold/20 text-gold hover:bg-gold/30" 
          : "bg-white/5 text-cream/60 hover:bg-white/10"
      )}
    >
      {isWatched ? <CheckCircle2 size={16} /> : <Play size={16} />}
      {isWatched ? 'Watched' : 'Mark as Watched'}
    </button>
    </div>
);

export function TrackerPage() {
  const { progress, markArcWatched, toggleMovie, markEpisodesAsWatched } = useWatchProgress();
  const [expandedSagas, setExpandedSagas] = useState<string[]>([SAGAS[0].id]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Main Story' | 'Filler' | 'Movies'>('All');
  const [quickEpisode, setQuickEpisode] = useState('');

  const toggleSaga = (id: string) => {
    setExpandedSagas(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleQuickMark = (e: React.FormEvent) => {
    e.preventDefault();
    const ep = parseInt(quickEpisode);
    if (!isNaN(ep) && ep > 0) {
      markEpisodesAsWatched(ep);
      setQuickEpisode('');
    }
  };

  const filteredSagas = useMemo(() => {
    return SAGAS.map(saga => {
      const items: TimelineItem[] = (saga.arcs.map(arc => ({ ...arc, itemType: 'arc' as const })) as TimelineItem[])
        .concat(
          MOVIES.filter(m => m.watchAfter >= saga.episodes.start && m.watchAfter <= saga.episodes.end)
                .map(movie => ({ ...movie, itemType: 'movie' as const, episodes: { start: movie.watchAfter, end: movie.watchAfter } })) as TimelineItem[]
        )
        .sort((a, b) => a.episodes.start - b.episodes.start)
        .filter(item => {
          const name = item.itemType === 'arc' ? item.name : item.title;
          const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
          
          let matchesFilter = false;
          if (filterType === 'All') {
            matchesFilter = true;
          } else if (filterType === 'Movies' && item.itemType === 'movie') {
            matchesFilter = true;
          } else if (item.itemType === 'arc') {
            if (filterType === 'Main Story' && item.type === 'Main Story') matchesFilter = true;
            if (filterType === 'Filler' && item.type === 'Filler') matchesFilter = true;
          }

          if (item.itemType === 'arc' && !progress.showFiller && item.type === 'Filler') return false;

          return matchesSearch && matchesFilter;
        });

      return {
        ...saga,
        items,
      };
    }).filter(saga => saga.items.length > 0);
  }, [searchQuery, filterType, progress.showFiller]);

  const calculateSagaProgress = (saga: (typeof filteredSagas)[0]) => {
    const sagaArcs = saga.arcs.filter(arc => progress.showFiller || arc.type === 'Main Story');
    const totalEpisodesInSaga = sagaArcs.reduce((acc, arc) => acc + (arc.episodes.end - arc.episodes.start + 1), 0);
    
    const watchedEpisodesInSaga = sagaArcs
      .filter(arc => progress.watchedArcs.includes(arc.id))
      .reduce((acc, arc) => acc + (arc.episodes.end - arc.episodes.start + 1), 0);

    if (totalEpisodesInSaga === 0) return 0;
    return Math.round((watchedEpisodesInSaga / totalEpisodesInSaga) * 100);
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gold">Grand Line Tracker</h2>
          <p className="text-cream/60 italic">"Track every arc, movie, and step of your journey."</p>
        </div>

        <form onSubmit={handleQuickMark} className="flex items-center gap-2 bg-wood/20 p-2 rounded-lg border border-wood/40">
          <label className="text-xs font-display text-gold uppercase px-2">Mark up to:</label>
          <input 
            type="number" 
            value={quickEpisode}
            onChange={(e) => setQuickEpisode(e.target.value)}
            placeholder="Ep #"
            className="w-20 bg-navy border border-wood/40 rounded px-2 py-1 text-cream focus:outline-none focus:border-gold"
          />
          <button type="submit" className="bg-gold text-navy px-3 py-1 rounded font-bold text-sm hover:bg-gold/80">
            Set
          </button>
        </form>
      </header>

      <div className="flex flex-col sm:flex-row gap-4 bg-navy/50 p-4 rounded-xl border border-wood/20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
          <input 
            type="text" 
            placeholder="Search arcs or movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-wood/10 border border-wood/20 rounded-lg pl-10 pr-4 py-2 text-cream focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gold" />
          {(['All', 'Main Story', 'Filler', 'Movies'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-bold transition-all",
                filterType === type ? "bg-gold text-navy" : "bg-wood/20 text-cream/60 hover:text-cream",
                !progress.showFiller && type === 'Filler' && "hidden"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSagas.map((saga) => {
          const isExpanded = expandedSagas.includes(saga.id);
          const percent = calculateSagaProgress(saga);

          return (
            <div key={saga.id} className="border-2 border-wood/30 rounded-2xl overflow-hidden bg-wood/5">
              <button 
                onClick={() => toggleSaga(saga.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-wood/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-navy border-2 border-gold rounded-full flex items-center justify-center text-gold font-display font-black">
                    {percent}%
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-gold">{saga.name}</h3>
                    <p className="text-sm text-cream/40">Episodes {saga.episodes.start} - {saga.episodes.end}</p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-gold" />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                      {saga.items.map((item) => {
                        if (item.itemType === 'arc') {
                          const isWatched = progress.watchedArcs.includes(item.id);
                          return (
                            <ArcCard 
                              key={item.id} 
                              arc={item as Arc} 
                              isWatched={isWatched} 
                              onToggle={() => markArcWatched(item.id, !isWatched)}
                            />
                          );
                        } else {
                          const isWatched = progress.watchedMovies.includes(item.id);
                          return (
                            <MovieCard 
                              key={item.id} 
                              movie={item as Movie} 
                              isWatched={isWatched} 
                              onToggle={() => toggleMovie(item.id)}
                            />
                          );
                        }
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrackerPage;
