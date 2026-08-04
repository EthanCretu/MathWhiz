import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { GamesPortal } from './components/GamesPortal';
import { GamePlayer } from './components/GamePlayer';
import { MathCalculator } from './components/MathCalculator';
import { MathWorksheet } from './components/MathWorksheet';
import { DisguiseSettingsModal } from './components/DisguiseSettingsModal';
import { AddGameModal } from './components/AddGameModal';

const DEFAULT_DISGUISE_SETTINGS = {
  useDisguiseTitles: false,
  tabTitle: 'MathWhiz K-12 STEM Portal',
  panicKey: 'Escape',
  disguiseFavicon: 'math',
};

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [showDisguiseModal, setShowDisguiseModal] = useState(false);
  const [showAddGameModal, setShowAddGameModal] = useState(false);

  const [disguiseSettings, setDisguiseSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('mathwhiz_disguise_settings');
      return saved ? JSON.parse(saved) : DEFAULT_DISGUISE_SETTINGS;
    } catch (e) {
      return DEFAULT_DISGUISE_SETTINGS;
    }
  });

  // Fetch unblocked games database from public/games.json + custom local games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/games.json');
        const data = await response.json();

        // Retrieve custom user-added games from localStorage
        const customSaved = localStorage.getItem('mathwhiz_custom_games');
        const customGames = customSaved ? JSON.parse(customSaved) : [];

        setGames([...data, ...customGames]);
      } catch (err) {
        console.error('Failed to load games.json:', err);
      }
    };
    fetchGames();
  }, []);

  // Sync Tab Title and Favicon based on Stealth Mask Settings
  useEffect(() => {
    document.title = disguiseSettings.tabTitle || 'MathWhiz K-12 STEM Portal';

    const faviconElem = document.querySelector("link[rel*='icon']");
    if (faviconElem) {
      if (disguiseSettings.disguiseFavicon === 'google') {
        faviconElem.setAttribute('href', 'https://www.google.com/favicon.ico');
      } else if (disguiseSettings.disguiseFavicon === 'classroom') {
        faviconElem.setAttribute('href', 'https://ssl.gstatic.com/classroom/favicon.png');
      } else if (disguiseSettings.disguiseFavicon === 'desmos') {
        faviconElem.setAttribute('href', 'https://www.desmos.com/favicon.ico');
      } else {
        faviconElem.setAttribute('href', '/favicon.ico');
      }
    }
  }, [disguiseSettings]);

  // Global Panic Key Listener (Esc key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === disguiseSettings.panicKey) {
        setIsPanicActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disguiseSettings.panicKey]);

  const handleSaveDisguiseSettings = (newSettings) => {
    setDisguiseSettings(newSettings);
    try {
      localStorage.setItem('mathwhiz_disguise_settings', JSON.stringify(newSettings));
    } catch (e) {}
  };

  const handleAddGame = (newGame) => {
    setGames((prev) => [newGame, ...prev]);
    try {
      const customSaved = localStorage.getItem('mathwhiz_custom_games');
      const customGames = customSaved ? JSON.parse(customSaved) : [];
      localStorage.setItem('mathwhiz_custom_games', JSON.stringify([newGame, ...customGames]));
    } catch (e) {}
  };

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setActiveTab('play');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      {/* Panic Overlay Mask (Triggered via Esc key or panic button) */}
      {isPanicActive && (
        <MathWorksheet isPanicOverlay={true} onClosePanic={() => setIsPanicActive(false)} />
      )}

      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'play') setSelectedGame(null);
          }}
          onOpenDisguiseSettings={() => setShowDisguiseModal(true)}
          onOpenAddGame={() => setShowAddGameModal(true)}
          disguiseSettings={disguiseSettings}
        />

        {/* Main Content Viewport */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {activeTab === 'home' && (
            <HomePage
              onGoToLessons={() => setActiveTab('games')}
              onGoToWorksheet={() => setActiveTab('worksheet')}
              onGoToCalculator={() => setActiveTab('calculator')}
              onOpenDisguiseSettings={() => setShowDisguiseModal(true)}
              totalGamesCount={games.length}
            />
          )}

          {activeTab === 'games' && (
            <GamesPortal
              games={games}
              onSelectGame={handleSelectGame}
              disguiseSettings={disguiseSettings}
              onOpenAddGame={() => setShowAddGameModal(true)}
            />
          )}

          {activeTab === 'play' && selectedGame && (
            <GamePlayer
              game={selectedGame}
              onBack={() => {
                setActiveTab('games');
                setSelectedGame(null);
              }}
              useDisguiseTitles={disguiseSettings.useDisguiseTitles}
              onTriggerPanic={() => setIsPanicActive(true)}
            />
          )}

          {activeTab === 'worksheet' && <MathWorksheet />}

          {activeTab === 'calculator' && <MathCalculator />}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 MathWhiz Interactive STEM Learning Portal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <button onClick={() => setShowDisguiseModal(true)} className="hover:text-white transition-colors">
              Stealth Masking
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('worksheet')} className="hover:text-white transition-colors">
              Practice Worksheet
            </button>
            <span>•</span>
            <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
              Scientific Calculator
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showDisguiseModal && (
        <DisguiseSettingsModal
          settings={disguiseSettings}
          onSaveSettings={handleSaveDisguiseSettings}
          onClose={() => setShowDisguiseModal(false)}
        />
      )}

      {showAddGameModal && (
        <AddGameModal onAddGame={handleAddGame} onClose={() => setShowAddGameModal(false)} />
      )}
    </div>
  );
}

export default App;
