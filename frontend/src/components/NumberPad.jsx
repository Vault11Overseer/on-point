const NUMBERS = [
  ...Array(20)
]
.map((_, i) => i + 1)
.concat([25]);

function NumberPad({
  onSelect
}) {
  return (
    <div className="number-grid">

      {NUMBERS.map(number => (
        <button
          key={number}
          className="dart-button"
          onClick={() => onSelect(number)}
        >
          {number}
        </button>
      ))}

    </div>
  );
}

export default NumberPad;