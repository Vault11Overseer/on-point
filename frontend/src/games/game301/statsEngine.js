/*
|--------------------------------------------------------------------------
| STATS ENGINE
|--------------------------------------------------------------------------
*/

export function calculateTotalDarts(history) {
  return history.length * 3;
}

export function calculateTotalScore(history) {
  return history.reduce(
    (sum, h) => sum + h.score,
    0
  );
}

export function calculateAverage(history) {
  const totalScore = calculateTotalScore(history);
  const totalDarts = calculateTotalDarts(history);

  if (!totalDarts) return 0;

  return ((totalScore / totalDarts) * 3).toFixed(2);
}

export function highestVisit(history) {
  return Math.max(
    ...history.map(h => h.score),
    0
  );
}