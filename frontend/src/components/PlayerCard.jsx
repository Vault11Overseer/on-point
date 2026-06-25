/*
|--------------------------------------------------------------------------
| Player Score Display
|--------------------------------------------------------------------------
*/

function PlayerCard({
  player,
  active
}) {
  return (
    <div
      className={`player-card ${
        active ? "active-player" : ""
      }`}
    >
      <h2>{player.name}</h2>

      <div className="score-display">
        {player.score}
      </div>
    </div>
  );
}

export default PlayerCard;