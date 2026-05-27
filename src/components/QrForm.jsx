export function QrForm({ input, setInput, label, setLabel, labelPosition, setLabelPosition, onGenerate }) {
  return (
    <div className="qr-form">
      <div className="qr-input-row">
        <span className="qr-label">&gt; input:</span>
        <input
          className="qr-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
          placeholder="https://din-url.se eller valfri text"
        />
        <button className="qr-btn" onClick={onGenerate}>RUN</button>
      </div>
      <div className="qr-input-row">
        <span className="qr-label">&gt; namn:</span>
        <input
          className="qr-input"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
          placeholder="valfri etikett (visas på QR-koden)"
        />
        <select
          className="qr-select"
          value={labelPosition}
          onChange={(e) => setLabelPosition(e.target.value)}
        >
          <option value="above">↑ ovan</option>
          <option value="below">↓ nedan</option>
        </select>
      </div>

    </div>
  );
}
