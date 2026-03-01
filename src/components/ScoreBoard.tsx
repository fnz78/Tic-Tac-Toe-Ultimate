import React from 'react';
import { Score, GameSettings } from '../types';
import { Trophy, User, Bot, Minus } from 'lucide-react';

interface ScoreBoardProps {
  score: Score;
  settings: GameSettings;
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | 'Draw' | null;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, settings, currentPlayer, winner }) => {
  const isP1Turn = currentPlayer === 'X' && !winner;
  const isP2Turn = currentPlayer === 'O' && !winner;

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md mx-auto mb-6">
      {/* Player 1 Score */}
      <div className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${isP1Turn ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105' : 'border-transparent bg-white shadow-sm'}`}>
        <div className="flex items-center gap-1 text-indigo-600 font-bold mb-1">
          <User className="w-4 h-4" />
          <span>P1 ({settings.playerSymbol})</span>
        </div>
        <span className="text-2xl font-black text-gray-800">{score.player1}</span>
      </div>

      {/* Draws */}
      <div className="flex flex-col items-center p-3 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="flex items-center gap-1 text-gray-500 font-medium mb-1">
          <Minus className="w-4 h-4" />
          <span>Draws</span>
        </div>
        <span className="text-2xl font-black text-gray-600">{score.draws}</span>
      </div>

      {/* Player 2 / Bot Score */}
      <div className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${isP2Turn ? 'border-rose-500 bg-rose-50 shadow-md scale-105' : 'border-transparent bg-white shadow-sm'}`}>
        <div className="flex items-center gap-1 text-rose-500 font-bold mb-1">
          {settings.mode === 'PvC' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
          <span>{settings.mode === 'PvC' ? 'Bot' : 'P2'} ({settings.computerSymbol})</span>
        </div>
        <span className="text-2xl font-black text-gray-800">{score.player2}</span>
      </div>
    </div>
  );
};
