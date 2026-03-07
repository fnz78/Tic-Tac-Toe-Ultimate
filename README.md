# Tic-Tac-Toe Ultimate 🎮



A feature-rich, modern Tic-Tac-Toe game built with React, TypeScript, and Tailwind CSS. Challenge your friends or test your skills against an AI opponent with adjustable difficulty!



## ✨ Features

- **Multiple Game Modes**:
  - 👤 **PvP**: Play against a friend on the same device.
  - 🤖 **PvC**: Play against the computer.
- **AI Difficulty Levels**:
  - 🟢 **Easy**: Random moves for a casual game.
  - 🔴 **Hard**: Unbeatable AI using the Minimax algorithm.
- **Customizable Boards**: Choose from 3x3, 4x4, or 5x5 grids.
- **Personalized Symbols**: Use emojis or custom text for your player markers.
- **Score Tracking**: Keep track of wins, losses, and draws during your session.
- **Responsive Design**: Fully playable on desktop, tablet, and mobile devices.
- **Victory Celebration**: Confetti animation when you win! 🎉
- **Robust Game Logic**: Handles edge cases like draws on full boards seamlessly.

## 🎮 How to Play

1. **Select Mode**: Choose between Player vs Player (PvP) or Player vs Computer (PvC).
2. **Choose Difficulty**: If playing against the AI, select 'Easy' for a relaxed game or 'Hard' for a challenge.
3. **Customize**: Pick your board size (3x3 to 5x5) and enter custom symbols (e.g., 🚀 vs 🛸) if you like!
4. **Start Game**: Click on the grid cells to place your mark.
5. **Win**: Get your symbols in a row, column, or diagonal to win the round.
6. **Draw**: If the board fills up without a winner, it's a draw!

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📂 Project Structure

```
/src
  ├── components/      # Reusable UI components (Board, Cell, ScoreBoard, etc.)
  ├── utils/           # Game logic and helper functions (minimax, win check)
  ├── types.ts         # TypeScript interfaces and types
  ├── App.tsx          # Main application component
  └── main.tsx         # Entry point
```

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe-ultimate.git
   cd tic-tac-toe-ultimate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in your browser**
   Visit `http://localhost:5173` (or the port shown in your terminal).

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements or new features.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by fnz78
