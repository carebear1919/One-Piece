import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Anchor, Play, Trophy, Map as MapIcon } from 'lucide-react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { SAGAS, MOVIES } from '@/data/onePieceData';

export function HomePage() {
  const { progress } = useWatchProgress();
  
  const totalEpisodes = 1122;
  const percentComplete = Math.round((progress.watchedEpisodes / totalEpisodes) * 100);
  
  // Find current arc
  let currentArc = "Not Started";
  for (const saga of SAGAS) {
    for (const arc of saga.arcs) {
      if (progress.watchedEpisodes >= arc.episodes.start && progress.watchedEpisodes <= arc.episodes.end) {
        currentArc = arc.name;
        break;
      }
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[280px] sm:h-[60vh] sm:min-h-100 flex flex-col items-center justify-center text-center rounded-3xl overflow-hidden shadow-2xl border-4 border-wood">
        <div 
          className="absolute inset-0 bg-[url('/backgrounds/onepiecewallpaper.jpg')] bg-cover bg-center"
          style={{ filter: 'brightness(0.6)' }}
        />
        
        {/* Animated Waves (Simple CSS) */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[url('https://www.transparenttextures.com/patterns/waves.png')] opacity-30 animate-pulse" />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-4 sm:px-6 space-y-3 sm:space-y-6"
        >
          <img 
            src="/icons/onepiecelogo.png" 
            alt="One Piece Logo" 
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 mx-auto drop-shadow-[0_0_15px_rgba(244,196,48,0.5)]"
            referrerPolicy="no-referrer"
          />
          
          <h2 className="text-2xl sm:text-4xl md:text-7xl font-black text-gold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            Set Sail, Pirate!
          </h2>
          <p className="text-sm sm:text-xl md:text-3xl text-cream max-w-2xl mx-auto font-bold italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2">
            "1000+ episodes. 15 movies. One legendary adventure."
          </p>
          
          <Link 
            to="/episodes"
            className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-3 sm:py-5 bg-gradient-to-r from-gold to-yellow-500 text-navy font-display text-base sm:text-2xl rounded-lg shadow-[0_4px_0px_0px_rgba(139,94,60,0.6)] sm:shadow-[0_8px_0px_0px_rgba(139,94,60,0.6)] hover:shadow-[0_2px_0px_0px_rgba(139,94,60,0.6)] sm:hover:shadow-[0_4px_0px_0px_rgba(139,94,60,0.6)] hover:translate-y-1 transition-all active:scale-95 mt-4"
          >
            <Anchor size={20} className="sm:size-7" />
            Start Tracking
          </Link>
        </motion.div>
      </section>

      {/* Progress Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="parchment-texture p-6 rounded-xl border-4 border-wood shadow-lg text-navy">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold">Episodes</h3>
            <Play className="text-red" size={20} />
          </div>
          <p className="text-3xl font-black">{progress.watchedEpisodes} / {totalEpisodes}</p>
          <div className="w-full bg-navy/20 h-3 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-red h-full transition-all duration-1000" 
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <p className="text-sm mt-2 font-bold">{percentComplete}% Complete</p>
        </div>

        <div className="parchment-texture p-6 rounded-xl border-4 border-wood shadow-lg text-navy">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold">Movies</h3>
            <Trophy className="text-gold" size={20} />
          </div>
          <p className="text-3xl font-black">{progress.watchedMovies.length} / 15</p>
          <div className="w-full bg-navy/20 h-3 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gold h-full transition-all duration-1000" 
              style={{ width: `${(progress.watchedMovies.length / 15) * 100}%` }}
            />
          </div>
          <p className="text-sm mt-2 font-bold">The Pirate's Cinema</p>
        </div>

        <div className="parchment-texture p-6 rounded-xl border-4 border-wood shadow-lg text-navy md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold">Current Location</h3>
            <MapIcon className="text-navy" size={20} />
          </div>
          <p className="text-2xl font-black uppercase tracking-wider">{currentArc}</p>
          <p className="text-sm mt-2 italic opacity-70">"The Grand Line is full of surprises..."</p>
          <Link to="/saga-map" className="inline-block mt-4 text-red font-bold hover:underline">
            View Saga Map →
          </Link>
        </div>
      </section>

      {/* Currently Watching Banner */}
      {progress.watchedEpisodes > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-wood/30 border-2 border-gold/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg">
              <Anchor className="text-navy" size={32} />
            </div>
            <div>
              <h4 className="text-xl font-display text-gold">Currently at Sea</h4>
              <p className="text-cream/80">Episode {progress.watchedEpisodes} - {currentArc}</p>
            </div>
          </div>
          <Link 
            to="/episodes"
            className="px-6 py-3 bg-gold text-navy font-display rounded-lg hover:bg-gold/80 transition-colors shadow-lg"
          >
            Jump to Tracker
          </Link>
        </motion.div>
      )}
    </div>
  );
}
