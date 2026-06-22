import { useState } from "react";
import { loadPlayers } from "../services/storage";

const NUMBERS = [...Array(20).keys()].map(i => i + 1).concat([25]);

function Game301() {
  const players = loadPlayers();

  const [state, setState] = useState({
    player1: { name: players.player1 || "Player 1", score: 301 },
    player2: { name: players.player2 || "Player 2", score: 301 },
    currentPlayer: 1,
    winner: null
  });

  const [turn, setTurn] = useState([
    { value: null, mult: 1 },
    { value: null, mult: 1 },
    { value: null, mult: 1 }
  ]);

  const [activeDart, setActiveDart] = useState(0);

  const currentPlayer =
    state.currentPlayer === 1 ? state.player1 : state.player2;

  const setValue = (num) => {
    setTurn(prev => {
      const copy = [...prev];
      copy[activeDart].value = num;
      return copy;
    });
  };

  const setMultiplier = (m) => {
    setTurn(prev => {
      const copy = [...prev];
      copy[activeDart].mult = m;
      return copy;
    });
  };

  const nextDart = () => {
    setActiveDart(prev => (prev < 2 ? prev + 1 : prev));
  };

  const resetTurn = () => {
    setTurn([
      { value: null, mult: 1 },
      { value: null, mult: 1 },
      { value: null, mult: 1 }
    ]);
    setActiveDart(0);
  };

  const calcScore = () =>
    turn.reduce((sum, d) => sum + (d.value ? d.value * d.mult : 0), 0);

  const submitTurn = () => {
    const score = calcScore();

    setState(prev => {
      const key = prev.currentPlayer === 1 ? "player1" : "player2";
      const newScore = prev[key].score - score;

      if (newScore < 0) {
        resetTurn();
        return {
          ...prev,
          currentPlayer: prev.currentPlayer === 1 ? 2 : 1
        };
      }

      if (newScore === 0) {
        resetTurn();
        return {
          ...prev,
          [key]: { ...prev[key], score: 0 },
          winner: prev[key].name
        };
      }

      resetTurn();

      return {
        ...prev,
        [key]: { ...prev[key], score: newScore },
        currentPlayer: prev.currentPlayer === 1 ? 2 : 1
      };
    });
  };

  return (
    <div className="container">

      {/* TITLE */}
      <div className="card">
        <h1>301 Darts</h1>
      </div>

      {/* WINNER */}
      {state.winner && (
        <div className="card">
          <h2 style={{ color: "var(--accent)" }}>
            Winner: {state.winner}
          </h2>
        </div>
      )}

      {/* SCOREBOARD */}
      <div className="card">
        <h2>{state.player1.name}</h2>
        <h1>{state.player1.score}</h1>
      </div>

      <div className="card">
        <h2>{state.player2.name}</h2>
        <h1>{state.player2.score}</h1>
      </div>

      {/* CURRENT TURN */}
      {!state.winner && (
        <>
          <div className="card">
            <h3>Current Turn</h3>
            <h2>{currentPlayer.name}</h2>
          </div>

          {/* DART INPUTS */}
          <div className="card">
            {turn.map((d, i) => (
              <div
                key={i}
                className="dart-slot"
                style={{
                  border:
                    i === activeDart
                      ? "2px solid var(--accent)"
                      : "1px solid var(--border)"
                }}
              >
                Dart {i + 1}:{" "}
                <b>
                  {d.value ? `${d.value} × ${d.mult}` : "Not set"}
                </b>
              </div>
            ))}
          </div>

          {/* MULTIPLIER */}
          <div className="card">
            <button onClick={() => setMultiplier(1)}>Single</button>
            <button onClick={() => setMultiplier(2)}>Double</button>
            <button onClick={() => setMultiplier(3)}>Triple</button>
          </div>

          {/* NUMBER PAD */}
          <div className="card grid">
            {NUMBERS.map(n => (
              <button key={n} onClick={() => setValue(n)}>
                {n}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="card">
            <button onClick={nextDart}>Next Dart</button>
            <button onClick={resetTurn}>Clear Turn</button>

            <button className="primary" onClick={submitTurn}>
              Submit ({calcScore()})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Game301;