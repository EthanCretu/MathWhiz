import React from 'react';
import { Star, Play, Sparkles, User, Tag, Eye } from 'lucide-react';

export const GameCard = ({
  game,
  onSelectGame,
  isFavorite,
  onToggleFavorite,
  useDisguiseTitles
}) => {
  const displayTitle = useDisguiseTitles ? game.disguiseTitle : game.title;

  return (
    <div
      onClick={() => onSelectGame(game)}
      className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={game.thumbnail}
          alt={displayTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md transition-all ${
            isFavorite
              ? 'bg-amber-500/90 text-white shadow-lg'
              : 'bg-slate-950/60 text-slate-400 hover:text-amber-400 hover:bg-slate-950/80'
          }`}
          title={isFavorite ? 'Remove from Starred' : 'Star Game'}
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Category Badge */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-sky-400 rounded-lg">
          {game.category}
        </span>

        {/* Play Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-xl font-extrabold text-xs shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
            <Play className="w-4 h-4 fill-current" /> Launch Lesson
          </div>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              ★ {game.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {game.plays} plays
            </span>
          </div>

          <h3 className="font-bold text-sm text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
            {displayTitle}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {game.description}
          </p>
        </div>

        {/* Tags Footnote */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
          <div className="flex items-center gap-1 overflow-hidden">
            <Tag className="w-3 h-3 text-slate-500 flex-shrink-0" />
            <span className="truncate">{game.tags.join(' • ')}</span>
          </div>
          {game.customAdded && (
            <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
              Custom
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
