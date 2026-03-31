import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Trash2, 
  Download, 
  Upload, 
  Target, 
  Eye, 
  EyeOff, 
  Info,
  Clock
} from 'lucide-react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { SAGAS } from '@/data/onePieceData';
import { cn } from '@/lib/utils';

export function FillerSettingsPage() {
  const { progress, updateProgress, resetProgress } = useWatchProgress();
  const [activeTab, setActiveTab] = useState<'filler' | 'settings'>('filler');

  const fillerArcs = SAGAS.flatMap(s => s.arcs).filter(a => a.type === 'Filler');

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "op_tracker_progress.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          updateProgress(json);
          alert("Progress imported successfully, pirate!");
        } catch (err) {
          alert("Invalid map data! Are ye sure this is a progress file?");
        }
      };
      reader.readAsText(file);
    }
  };

  const estimatedDays = Math.ceil((1122 - progress.watchedEpisodes) / (progress.dailyGoal || 1));

  return (
    <div className="space-y-8 pb-24">
      <header className="space-y-2">
        <h2 className="text-4xl font-black text-gold">Log Pose & Settings</h2>
        <p className="text-cream/60 italic">"Configure your journey and manage your maps."</p>
      </header>

      {/* Tabs */}
      <div className="flex border-b-2 border-wood/30">
        <button 
          onClick={() => setActiveTab('filler')}
          className={cn(
            "px-8 py-4 font-display text-lg transition-all relative",
            activeTab === 'filler' ? "text-gold" : "text-cream/40 hover:text-cream"
          )}
        >
          Filler Guide
          {activeTab === 'filler' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-gold" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "px-8 py-4 font-display text-lg transition-all relative",
            activeTab === 'settings' ? "text-gold" : "text-cream/40 hover:text-cream"
          )}
        >
          Settings
          {activeTab === 'settings' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-gold" />
          )}
        </button>
      </div>

      <div className="mt-8">
        {activeTab === 'filler' ? (
          <div className="space-y-6">
            <div className="bg-wood/20 p-6 rounded-2xl border border-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Info className="text-gold" size={24} />
                <p className="text-cream/80">Filler arcs are optional stories. Some are legendary (like G-8), others can be skipped.</p>
              </div>
              <button 
                onClick={() => updateProgress({ showFiller: !progress.showFiller })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm transition-all",
                  progress.showFiller ? "bg-gold text-navy" : "bg-navy text-cream"
                )}
              >
                {progress.showFiller ? <Eye size={18} /> : <EyeOff size={18} />}
                {progress.showFiller ? 'Showing Filler' : 'Hiding Filler'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fillerArcs.map((arc) => (
                <div key={arc.id} className="parchment-texture p-4 rounded-xl border-2 border-wood/40 text-navy flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold">{arc.name}</h4>
                    <p className="text-xs font-bold opacity-60">Episodes {arc.episodes.start} - {arc.episodes.end}</p>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    arc.recommendation === 'Watch It' ? "bg-green-600 text-cream" :
                    arc.recommendation === 'Optional' ? "bg-gold text-navy" :
                    "bg-red text-cream"
                  )}>
                    {arc.recommendation || 'Optional'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl space-y-12">
            {/* Watch Pace */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-gold">
                <Target size={24} />
                <h3 className="text-2xl font-display">Watch Pace</h3>
              </div>
              <div className="bg-wood/10 p-6 rounded-2xl border border-wood/30 space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-cream/80">Daily Episode Goal</label>
                  <input 
                    type="number" 
                    value={progress.dailyGoal}
                    onChange={(e) => updateProgress({ dailyGoal: parseInt(e.target.value) || 0 })}
                    className="w-20 bg-navy border border-wood/40 rounded px-3 py-2 text-cream text-center font-bold"
                  />
                </div>
                <div className="flex items-center gap-4 p-4 bg-navy/40 rounded-xl">
                  <Clock className="text-gold" size={32} />
                  <div>
                    <p className="text-sm text-cream/40 uppercase font-black">Estimated Finish</p>
                    <p className="text-xl font-display text-gold">{estimatedDays} Days Remaining</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Management */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-gold">
                <SettingsIcon size={24} />
                <h3 className="text-2xl font-display">Data Management</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={handleExport}
                  className="flex items-center justify-center gap-3 p-4 bg-wood/20 border-2 border-wood/40 rounded-xl hover:bg-wood/30 transition-all text-cream font-display"
                >
                  <Download size={20} />
                  Export Progress
                </button>
                <label className="flex items-center justify-center gap-3 p-4 bg-wood/20 border-2 border-wood/40 rounded-xl hover:bg-wood/30 transition-all text-cream font-display cursor-pointer">
                  <Upload size={20} />
                  Import Progress
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
                <button 
                  onClick={resetProgress}
                  className="sm:col-span-2 flex items-center justify-center gap-3 p-4 bg-red/10 border-2 border-red/40 rounded-xl hover:bg-red/20 transition-all text-red font-display"
                >
                  <Trash2 size={20} />
                  Reset All Progress
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
