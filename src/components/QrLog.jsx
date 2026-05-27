export function QrLog({ entries }) {
  return (
    <div className="qr-log">
      {entries.map((entry, i) => (
        <div key={i} className={`log-${entry.type}`}>{entry.text}</div>
      ))}
    </div>
  );
}
