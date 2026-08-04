import React from 'react';
import { X, Shield, Eye, Check, Key, Globe, Sparkles } from 'lucide-react';

export const DisguiseSettingsModal = ({
  settings,
  onSaveSettings,
  onClose
}) => {
  const handleChange = (field, value) => {
    onSaveSettings({
      ...settings,
      [field]: value
    });
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
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Stealth Masking & Panic Disguise</h3>
            <p className="text-xs text-slate-400">Camouflage your lesson tab and configure instant panic hotkeys</p>
          </div>
        </div>

        <div className="space-y-5 text-xs">
          {/* Toggle Disguise Titles */}
          <div className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <span className="font-bold text-slate-200 block">Replace Game Titles with Math Disguises</span>
              <span className="text-[11px] text-slate-400">e.g. "Basket Bros" displays as "Matrix Vector Space Lab"</span>
            </div>
            <button
              onClick={() => handleChange('useDisguiseTitles', !settings.useDisguiseTitles)}
              className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                settings.useDisguiseTitles ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.useDisguiseTitles ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Tab Title Mask Input */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Browser Tab Title Mask</label>
            <input
              type="text"
              value={settings.tabTitle}
              onChange={(e) => handleChange('tabTitle', e.target.value)}
              placeholder="Google Classroom - Math Section 4"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Favicon Disguise Presets */}
          <div>
            <label className="block font-bold text-slate-300 mb-2">Browser Favicon Icon Disguise</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'math', label: 'MathWhiz Logo', icon: '📐' },
                { id: 'google', label: 'Google Search', icon: '🔍' },
                { id: 'classroom', label: 'Google Classroom', icon: '🏫' },
                { id: 'desmos', label: 'Desmos Calculator', icon: '📊' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleChange('disguiseFavicon', item.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    settings.disguiseFavicon === item.id
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Panic Key Notice */}
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Key className="w-4 h-4 text-rose-400" /> Panic Hotkey Active: Press <kbd className="px-1.5 py-0.5 bg-rose-950 border border-rose-800 rounded font-mono text-[10px]">Esc</kbd>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pressing the Escape key anywhere on the site immediately covers your screen with an AP Calculus worksheet.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            Save Stealth Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
