import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Plus, Star, Layers, Grid, Compass } from 'lucide-react';
import { GameCard } from './GameCard';

export const GamesPortal = ({
  games,
  onSelectGame,
  disguiseSettings,
  onOpenAddGame
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('mathwhiz_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const categories = useMemo(() => {
    const cats = new Set(games.map((g) => g.category));
    return ['All', ...Array.from(cats)];
  }, [games]);

  const toggleFavorite = (gameId, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId];
      try {
        localStorage.setItem('mathwhiz_favorites', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
  };

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const titleToMatch = disguiseSettings.useDisguiseTitles ? game.disguiseTitle : game.title;
      const matchesSearch =
        titleToMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesFavorite = !onlyFavorites || favorites.includes(game.id);

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [games, searchQuery, selectedCategory, onlyFavorites, favorites, disguiseSettings.useDisguiseTitles]);

  return (
    <div className="space-y-6 py-4">
      {/* Search & Filter Control Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search math modules, games, or topics..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Favorites & Add Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              onlyFavorites
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            Starred ({favorites.length})
          </button>

          <button
            onClick={onOpenAddGame}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Custom
          </button>
        </div>
      </div>

      {/* Featured Games Banner (Show if no search filter) */}
      {!searchQuery && selectedCategory === 'All' && !onlyFavorites && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Top Popular Unblocked Lessons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {games
              .filter((g) => g.isFeatured)
              .slice(0, 3)
              .map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelectGame={onSelectGame}
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={toggleFavorite}
                  useDisguiseTitles={disguiseSettings.useDisguiseTitles}
                />
              ))}
          </div>
        </div>
      )}

      {/* Main Games Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {selectedCategory === 'All' ? 'Complete Module Vault' : `${selectedCategory} Vault`}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Showing {filteredGames.length} of {games.length} modules
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelectGame={onSelectGame}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
                useDisguiseTitles={disguiseSettings.useDisguiseTitles}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <Layers className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-200">No Interactive Lessons Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try adjusting your search filter or category selection.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyFavorites(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
