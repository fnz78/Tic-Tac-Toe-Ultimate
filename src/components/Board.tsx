import React from 'react';
import { BoardState } from '../types';
import { Cell } from './Cell';

interface BoardProps {
  board: BoardState;
  size: number;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine: number[] | null;
  symbolX: string;
  symbolO: string;
}

export const Board: React.FC<BoardProps> = ({ board, size, onCellClick, disabled, winningLine, symbolX, symbolO }) => {
  return (
    <div
      className="grid gap-2 sm:gap-3 w-full max-w-md mx-auto p-4 bg-gray-200 rounded-2xl shadow-inner"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
      }}
    >
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled}
          isWinningCell={winningLine?.includes(index) ?? false}
          symbolX={symbolX}
          symbolO={symbolO}
        />
      ))}
    </div>
  );
};
