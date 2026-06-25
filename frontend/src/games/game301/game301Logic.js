/*
|--------------------------------------------------------------------------
| Calculates score for current turn
|--------------------------------------------------------------------------
*/

export function calculateTurnScore(turn) {
  return turn.reduce((total, dart) => {
    if (!dart.value) return total;

    return total + (dart.value * dart.mult);
  }, 0);
}

/*
|--------------------------------------------------------------------------
| Double Out Validation
|--------------------------------------------------------------------------
*/

export function isWinningDouble(turn) {
  const lastDart = [...turn]
    .reverse()
    .find(d => d.value);

  return lastDart?.mult === 2;
}

/*
|--------------------------------------------------------------------------
| Bust Detection
|--------------------------------------------------------------------------
*/

export function isBust(
  currentScore,
  turnScore,
  turn,
  doubleOut
) {
  const remaining =
    currentScore - turnScore;

  if (remaining < 0) {
    return true;
  }

  if (doubleOut) {

    if (remaining === 1) {
      return true;
    }

    if (
      remaining === 0 &&
      !isWinningDouble(turn)
    ) {
      return true;
    }
  }

  return false;
}