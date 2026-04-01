import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  Map as MapIcon, 
  Tv, 
  BarChart2, 
  Settings, 
  Menu, 
  X, 
  Anchor,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { path: '/', name: 'Home', icon: Home },
  { path: '/tracker', name: 'Tracker', icon: Tv },
  { path: '/map', name: 'Saga Map', icon: MapIcon },
  { path: '/analytics', name: 'Analytics', icon: BarChart2 },
  { path: '/settings', name: 'Settings', icon: Settings },
];

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  closed: {
    x: -300,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const navItemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 }
  }
};

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay with blur */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Modern Sidebar */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] z-50 flex flex-col",
          "bg-gradient-to-b from-navy/95 to-navy-dark/95 backdrop-blur-xl",
          "border-r border-gold/20 shadow-2xl shadow-black/50"
        )}
      >
        {/* Header with animated icon */}
        <motion.div 
          className="p-6 flex items-center justify-between border-b border-gold/10"
          variants={navItemVariants}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isOpen ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Compass className="text-gold w-8 h-8" />
            </motion.div>
            <div>
              <h2 className="text-lg font-display text-gold tracking-wider">Log Pose</h2>
              <p className="text-xs text-cream/50">Navigation</p>
            </div>
          </div>
          <motion.button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden text-cream/60 hover:text-gold p-2 rounded-lg hover:bg-gold/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} />
          </motion.button>
        </motion.div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <motion.div key={item.path} variants={navItemVariants}>
              <NavLink
                to={item.path}
                onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                className={({ isActive }) => cn(
                  "group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-display",
                  isActive 
                    ? "bg-gradient-to-r from-gold/20 to-gold/5 text-gold" 
                    : "text-cream/70 hover:text-gold hover:bg-white/5"
                )}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full shadow-lg shadow-gold/50"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Icon with glow effect */}
                    <div className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      isActive 
                        ? "bg-gold/20 shadow-lg shadow-gold/20" 
                        : "group-hover:bg-gold/10"
                    )}>
                      <item.icon size={18} className={isActive ? "text-gold" : ""} />
                    </div>
                    
                    <span className="text-sm tracking-wide">{item.name}</span>
                    
                    {/* Hover arrow */}
                    <motion.span
                      className="absolute right-4 opacity-0 group-hover:opacity-100 text-gold/50"
                      initial={{ x: -10 }}
                      animate={{ x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Footer with decoration */}
        <motion.div 
          className="p-4 border-t border-gold/10"
          variants={navItemVariants}
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gold/10 to-transparent p-4">
            {/* Animated waves decoration */}
            <div className="absolute bottom-0 left-0 w-full h-8 opacity-20">
              <motion.div
                className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/waves.png')]"
                animate={{ backgroundPositionX: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="relative flex items-center gap-3">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Anchor className="text-gold/60" size={20} />
              </motion.div>
              <div>
                <p className="text-sm text-gold/80 font-display">Set sail for</p>
                <p className="text-xs text-cream/50">the Grand Line</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}

export function Layout({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-navy text-cream overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-500 ease-out min-w-0",
        isSidebarOpen ? "lg:ml-[280px]" : "ml-0"
      )}>
        {/* Modern Header */}
        <header className="sticky top-0 z-30 bg-navy/80 backdrop-blur-xl border-b border-gold/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-gold/10 rounded-xl text-gold transition-all hover:shadow-lg hover:shadow-gold/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={22} />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <motion.img 
                src="/icons/onepiecelogo.png" 
                alt="One Piece Logo" 
                className="w-10 h-10 object-contain drop-shadow-lg"
                referrerPolicy="no-referrer"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-display text-gold tracking-wider">Watch Tracker</h1>
                <p className="text-xs text-cream/50">One Piece Edition</p>
              </div>
            </div>

            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        <motion.div 
          className="p-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}