function TurnHistory({ history }) {
  return (
    <div className="card">

      <h3>Turn History</h3>

      {history.slice().reverse().map((h, i) => (
        <div key={i} className="history-row">

          <strong>{h.player}</strong>

          <div>
            {h.score} pts
          </div>

        </div>
      ))}

    </div>
  );
}

export default TurnHistory;