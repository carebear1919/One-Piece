import React from 'react';
import { motion } from 'motion/react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { SAGAS } from '@/data/onePieceData';
import { cn } from '@/lib/utils';
import { Map as MapIcon, Anchor, CheckCircle2 } from 'lucide-react';

export function SagaMapPage() {
  const { progress } = useWatchProgress();

  return (
    <div className="space-y-12 pb-24">
      <header className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-gold drop-shadow-lg">
          The Grand Line Map
        </h2>
        <p className="text-xl text-cream/80 italic max-w-2xl mx-auto">
          "A visual overview of your legendary journey across the seas."
        </p>
      </header>

      {/* Map Container */}
      <div className="relative parchment-texture p-8 md:p-16 rounded-3xl border-8 border-wood shadow-2xl overflow-hidden">
        {/* Dotted Route Line (Simplified SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path 
            d="M 100 100 Q 500 200 900 100 T 900 900 T 100 900 T 100 500" 
            fill="none" 
            stroke="var(--color-navy)" 
            strokeWidth="4" 
            strokeDasharray="10,10" 
          />
        </svg>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {SAGAS.map((saga, index) => {
            const watchedInSaga = saga.arcs.filter(arc => progress.watchedArcs.includes(arc.id)).length;
            const totalInSaga = saga.arcs.length;
            const percent = Math.round((watchedInSaga / totalInSaga) * 100);
            const isComplete = percent === 100;
            const isStarted = percent > 0;

            return (
              <motion.div
                key={saga.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative group cursor-pointer p-6 rounded-2xl border-4 transition-all duration-500",
                  isComplete ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(244,196,48,0.3)]" : 
                  isStarted ? "bg-wood/20 border-wood animate-pulse" : 
                  "bg-navy/10 border-navy/20 grayscale opacity-60"
                )}
              >
                {/* Island Icon */}
                <div className="absolute -top-6 -left-4 w-12 h-12 bg-wood rounded-full flex items-center justify-center shadow-lg border-2 border-gold transform group-hover:rotate-12 transition-transform">
                  <Anchor size={24} className="text-gold" />
                </div>

                <div className="space-y-3">
                  <h3 className={cn(
                    "text-xl font-display font-black uppercase",
                    isComplete ? "text-navy" : "text-navy/80"
                  )}>
                    {saga.name}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm font-bold text-navy/60">
                    <span>Ep {saga.episodes.start} - {saga.episodes.end}</span>
                    <span className="bg-navy/10 px-2 py-0.5 rounded">{totalInSaga} Arcs</span>
                  </div>

                  <div className="w-full bg-navy/10 h-3 rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        isComplete ? "bg-navy" : "bg-red"
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-tighter text-navy/40">
                      {percent}% Explored
                    </span>
                    {isComplete && (
                      <CheckCircle2 size={20} className="text-navy" />
                    )}
                  </div>
                </div>

                {/* Hover Effect: Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/5 transition-colors pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-8 text-cream/60 font-display text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gold rounded border border-gold" />
          <span>Conquered Saga</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-wood/40 rounded border border-wood animate-pulse" />
          <span>Currently Sailing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-navy/20 rounded border border-navy/20" />
          <span>Uncharted Waters</span>
        </div>
      </div>
    </div>
  );
}
