import React, { useState, useEffect } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Panel from "./components/Panel";
import { canMerge } from "./utils/gameLogic";

const generateTile = () => {
  const values = [2, 3, 4, 6, 8, 12];
  return values[Math.floor(Math.random() * values.length)];
};

function App() {
  const [grid, setGrid] = useState(Array(16).fill(null));
  const [queue, setQueue] = useState([
    generateTile(),
    generateTile(),
    generateTile(),
  ]);
  const [score, setScore] = useState(0);
  const [keep, setKeep] = useState(null);
  const [trash, setTrash] = useState(3);
  const [undoStack, setUndoStack] = useState([]);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const newLevel = Math.floor(score / 10) + 1;
    setLevel(newLevel);
  }, [score]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [score, bestScore]);

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const last = undoStack[undoStack.length - 1];
    setGrid(last.grid);
    setQueue(last.queue);
    setScore(last.score);
    setUndoStack((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (!canMerge(grid)) {
      alert("Game Over!");
    }
  }, [grid]);

  return (
    <div className="app">
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ background: "#ff6b6b", padding: "10px 20px", borderRadius: "10px" }}>
          LEVEL {level}
        </div>

        <h1>JUST DIVIDE</h1>

        <div style={{ background: "#4dabf7", padding: "10px 20px", borderRadius: "10px" }}>
          SCORE {score}
        </div>
      </div>

      <button onClick={handleUndo}>Undo</button>

      <div className="game">
        <Grid
          grid={grid}
          setGrid={setGrid}
          queue={queue}
          setQueue={setQueue}
          setScore={setScore}
          score={score}
          keep={keep}
          setKeep={setKeep}
          undoStack={undoStack}
          setUndoStack={setUndoStack}
        />

        <Panel
          queue={queue}
          keep={keep}
          setKeep={setKeep}
          trash={trash}
          setTrash={setTrash}
        />
      </div>

      <h2>Score: {score}</h2>
      <h3>Best: {bestScore}</h3>
    </div>
  );
}

export default App;