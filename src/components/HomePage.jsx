import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Calculator,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gamepad2,
  Sparkles,
  Layers,
  Award,
  Lock,
  Cpu
} from 'lucide-react';

export const HomePage = ({
  onGoToLessons,
  onGoToWorksheet,
  onGoToCalculator,
  onOpenDisguiseSettings,
  totalGamesCount
}) => {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-slate-100">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen K-12 Interactive STEM Education Engine
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Master Advanced Mathematics Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">Interactive Simulations</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Access <strong className="text-white font-semibold">{totalGamesCount}+ high-performance STEM modules</strong>, 3D geometry engines, calculus analyzers, and physics simulations disguised as standard academic coursework.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onGoToLessons}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Explore Interactive Lessons
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToWorksheet}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-emerald-400" /> Calculus Worksheet
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={onGoToLessons}
          className="group p-6 bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
        >
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit border border-blue-500/20 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Unblocked Unrestricted Vault</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Pre-configured unblocked proxy iframe links for Retro classics, Slope, Basket Bros, Moto X3M, geometry, and logic games.
          </p>
          <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Browse Vault ({totalGamesCount} Games) <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={onOpenDisguiseSettings}
          className="group p-6 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
        >
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl w-fit border border-indigo-500/20 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Academic Stealth Masking</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Instant panic key triggers standard calculus worksheets. Custom tab titles and Google / Classroom favicons keep your browser stealthy.
          </p>
          <span className="text-xs font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Configure Stealth Mask <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={onGoToCalculator}
          className="group p-6 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
        >
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit border border-emerald-500/20 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Scientific Plotting Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Built-in 2D coordinate plotting canvas, trigonometry solver, and polynomial function analyzer for genuine math coursework.
          </p>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Launch Graphing Calculator <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </section>

      {/* Curriculum Standards Banner */}
      <section className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-amber-400">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Aligned with Common Core & AP Mathematics Standards</h4>
            <p className="text-xs text-slate-400">Designed for middle school, high school, and undergraduate STEM students.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">Algebra II</span>
          <span className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">Calculus BC</span>
          <span className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">Physics I</span>
        </div>
      </section>
    </div>
  );
};
