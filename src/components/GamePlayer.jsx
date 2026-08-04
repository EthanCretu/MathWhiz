import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  RefreshCw,
  Shield,
  HelpCircle,
  ExternalLink,
  Info,
  Gamepad2,
  Star,
  AlertTriangle,
  Radio
} from 'lucide-react';

export const GamePlayer = ({
  game,
  onBack,
  useDisguiseTitles,
  onTriggerPanic
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const allUrls = [game.iframeUrl, ...(game.fallbackUrls || [])];
  const activeUrl = allUrls[currentUrlIndex] || game.iframeUrl;
  const displayTitle = useDisguiseTitles ? game.disguiseTitle : game.title;

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleNextMirror = () => {
    if (allUrls.length <= 1) return;
    setIsLoading(true);
    setCurrentUrlIndex((prev) => (prev + 1) % allUrls.length);
  };

  const handleFullscreenToggle = () => {
    const elem = document.getElementById('game-iframe-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="space-y-4 py-2">
      {/* Top Header Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all border border-slate-700/80 flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Vault
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-tight">{displayTitle}</h2>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded-full">
                {game.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {useDisguiseTitles ? 'Interactive STEM Simulation Module' : game.description}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {allUrls.length > 1 && (
            <button
              onClick={handleNextMirror}
              className="px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              title="Switch Proxy Mirror Server"
            >
              <Radio className="w-3.5 h-3.5 text-indigo-400" /> Mirror #{currentUrlIndex + 1}
            </button>
          )}

          <button
            onClick={handleReload}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700"
            title="Reload Game Frame"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onTriggerPanic}
            className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            title="Instant Panic Key: Disguise Screen as Calculus Worksheet"
          >
            <Shield className="w-3.5 h-3.5 text-rose-400" /> Panic Shield
          </button>

          <button
            onClick={handleFullscreenToggle}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
          </button>
        </div>
      </div>

      {/* Main Game Frame Player Container */}
      <div
        id="game-iframe-container"
        className="relative w-full aspect-video min-h-[500px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-center items-center"
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <h3 className="text-base font-bold text-white mb-1">Connecting to Unblocked Proxy Link...</h3>
            <p className="text-xs text-slate-400">Loading interactive game environment ({displayTitle})</p>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={activeUrl}
          title={displayTitle}
          className="w-full h-full border-0 relative z-0"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Controls & Game Details Information Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-sky-400" /> Control Instructions
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {game.controls.map((ctrl, i) => (
              <li key={i} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                {ctrl}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-400" /> Module Details
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">{game.description}</p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Rating: ★ {game.rating.toFixed(1)}</span>
            <a
              href={activeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1 font-sans font-bold"
            >
              Open Direct <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
