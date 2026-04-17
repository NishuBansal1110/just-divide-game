import React from "react";

const Panel = ({ queue, keep, setKeep, trash, setTrash }) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", queue[0]);
  };

  const handleKeep = () => {
    if (!keep) {
      setKeep(queue[0]);
    }
  };

  const handleTrash = () => {
    if (trash > 0) {
      setTrash(trash - 1);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
  <h3>Next</h3>

  <div
    draggable
    onDragStart={handleDragStart}
    style={{
      width: "70px",
      height: "70px",
      background: "#ff9900",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      margin: "10px auto",
      fontWeight: "bold",
      cursor: "grab",
    }}
  >
    {queue[0]}
  </div>

  <p>Queue: {queue.slice(1).join(", ")}</p>

  <h3>KEEP</h3>
  <div
    style={{
      width: "70px",
      height: "70px",
      background: "#90ee90",
      margin: "auto",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {keep}
  </div>

  <button onClick={handleKeep}>Store</button>

  <h3>TRASH ({trash})</h3>
  <button onClick={handleTrash}>Delete</button>
</div>
  );
};

export default Panel;