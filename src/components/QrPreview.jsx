import { QRCodeCanvas } from 'qrcode.react';

export function QrPreview({ value, label, labelPosition, labelSize }) {
  if (!value) {
    return (
      <div className="qr-canvas-empty">
        <span>ingen QR-kod<br />genererad ännu</span>
      </div>
    );
  }

  return (
    <div className="qr-canvas-outer">
      {label && labelPosition === 'above' && (
        <div className="qr-code-label" style={{ fontSize: labelSize }}>{label}</div>
      )}
      <div className="qr-canvas-wrap">
        <QRCodeCanvas
          id="qr-canvas"
          value={value}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>
      {label && labelPosition === 'below' && (
        <div className="qr-code-label" style={{ fontSize: labelSize }}>{label}</div>
      )}
    </div>
  );
}
