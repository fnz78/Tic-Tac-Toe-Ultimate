/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Board } from './components/Board';
import { GameControls } from './components/GameControls';
import { ScoreBoard } from './components/ScoreBoard';
import { checkWinner, isBoardFull, getBestMove } from './utils/gameLogic';
import { BoardState, GameSettings, Player, Score } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Trophy } from 'lucide-react';
import Confetti from 'react-confetti';
import { Analytics } from '@vercel/analytics/react';

// Simple hook to get window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

function App() {
  // Game Settings
  const [settings, setSettings] = useState<GameSettings>({
    boardSize: 3,
    playerSymbol: 'X',
    computerSymbol: 'O',
    mode: 'PvC',
    difficulty: 'Easy',
  });

  // Game State
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [score, setScore] = useState<Score>({ player1: 0, player2: 0, draws: 0 });
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  
  const { width, height } = useWindowSize();

  // Initialize board when size changes
  useEffect(() => {
    handleNewGame();
  }, [settings.boardSize, settings.mode, settings.difficulty]);

  const handleNewGame = () => {
    setBoard(Array(settings.boardSize * settings.boardSize).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setIsComputerThinking(false);
  };

  const handleResetScores = () => {
    setScore({ player1: 0, player2: 0, draws: 0 });
    handleNewGame();
  };

  const handleSettingsChange = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || winner || isComputerThinking) return;

    // Player Move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check Win/Draw
    const result = checkWinner(newBoard, settings.boardSize);
    if (result.winner) {
      setWinner(result.winner);
      setWinningLine(result.line);
      updateScore(result.winner);
      return;
    } else if (isBoardFull(newBoard)) {
      setWinner('Draw');
      updateScore('Draw');
      return;
    }

    // Switch Turn
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);
  }, [board, winner, isComputerThinking, currentPlayer, settings.boardSize]);

  // Computer Move Effect
  useEffect(() => {
    if (settings.mode === 'PvC' && currentPlayer === 'O' && !winner && !isComputerThinking) {
      const makeComputerMove = async () => {
        setIsComputerThinking(true);
        // Small delay for realism
        await new Promise((resolve) => setTimeout(resolve, 600));

        const moveIndex = getBestMove(board, settings.boardSize, 'O', 'X', settings.difficulty);
        
        if (moveIndex !== -1) {
          const newBoard = [...board];
          newBoard[moveIndex] = 'O';
          setBoard(newBoard);

          const result = checkWinner(newBoard, settings.boardSize);
          if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);
            updateScore(result.winner);
          } else if (isBoardFull(newBoard)) {
            setWinner('Draw');
            updateScore('Draw');
          } else {
            setCurrentPlayer('X');
          }
        } else {
          // Safety check: If AI cannot move and there is no winner, it's a draw
          if (!winner && isBoardFull(board)) {
            setWinner('Draw');
            updateScore('Draw');
          }
        }
        setIsComputerThinking(false);
      };

      makeComputerMove();
    }
  }, [currentPlayer, settings.mode, winner, board, settings.boardSize, settings.difficulty]);

  const updateScore = (result: Player | 'Draw') => {
    setScore((prev) => {
      if (result === 'X') return { ...prev, player1: prev.player1 + 1 };
      if (result === 'O') return { ...prev, player2: prev.player2 + 1 };
      return { ...prev, draws: prev.draws + 1 };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {winner && winner !== 'Draw' && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={200}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, pointerEvents: 'none' }}
        />
      )}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-2">
            Tic Tac Toe <span className="text-indigo-600">Ultimate</span>
          </h1>
          <p className="text-gray-500 font-medium">
            {settings.mode === 'PvC' ? 'Challenge the AI' : 'Play with a friend'} • {settings.boardSize}x{settings.boardSize} Grid
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Game Board & Score */}
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <ScoreBoard 
              score={score} 
              settings={settings} 
              currentPlayer={currentPlayer}
              winner={winner}
            />

            <div className="relative w-full max-w-md">
              <Board
                board={board}
                size={settings.boardSize}
                onCellClick={handleCellClick}
                disabled={!!winner || isComputerThinking}
                winningLine={winningLine}
                symbolX={settings.playerSymbol}
                symbolO={settings.computerSymbol}
              />

              {/* Winner Overlay */}
              <AnimatePresence>
                {winner && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl z-20"
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 text-center transform rotate-0">
                      <div className="mb-2 flex justify-center">
                         {winner === 'Draw' ? (
                           <RefreshCw className="w-12 h-12 text-gray-400" />
                         ) : (
                           <Trophy className="w-12 h-12 text-yellow-500" />
                         )}
                      </div>
                      <h2 className="text-3xl font-black mb-1">
                        {winner === 'Draw' ? 'It\'s a Draw!' : `${winner === 'X' ? 'Player 1' : (settings.mode === 'PvC' ? 'Computer' : 'Player 2')} Wins!`}
                      </h2>
                      <p className="text-gray-500 mb-4 font-medium">
                        {winner === 'Draw' ? 'Well played both sides.' : 'Great game!'}
                      </p>
                      <button
                        onClick={handleNewGame}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105 active:scale-95"
                      >
                        Play Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Turn Indicator */}
            {!winner && (
              <div className="mt-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <span className="text-sm font-medium text-gray-500">Current Turn:</span>
                <span className={`font-bold ${currentPlayer === 'X' ? 'text-indigo-600' : 'text-rose-500'}`}>
                  {currentPlayer === 'X' ? `Player 1 (${settings.playerSymbol})` : `${settings.mode === 'PvC' ? 'Computer' : 'Player 2'} (${settings.computerSymbol})`}
                </span>
                {isComputerThinking && (
                  <span className="text-xs text-gray-400 animate-pulse ml-2">Thinking...</span>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-4 w-full max-w-md mx-auto lg:mx-0">
            <GameControls
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onReset={handleResetScores}
              onNewGame={handleNewGame}
            />
            
            <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-sm text-indigo-800">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span className="bg-indigo-200 text-indigo-700 w-5 h-5 rounded-full flex items-center justify-center text-xs">?</span>
                How to Play
              </h3>
              <ul className="list-disc list-inside space-y-1 opacity-80 pl-1">
                <li>Take turns placing your symbol on the grid.</li>
                <li>Get <strong>{settings.boardSize}</strong> in a row, column, or diagonal to win.</li>
                <li>Use "Hard" mode to challenge the Minimax AI.</li>
                <li>Customize symbols and board size for fun!</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <Analytics />
    </div>
  );
}

export default App;
