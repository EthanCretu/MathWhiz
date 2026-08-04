import React from 'react';
import {
  Calculator,
  BookOpen,
  EyeOff,
  Plus,
  Shield,
  FileCode,
  GraduationCap
} from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenDisguiseSettings,
  onOpenAddGame,
  disguiseSettings
}) => {
  const getDisguiseLabel = () => {
    switch (disguiseSettings.disguiseFavicon) {
      case 'google':
        return 'Google Search';
      case 'classroom':
        return 'Google Classroom';
      case 'desmos':
        return 'Desmos Graphing Calculator';
      default:
        return 'MathWhiz K-12 Portal';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Stealth Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  {disguiseSettings.useDisguiseTitles ? disguiseSettings.tabTitle : 'MathWhiz Academic Portal'}
                </span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-mono font-semibold">
                  v3.8-PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {disguiseSettings.useDisguiseTitles ? getDisguiseLabel() : 'K-12 Interactive STEM Learning & Practice Vault'}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'games'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Lessons
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('worksheet')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'worksheet'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Practice Worksheet
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" /> Calculator
            </button>
          </nav>

          {/* Action Buttons: Add Custom Game & Stealth Disguise */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddGame}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Import Game</span>
            </button>

            <button
              onClick={onOpenDisguiseSettings}
              className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              title="Configure Stealth Tab & Panic Disguise Mask"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Stealth Mask</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
