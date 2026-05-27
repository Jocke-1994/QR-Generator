import { useQrGenerator } from './hooks/useQrGenerator';
import { QrForm } from './components/QrForm';
import { QrPreview } from './components/QrPreview';
import { DownloadButton } from './components/DownloadButton';
import { QrLog } from './components/QrLog';
import './App.css';

export default function App() {
  const {
    input, setInput,
    label, setLabel,
    labelPosition, setLabelPosition,
    qrValue, qrLabel,
    log, generate, clear,
  } = useQrGenerator();

  return (
    <div className="qr-root">
      <div className="qr-header">
        <h1 className="qr-title">qr-gen</h1>
        <p className="qr-subtitle">// QR code generator v0.1.0</p>
      </div>

      <hr className="qr-divider" />

      <QrForm
        input={input}
        setInput={setInput}
        label={label}
        setLabel={setLabel}
        labelPosition={labelPosition}
        setLabelPosition={setLabelPosition}
        onGenerate={generate}
      />

      <hr className="qr-divider" />

      <div className="qr-output">
        <QrPreview value={qrValue} label={qrLabel} labelPosition={labelPosition} />
        <div className="qr-meta">
          <QrLog entries={log} />
          <div className="qr-actions">
            <DownloadButton disabled={!qrValue} label={qrLabel} />
            <button className="qr-btn-ghost" onClick={clear} disabled={!qrValue}>
              ↺ rensa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
