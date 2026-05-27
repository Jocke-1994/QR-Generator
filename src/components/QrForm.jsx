export function QrForm({ input, setInput, label, setLabel, labelPosition, setLabelPosition, labelSize, setLabelSize, onGenerate }) {
  return (
    <div className="qr-form">
      <div className="qr-input-row">
        <span className="qr-label">&gt; input:</span>
        <div className="qr-input-wrap">
          <input
            className="qr-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
            placeholder="https://din-url.se eller valfri text"
          />
          {input.length > 0 && (
            <span className={`qr-char-count ${input.length >= 1273 ? 'qr-char-count--over' : input.length >= 500 ? 'qr-char-count--warn' : ''}`}>
              {input.length} / 1273
            </span>
          )}
        </div>
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
      {label && (
        <div className="qr-input-row">
          <span className="qr-label">&gt; text:</span>
          <input
            className="qr-input qr-input-range"
            type="range"
            min={8}
            max={32}
            value={labelSize}
            onChange={(e) => setLabelSize(Number(e.target.value))}
          />
          <span className="qr-range-value">{labelSize}px</span>
        </div>
      )}
      <button className="qr-btn qr-btn-run" onClick={onGenerate}>RUN</button>
    </div>
  );
}
