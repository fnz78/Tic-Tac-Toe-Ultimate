export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type BoardState = CellValue[];

export type GameMode = 'PvP' | 'PvC'; // Player vs Player, Player vs Computer
export type Difficulty = 'Easy' | 'Hard';

export interface GameSettings {
  boardSize: number;
  playerSymbol: string;
  computerSymbol: string;
  mode: GameMode;
  difficulty: Difficulty;
}

export interface Score {
  player1: number; // Player or X
  player2: number; // Computer or O
  draws: number;
}
