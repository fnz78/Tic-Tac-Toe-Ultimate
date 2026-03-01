import React from 'react';
import { motion } from 'motion/react';
import { CellValue } from '../types';
import { cn } from '../utils/cn'; // We'll need a utility for classnames, or just use template literals

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
  symbolX: string;
  symbolO: string;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, disabled, isWinningCell, symbolX, symbolO }) => {
  return (
    <motion.button
      whileHover={!disabled && !value ? { scale: 0.95 } : {}}
      whileTap={!disabled && !value ? { scale: 0.9 } : {}}
      className={`
        aspect-square w-full rounded-xl text-3xl sm:text-4xl md:text-5xl font-bold flex items-center justify-center shadow-sm transition-colors
        ${value === null ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'cursor-default'}
        ${isWinningCell ? 'bg-green-100 ring-4 ring-green-400 z-10' : ''}
        ${!isWinningCell && value !== null ? 'bg-white' : ''}
      `}
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      {value === 'X' && (
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="text-indigo-600"
        >
          {symbolX}
        </motion.span>
      )}
      {value === 'O' && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-rose-500"
        >
          {symbolO}
        </motion.span>
      )}
    </motion.button>
  );
};
