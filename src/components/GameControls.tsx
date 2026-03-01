import React from 'react';
import { GameSettings, GameMode, Difficulty } from '../types';
import { Settings, User, Bot, Monitor, Grid3x3, Grid2x2, Hash } from 'lucide-react';

interface GameControlsProps {
  settings: GameSettings;
  onSettingsChange: (newSettings: Partial<GameSettings>) => void;
  onReset: () => void;
  onNewGame: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({ settings, onSettingsChange, onReset, onNewGame }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 text-gray-700 font-semibold border-b border-gray-100 pb-2 mb-2">
        <Settings className="w-5 h-5" />
        <span>Game Settings</span>
      </div>

      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Game Mode</label>
        <div className="flex gap-2">
          <button
            onClick={() => onSettingsChange({ mode: 'PvP' })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              settings.mode === 'PvP' ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4" /> vs <User className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSettingsChange({ mode: 'PvC' })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              settings.mode === 'PvC' ? 'bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4" /> vs <Bot className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Difficulty (Only for PvC) */}
      {settings.mode === 'PvC' && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</label>
          <div className="flex gap-2">
            <button
              onClick={() => onSettingsChange({ difficulty: 'Easy' })}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                settings.difficulty === 'Easy' ? 'bg-green-100 text-green-700 ring-1 ring-green-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => onSettingsChange({ difficulty: 'Hard' })}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                settings.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      )}

      {/* Board Size */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Board Size</label>
        <div className="flex gap-2">
          {[3, 4, 5].map((size) => (
            <button
              key={size}
              onClick={() => onSettingsChange({ boardSize: size })}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                settings.boardSize === size ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-200' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </div>

      {/* Symbols */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Symbols</label>
        <div className="grid grid-cols-2 gap-2">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] text-gray-400">Player 1</span>
             <input 
               type="text" 
               maxLength={2}
               value={settings.playerSymbol}
               onChange={(e) => onSettingsChange({ playerSymbol: e.target.value || 'X' })}
               className="w-full p-2 border border-gray-200 rounded-lg text-center font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
             />
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-[10px] text-gray-400">Player 2 / Bot</span>
             <input 
               type="text" 
               maxLength={2}
               value={settings.computerSymbol}
               onChange={(e) => onSettingsChange({ computerSymbol: e.target.value || 'O' })}
               className="w-full p-2 border border-gray-200 rounded-lg text-center font-bold text-rose-500 focus:ring-2 focus:ring-rose-500 outline-none"
             />
           </div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
        <button
          onClick={onNewGame}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          New Game
        </button>
        <button
          onClick={onReset}
          className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
};
