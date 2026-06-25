/*
|--------------------------------------------------------------------------
| Displays the 3 darts thrown this turn.
|--------------------------------------------------------------------------
*/

function DartSlots({
  turn,
  activeDart
}) {
  return (
    <div className="card">

      {turn.map((dart, index) => (
        <div
          key={index}
          className={`dart-slot ${
            index === activeDart
              ? "dart-active"
              : ""
          }`}
        >
          Dart {index + 1}

          <strong>
            {dart.value
              ? `${dart.value} × ${dart.mult}`
              : "--"}
          </strong>
        </div>
      ))}
    </div>
  );
}

export default DartSlots;