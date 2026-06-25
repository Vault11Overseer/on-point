/*
|--------------------------------------------------------------------------
| MATCH ENGINE (301)
|--------------------------------------------------------------------------
|
| Handles ALL game rules:
| - scoring
| - bust logic
| - win conditions
| - leg tracking (future)
| - set tracking (future)
|
| React should NEVER contain rules logic.
|
*/
import {
  calculateTurnScore,
  isBust
} from "./game301Logic";

import {
  GAME_301_CONFIG
} from "./game301Config";

/*
|--------------------------------------------------------------------------
| APPLY TURN (WITH HISTORY SNAPSHOT SUPPORT)
|--------------------------------------------------------------------------
*/

export function applyTurn({ state, turn }) {
  const turnScore = calculateTurnScore(turn);

  const key =
    state.currentPlayer === 1
      ? "player1"
      : "player2";

  const player = state[key];

  // -----------------------------
  // SNAPSHOT (FOR UNDO SYSTEM)
  // -----------------------------

  const snapshot = {
    player1: { ...state.player1 },
    player2: { ...state.player2 },
    currentPlayer: state.currentPlayer,
    winner: state.winner,
    history: state.history
  };

  const newHistory = [
    ...state.history,
    {
      snapshot,
      turn,
      player: player.name,
      score: turnScore,
      timestamp: Date.now()
    }
  ];

  // -----------------------------
  // BUST CHECK
  // -----------------------------

  const busted = isBust(
    player.score,
    turnScore,
    turn,
    GAME_301_CONFIG.doubleOut
  );

  if (busted) {
    return {
      ...state,
      history: newHistory,
      currentPlayer:
        state.currentPlayer === 1 ? 2 : 1
    };
  }

  const newScore = player.score - turnScore;

  // -----------------------------
  // WIN CONDITION
  // -----------------------------

  if (newScore === 0) {
    return {
      ...state,
      history: newHistory,
      [key]: {
        ...player,
        score: 0,
        legs: player.legs + 1
      },
      winner: player.name
    };
  }

  // -----------------------------
  // NORMAL TURN
  // -----------------------------

  return {
    ...state,
    history: newHistory,
    [key]: {
      ...player,
      score: newScore
    },
    currentPlayer:
      state.currentPlayer === 1 ? 2 : 1
  };
}

/*
|--------------------------------------------------------------------------
| UNDO LAST TURN
|--------------------------------------------------------------------------
*/

export function undoLastTurn(state) {
  if (!state.history.length) return state;

  const last = state.history[state.history.length - 1];

  return {
    ...last.snapshot,
    history: state.history.slice(0, -1)
  };
}