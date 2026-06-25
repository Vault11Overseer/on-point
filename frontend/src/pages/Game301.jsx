import { useState } from "react";

import { loadPlayers } from "../services/storage";

import {
  GAME_301_CONFIG
} from "../games/game301/game301Config";

import {
  CHECKOUTS
} from "../games/game301/checkoutTable";

import {
  calculateTurnScore,
  isBust
} from "../games/game301/game301Logic";

import { applyTurn } from "../games/game301/matchEngine";


const NUMBERS = [...Array(20).keys()]
  .map(i => i + 1)
  .concat([25]);

function Game301() {
  const players = loadPlayers();

  const [state, setState] = useState({
    player1: {
      name: players.player1 || "Player 1",
      score: GAME_301_CONFIG.startScore,
      legs: 0,
      sets: 0
    },

    player2: {
      name: players.player2 || "Player 2",
      score: GAME_301_CONFIG.startScore,
      legs: 0,
      sets: 0
    },

    currentPlayer: 1,

    winner: null,

    history: []
  });

  const [turn, setTurn] = useState([
    { value: null, mult: 1 },
    { value: null, mult: 1 },
    { value: null, mult: 1 }
  ]);

  const [activeDart, setActiveDart] = useState(0);

  const currentPlayer =
    state.currentPlayer === 1
      ? state.player1
      : state.player2;

  const setValue = (num) => {
    setTurn(prev => {
      const copy = [...prev];

      copy[activeDart].value = num;

      return copy;
    });

    if (
      activeDart <
      GAME_301_CONFIG.dartsPerTurn - 1
    ) {
      setActiveDart(prev => prev + 1);
    }
  };

  const setMultiplier = (m) => {
    setTurn(prev => {
      const copy = [...prev];

      copy[activeDart].mult = m;

      return copy;
    });
  };

  const undoLastDart = () => {
    const previousIndex =
      activeDart > 0
        ? activeDart - 1
        : 0;

    setTurn(prev => {
      const copy = [...prev];

      copy[previousIndex] = {
        value: null,
        mult: 1
      };

      return copy;
    });

    setActiveDart(previousIndex);
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
    calculateTurnScore(turn);

  const remainingScore =
    currentPlayer.score -
    calcScore();

    // SUBMIT TURN
    const submitTurn = () => {
  setState(prev =>
    applyTurn({
      state: prev,
      turn
    })
  );

  resetTurn();
};



    // RETURN
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

        <small>
          Legs: {state.player1.legs}
        </small>
      </div>

      <div className="card">
        <h2>{state.player2.name}</h2>
        <h1>{state.player2.score}</h1>

        <small>
          Legs: {state.player2.legs}
        </small>
      </div>

      {!state.winner && (
        <>
          {/* CURRENT PLAYER */}

          <div className="card">
            <h3>Current Turn</h3>
            <h2>{currentPlayer.name}</h2>
          </div>

          {/* CHECKOUT */}

          <div className="card">
            <h3>Checkout Suggestion</h3>

            <h2>
              {CHECKOUTS[remainingScore] || "--"}
            </h2>

            <small>
              Remaining: {remainingScore}
            </small>
          </div>

          {/* DARTS */}

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
                  {d.value
                    ? `${d.value} × ${d.mult}`
                    : "Not set"}
                </b>
              </div>
            ))}
          </div>

          {/* MULTIPLIERS */}

          <div className="card">
            <button
              onClick={() =>
                setMultiplier(1)
              }
            >
              Single
            </button>

            <button
              onClick={() =>
                setMultiplier(2)
              }
            >
              Double
            </button>

            <button
              onClick={() =>
                setMultiplier(3)
              }
            >
              Triple
            </button>
          </div>

          {/* NUMBER PAD */}

          <div className="card grid">
            {NUMBERS.map(n => (
              <button
                key={n}
                onClick={() => setValue(n)}
              >
                {n}
              </button>
            ))}
          </div>

          {/* ACTIONS */}

          <div className="card">

            <button
              onClick={undoLastDart}
            >
              Undo Dart
            </button>

            <button
              onClick={resetTurn}
            >
              Clear Turn
            </button>

            <button
              className="primary"
              onClick={submitTurn}
            >
              Submit ({calcScore()})
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Game301;