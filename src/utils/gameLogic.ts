import { BoardState, Player } from '../types';

export const checkWinner = (board: BoardState, size: number): { winner: Player | null; line: number[] | null } => {
  const lines: number[][] = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    lines.push(col);
  }

  // Diagonals
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag1);
  lines.push(diag2);

  for (const line of lines) {
    const first = board[line[0]];
    if (first && line.every((index) => board[index] === first)) {
      return { winner: first, line };
    }
  }

  return { winner: null, line: null };
};

export const isBoardFull = (board: BoardState): boolean => {
  return board.every((cell) => cell !== null);
};

export const getBestMove = (board: BoardState, size: number, computerPlayer: Player, humanPlayer: Player, difficulty: 'Easy' | 'Hard'): number => {
  const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;

  // Easy mode: Random move
  if (difficulty === 'Easy') {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Hard mode: Minimax
  // Optimization: For 4x4 and 5x5, limit depth or use heuristics because full minimax is too slow
  const maxDepth = size === 3 ? -1 : size === 4 ? 4 : 3; 
  
  return minimaxRoot(board, size, computerPlayer, humanPlayer, maxDepth);
};

const minimaxRoot = (board: BoardState, size: number, aiPlayer: Player, humanPlayer: Player, maxDepth: number): number => {
  let bestScore = -Infinity;
  let bestMove = -1;
  const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];

  // If it's the very first move on a large board, pick center or random to save time
  if (availableMoves.length === size * size) {
     return Math.floor(size * size / 2);
  }

  for (const move of availableMoves) {
    board[move] = aiPlayer;
    const score = minimax(board, size, 0, false, aiPlayer, humanPlayer, -Infinity, Infinity, maxDepth);
    board[move] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
};

const minimax = (
  board: BoardState, 
  size: number, 
  depth: number, 
  isMaximizing: boolean, 
  aiPlayer: Player, 
  humanPlayer: Player,
  alpha: number,
  beta: number,
  maxDepth: number
): number => {
  const { winner } = checkWinner(board, size);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isBoardFull(board)) return 0;
  if (maxDepth !== -1 && depth >= maxDepth) return 0; // Depth limit reached

  if (isMaximizing) {
    let maxEval = -Infinity;
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    for (const move of availableMoves) {
      board[move] = aiPlayer;
      const evalScore = minimax(board, size, depth + 1, false, aiPlayer, humanPlayer, alpha, beta, maxDepth);
      board[move] = null;
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null) as number[];
    for (const move of availableMoves) {
      board[move] = humanPlayer;
      const evalScore = minimax(board, size, depth + 1, true, aiPlayer, humanPlayer, alpha, beta, maxDepth);
      board[move] = null;
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};
