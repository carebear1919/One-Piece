import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, CheckCircle2, Search, Filter, Play } from 'lucide-react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { SAGAS } from '@/data/onePieceData';
import { cn } from '@/lib/utils';

export function EpisodeTrackerPage() {
  const { progress, markArcWatched, updateProgress } = useWatchProgress();
  const [expandedSagas, setExpandedSagas] = useState<string[]>([SAGAS[0].id]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Main Story' | 'Filler'>('All');
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
      updateProgress({ watchedEpisodes: ep });
      setQuickEpisode('');
    }
  };

  const filteredSagas = SAGAS.map(saga => ({
    ...saga,
    arcs: saga.arcs.filter(arc => {
      const matchesSearch = arc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'All' || arc.type === filterType;
      return matchesSearch && matchesFilter;
    })
  })).filter(saga => saga.arcs.length > 0);

  return (
    <div className="space-y-8 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gold">Episode Tracker</h2>
          <p className="text-cream/60 italic">"Keep track of every step of your journey."</p>
        </div>

        {/* Quick Mark */}
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

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 bg-navy/50 p-4 rounded-xl border border-wood/20">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/40" size={18} />
          <input 
            type="text" 
            placeholder="Search arcs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-wood/10 border border-wood/20 rounded-lg pl-10 pr-4 py-2 text-cream focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gold" />
          {(['All', 'Main Story', 'Filler'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-bold transition-all",
                filterType === type ? "bg-gold text-navy" : "bg-wood/20 text-cream/60 hover:text-cream"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Sagas List */}
      <div className="space-y-4">
        {filteredSagas.map((saga) => {
          const isExpanded = expandedSagas.includes(saga.id);
          const watchedInSaga = saga.arcs.filter(arc => progress.watchedArcs.includes(arc.id)).length;
          const totalInSaga = saga.arcs.length;
          const percent = Math.round((watchedInSaga / totalInSaga) * 100);

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
                    className="overflow-hidden border-t border-wood/20"
                  >
                    <div className="p-4 md:p-6 space-y-4">
                      {saga.arcs.map((arc) => {
                        const isWatched = progress.watchedArcs.includes(arc.id) || progress.watchedEpisodes >= arc.episodes.end;
                        const isFiller = arc.type === 'Filler';

                        return (
                          <div 
                            key={arc.id}
                            className={cn(
                              "relative parchment-texture p-4 rounded-xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all",
                              isWatched ? "border-gold opacity-80" : "border-wood/40",
                              isFiller && !isWatched && "opacity-60 grayscale-[0.5]"
                            )}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-bold text-navy text-lg">{arc.name}</h4>
                                {isFiller && (
                                  <span className="bg-red/10 text-red text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-red/20">
                                    Filler
                                  </span>
                                )}
                                {arc.recommendation === 'Watch It' && (
                                  <span className="bg-gold/20 text-navy text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-gold/20">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <p className="text-navy/60 text-sm font-bold">
                                Episodes {arc.episodes.start} - {arc.episodes.end}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              {isWatched ? (
                                <div className="flex items-center gap-2 text-navy font-black uppercase text-sm">
                                  <CheckCircle2 className="text-green-600" size={20} />
                                  Watched
                                </div>
                              ) : (
                                <button 
                                  onClick={() => markArcWatched(arc.id, arc.episodes.end)}
                                  className="flex items-center gap-2 px-4 py-2 bg-navy text-cream rounded-lg font-display text-sm hover:bg-navy/80 transition-all shadow-md"
                                >
                                  <Play size={16} />
                                  Mark Watched
                                </button>
                              )}
                            </div>
                          </div>
                        );
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
