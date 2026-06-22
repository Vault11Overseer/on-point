import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { savePlayers, loadPlayers } from "../services/storage";

function Home() {
  const navigate = useNavigate();

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  useEffect(() => {
    const players = loadPlayers();

    setPlayer1(players.player1);
    setPlayer2(players.player2);
  }, []);

  const startGame = () => {
    savePlayers(player1, player2);

    navigate("/301");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dart Counter</h1>

      <h2>Player 1</h2>

      <input
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />

      <h2>Player 2</h2>

      <input
        value={player2}
        onChange={(e) => setPlayer2(e.target.value)}
      />

      <br />
      <br />

      <button onClick={startGame}>
        Start 301 Game
      </button>
    </div>
  );
}

export default Home;