import React from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  Trash2, 
  Download, 
  Upload, 
  Target, 
  Eye, 
  EyeOff,
  Clock
} from 'lucide-react';
import { useWatchProgress } from '@/hooks/useWatchProgress';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { progress, updateProgress, resetProgress } = useWatchProgress();

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
        <h2 className="text-4xl font-black text-gold">Settings</h2>
        <p className="text-cream/60 italic">"Configure your journey and manage your maps."</p>
      </header>

      <div className="max-w-2xl space-y-12">
        {/* General Settings */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 text-gold">
                <SettingsIcon size={24} />
                <h3 className="text-2xl font-display">General</h3>
            </div>
            <div className="bg-wood/10 p-6 rounded-2xl border border-wood/30 space-y-6">
                <div className="flex items-center justify-between">
                    <label className="text-cream/80">Filler Episodes</label>
                    <button 
                        onClick={() => updateProgress({ showFiller: !progress.showFiller })}
                        className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm transition-all",
                        progress.showFiller ? "bg-gold text-navy" : "bg-navy text-cream"
                        )}
                    >
                        {progress.showFiller ? <Eye size={18} /> : <EyeOff size={18} />}
                        {progress.showFiller ? 'Showing' : 'Hidden'}
                    </button>
                </div>
            </div>
        </section>

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
                <p className="text-xl font-display text-gold">{estimatedDays > 0 ? `${estimatedDays} Days Remaining` : 'Journey Complete!'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Download size={24} />
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
    </div>
  );
}
