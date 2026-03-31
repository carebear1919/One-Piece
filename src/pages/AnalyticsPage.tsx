import React from 'react';
import { motion } from 'motion/react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { SAGAS, MOVIES } from '@/data/onePieceData';
import { cn } from '@/lib/utils';
import { Tv, Clock, Film, Zap, Award } from 'lucide-react';

export function AnalyticsPage() {
  const { progress } = useWatchProgress();
  
  const totalEpisodes = 1122;
  const watchedEps = progress.watchedEpisodes;
  const remainingEps = totalEpisodes - watchedEps;
  
  const pieData = [
    { name: 'Watched', value: watchedEps, color: '#f4c430' },
    { name: 'Remaining', value: remainingEps, color: '#0d1b2a' }
  ];

  const sagaData = SAGAS.map(saga => {
    const watchedInSaga = saga.arcs.filter(arc => progress.watchedArcs.includes(arc.id)).length;
    const totalInSaga = saga.arcs.length;
    return {
      name: saga.name.replace(' Saga', ''),
      percent: Math.round((watchedInSaga / totalInSaga) * 100)
    };
  });

  const totalHours = Math.round((watchedEps * 24) / 60);

  const milestones = [
    { name: 'Cabin Boy', desc: 'Watch Ep 1', icon: '⚓', achieved: watchedEps >= 1 },
    { name: 'Pirate Crew', desc: 'Complete East Blue', icon: '👒', achieved: progress.watchedArcs.includes('loguetown') },
    { name: 'Navigator', desc: 'Complete Water 7', icon: '🧭', achieved: progress.watchedArcs.includes('post-enies') },
    { name: 'First Mate', desc: 'Pass Ep 500', icon: '⚔️', achieved: watchedEps >= 500 },
    { name: 'Warlord', desc: 'Complete Summit War', icon: '🦅', achieved: progress.watchedArcs.includes('post-war') },
    { name: 'Yonko', desc: 'Complete Wano', icon: '🐉', achieved: progress.watchedArcs.includes('wano-3') },
    { name: 'Pirate King', desc: 'Watch all episodes', icon: '👑', achieved: watchedEps >= totalEpisodes },
    { name: 'Movie Buff', desc: 'Watch all movies', icon: '🎬', achieved: progress.watchedMovies.length >= 15 },
  ];

  return (
    <div className="space-y-12 pb-24">
      <header className="space-y-2">
        <h2 className="text-4xl font-black text-gold">Captain's Log</h2>
        <p className="text-cream/60 italic">"The data behind your legendary journey."</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Episodes', value: watchedEps, icon: Tv, color: 'text-gold' },
          { label: 'Hours at Sea', value: totalHours, icon: Clock, color: 'text-red' },
          { label: 'Movies Watched', value: progress.watchedMovies.length, icon: Film, color: 'text-gold' },
          { label: 'Current Streak', value: '3 Days', icon: Zap, color: 'text-gold' },
        ].map((stat, i) => (
          <div key={i} className="bg-wood/10 border-2 border-wood/30 p-6 rounded-2xl flex items-center gap-4">
            <div className={cn("p-3 bg-navy rounded-xl shadow-lg", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-cream/40 tracking-widest">{stat.label}</p>
              <p className="text-2xl font-display text-cream">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Progress */}
        <div className="bg-navy/50 border-2 border-wood/30 p-8 rounded-3xl space-y-6">
          <h3 className="text-2xl font-display text-gold">Overall Progress</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--color-wood)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0d1b2a', border: '1px solid #8b5e3c', borderRadius: '8px' }}
                  itemStyle={{ color: '#f5e6c8' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-4xl font-black text-gold">{Math.round((watchedEps / totalEpisodes) * 100)}%</p>
              <p className="text-xs font-display text-cream/40 uppercase">Complete</p>
            </div>
          </div>
        </div>

        {/* Saga Completion */}
        <div className="bg-navy/50 border-2 border-wood/30 p-8 rounded-3xl space-y-6">
          <h3 className="text-2xl font-display text-gold">Saga Completion</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sagaData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  stroke="#f5e6c8" 
                  fontSize={10}
                  tick={{ fill: '#f5e6c8', fontWeight: 'bold' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(139,94,60,0.1)' }}
                  contentStyle={{ backgroundColor: '#0d1b2a', border: '1px solid #8b5e3c', borderRadius: '8px' }}
                />
                <Bar dataKey="percent" fill="#f4c430" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Milestone Badges */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 text-gold">
          <Award size={28} />
          <h3 className="text-3xl font-display">Milestone Badges</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <div 
              key={i} 
              className={cn(
                "relative group p-6 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center text-center gap-3",
                m.achieved 
                  ? "bg-gold/10 border-gold shadow-[0_0_15px_rgba(244,196,48,0.2)]" 
                  : "bg-navy/40 border-wood/20 grayscale opacity-40"
              )}
            >
              <div className="text-4xl mb-2">{m.icon}</div>
              <h4 className="font-display font-bold text-gold text-sm">{m.name}</h4>
              <p className="text-[10px] text-cream/60 uppercase font-black tracking-tighter">{m.desc}</p>
              
              {m.achieved && (
                <div className="absolute -top-2 -right-2 bg-green-600 text-cream p-1 rounded-full shadow-lg">
                  <Award size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
