export function QrLog({ entries, suggestion, onSuggestionClick }) {
  return (
    <div className="qr-log">
      {entries.map((entry, i) => (
        <div key={i} className={`log-${entry.type}`}>{entry.text}</div>
      ))}
      {suggestion && (
        <button className="log-suggestion" onClick={onSuggestionClick}>
          $ {suggestion.text} →
        </button>
      )}
    </div>
  );
}
