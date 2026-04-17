import "./Grid.css";
import React from "react";


import { handleMerge } from "../utils/gameLogic";

const Grid = ({ grid, setGrid, queue, setQueue, setScore, score, keep, setKeep, undoStack, setUndoStack }) => {

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (grid[index]) return;
    setUndoStack((prev) => [
      ...prev,
      { grid: [...grid], queue: [...queue], score }
    ].slice(-10));
  

    const value = queue[0];

    const newGrid = handleMerge(grid, index, value);

    setGrid(newGrid);

    // update queue
    setQueue((prev) => {
      const newQueue = [...prev];
      newQueue.shift();
      newQueue.push(Math.floor(Math.random() * 10) + 2);
      return newQueue;
    });

    setScore((prev) => prev + 1);
  };

  return (
    <div className="grid">
      {grid.map((cell, i) => (
        <div
          key={i}
          className="cell"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, i)}
        >
          {cell && <div className="tile">{cell}</div>}
        </div>
      ))}
    </div>
  );
};

export default Grid;