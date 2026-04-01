import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, Info, Film, Filter } from 'lucide-react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { MOVIES } from '@/data/onePieceData';
import { cn } from '@/lib/utils';

export function MovieTrackerPage() {
  const { progress, toggleMovie } = useWatchProgress();
  const [filter, setFilter] = useState<'All' | 'Canon' | 'Best'>('All');

  const filteredMovies = MOVIES.filter(movie => {
    if (filter === 'Best') return movie.isBest;
    if (filter === 'Canon') return movie.canonStatus === 'Mostly Canon';
    return true;
  });

  return (
    <div className="space-y-12 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gold">Movie Tracker</h2>
          <p className="text-cream/60 italic">"15 cinematic adventures across the high seas."</p>
        </div>

        <div className="flex items-center gap-2 bg-navy/50 p-2 rounded-xl border border-wood/20">
          <Filter size={18} className="text-gold" />
          {(['All', 'Canon', 'Best'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                filter === type ? "bg-gold text-navy" : "bg-wood/20 text-cream/60 hover:text-cream"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </header>

      {/* Progress Counter */}
      <div className="bg-wood/20 border-2 border-gold/30 p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg">
            <Film className="text-navy" size={32} />
          </div>
          <div>
            <h4 className="text-xl font-display text-gold">The Pirate's Cinema</h4>
            <p className="text-cream/80">{progress.watchedMovies.length} / 15 Movies Watched</p>
          </div>
        </div>
        <div className="hidden md:block w-64 bg-navy/40 h-4 rounded-full overflow-hidden border border-gold/20">
          <div 
            className="bg-gold h-full transition-all duration-1000" 
            style={{ width: `${(progress.watchedMovies.length / 15) * 100}%` }}
          />
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMovies.map((movie, index) => {
          const isWatched = progress.watchedMovies.includes(movie.id);
          
          return (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative flex flex-col parchment-texture rounded-xl border-4 transition-all duration-300 group overflow-hidden",
                isWatched ? "border-gold shadow-[0_0_15px_rgba(244,196,48,0.2)]" : "border-wood shadow-lg"
              )}
            >
              {/* Movie Number Badge */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-red text-cream rounded-full flex items-center justify-center font-display font-black text-lg shadow-lg border-2 border-cream z-10">
                {movie.id}
              </div>

              {/* Movie Content */}
              <div className="p-6 flex-1 flex flex-col space-y-4 text-navy">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-display font-black leading-tight">{movie.title}</h3>
                    {movie.isBest && (
                      <Star size={16} className="fill-gold text-gold" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
                    <span className="bg-navy/10 px-1.5 py-0.5 rounded">Watch after Ep {movie.watchAfter}</span>
                    <span className={cn(
                      "px-1.5 py-0.5 rounded",
                      movie.canonStatus === 'Mostly Canon' ? "bg-green-600/10 text-green-700" : "bg-red/10 text-red"
                    )}>
                      {movie.canonStatus}
                    </span>
                  </div>
                </div>

                <p className="text-sm italic opacity-80 line-clamp-3">
                  "{movie.description}"
                </p>

                <div className="pt-4 mt-auto border-t border-navy/10 flex items-center justify-between">
                  <button 
                    onClick={() => toggleMovie(movie.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm transition-all",
                      isWatched 
                        ? "bg-green-600 text-cream" 
                        : "bg-navy text-cream hover:bg-navy/80"
                    )}
                  >
                    {isWatched ? <CheckCircle2 size={16} /> : <Film size={16} />}
                    {isWatched ? 'Watched' : 'Mark Watched'}
                  </button>
                  
                  <button className="p-2 text-navy/40 hover:text-navy transition-colors">
                    <Info size={20} />
                  </button>
                </div>
              </div>

              {/* Wanted Poster Style Overlay */}
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-lg" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
