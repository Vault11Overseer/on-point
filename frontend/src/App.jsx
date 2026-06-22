import { useState } from "react";

function App() {
  const [player1, setPlayer1] = useState(301);
  const [player2, setPlayer2] = useState(301);

  const scorePlayer1 = (points) => {
    setPlayer1(player1 - points);
  };

  const scorePlayer2 = (points) => {
    setPlayer2(player2 - points);
  };

  return (
    <div>
      <h1>Dart Counter</h1>

      <h2>Player 1: {player1}</h2>

      <button onClick={() => scorePlayer1(60)}>60</button>
      <button onClick={() => scorePlayer1(100)}>100</button>

      <hr />

      <h2>Player 2: {player2}</h2>

      <button onClick={() => scorePlayer2(60)}>60</button>
      <button onClick={() => scorePlayer2(100)}>100</button>
    </div>
  );
}

export default App;