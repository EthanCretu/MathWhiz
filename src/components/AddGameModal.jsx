import React, { useState } from 'react';
import { X, Plus, Link as LinkIcon, Gamepad2 } from 'lucide-react';

export const AddGameModal = ({ onAddGame, onClose }) => {
  const [title, setTitle] = useState('');
  const [disguiseTitle, setDisguiseTitle] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [category, setCategory] = useState('3D Geometry');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !iframeUrl) return;

    const game = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      disguiseTitle: disguiseTitle.trim() || `Advanced ${category} Lab Module`,
      category,
      tags: ['Custom', 'User Added'],
      description: description.trim() || 'Custom user-imported interactive lesson iframe module.',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      iframeUrl: iframeUrl.trim(),
      controls: ['Standard Mouse & Keyboard Input'],
      rating: 5.0,
      plays: '1.0K',
      customAdded: true
    };

    onAddGame(game);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Import Custom Game iframe URL</h3>
            <p className="text-xs text-slate-400">Add any web game embed link into your MathWhiz Lessons vault</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Game Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Super Smash Flash 2 or Run 3"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Math Disguise Title (Optional)</label>
            <input
              type="text"
              value={disguiseTitle}
              onChange={(e) => setDisguiseTitle(e.target.value)}
              placeholder="e.g. Multivariable Matrix Transformation Lab"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-sky-400" /> Game iframe Web URL
            </label>
            <input
              type="url"
              required
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              placeholder="https://example.com/embed-game"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Subject / Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="3D Geometry">3D Geometry</option>
              <option value="Physics & Dynamics">Physics & Dynamics</option>
              <option value="Logic & Algebra">Logic & Algebra</option>
              <option value="Probability & Stats">Probability & Stats</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Brief Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of gameplay / controls..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add to Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
