import {
  calculateTurnScore,
  isBust
} from "./game301Logic";

import { GAME_301_CONFIG } from "./game301Config";

/*
|--------------------------------------------------------------------------
| APPLY TURN (CORE GAME ENGINE)
|--------------------------------------------------------------------------
*/

export function applyTurn({ state, turn }) {
  const turnScore = calculateTurnScore(turn);

  const key =
    state.currentPlayer === 1
      ? "player1"
      : "player2";

  const player = state[key];

  // Save snapshot for undo/history
  const snapshot = structuredClone(state);

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

  // BUST
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
      currentPlayer: state.currentPlayer === 1 ? 2 : 1
    };
  }

  const newScore = player.score - turnScore;

  // WIN
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

  // NORMAL TURN
  return {
    ...state,
    history: newHistory,
    [key]: {
      ...player,
      score: newScore
    },
    currentPlayer: state.currentPlayer === 1 ? 2 : 1
  };
}

/*
|--------------------------------------------------------------------------
| UNDO SYSTEM (FULL STATE RESTORE)
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