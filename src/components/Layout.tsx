import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Map as MapIcon, 
  Tv, 
  Film, 
  Info, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  Anchor,
  Skull
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { path: '/', name: 'Home', icon: Home },
  { path: '/saga-map', name: 'Saga Map', icon: MapIcon },
  { path: '/episodes', name: 'Episode Tracker', icon: Tv },
  { path: '/movies', name: 'Movie Tracker', icon: Film },
  { path: '/filler-settings', name: 'Filler & Settings', icon: Info },
  { path: '/analytics', name: 'Analytics', icon: BarChart2 },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isOpen ? '280px' : '0px',
          x: isOpen ? 0 : -280
        }}
        className={cn(
          "fixed top-0 left-0 h-full bg-navy border-r-4 border-wood z-50 overflow-hidden flex flex-col transition-all duration-300",
          isOpen ? "w-[280px]" : "w-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b-2 border-wood/30">
          <div className="flex items-center gap-3">
            <Skull className="text-gold w-8 h-8" />
            <h2 className="text-xl font-display text-gold">Log Pose</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-cream hover:text-gold">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-display tracking-wide",
                isActive 
                  ? "bg-gold text-navy shadow-[4px_4px_0px_0px_rgba(139,94,60,1)]" 
                  : "text-cream hover:bg-wood/20 hover:text-gold"
              )}
            >
              <item.icon size={20} />
              <span className="whitespace-nowrap">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t-2 border-wood/30 bg-wood/10">
          <div className="flex items-center gap-3 text-gold/60 text-sm italic">
            <Anchor size={16} />
            <span>Set sail for the Grand Line</span>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-navy text-cream overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 min-w-0",
        isSidebarOpen ? "lg:ml-[280px]" : "ml-0"
      )}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-navy/80 backdrop-blur-md border-b-2 border-wood/30 px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-wood/20 rounded-lg text-gold transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2">
            <img 
              src="/icons/onepiecelogo.png" 
              alt="Straw Hat Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-xl md:text-2xl font-display text-gold hidden sm:block">Watch Tracker</h1>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
