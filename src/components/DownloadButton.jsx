export function DownloadButton({ disabled, label }) {
  const download = () => {
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;

    if (!label) {
      const link = document.createElement('a');
      link.download = 'qr-kod.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      return;
    }

    // Draw canvas + label into a new canvas for download
    const padding = 12;
    const labelHeight = 28;
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const offscreen = document.createElement('canvas');
    offscreen.width = canvasW + padding * 2;
    offscreen.height = canvasH + padding * 2 + labelHeight;

    const ctx = offscreen.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, offscreen.width, offscreen.height);
    ctx.drawImage(canvas, padding, padding);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, offscreen.width / 2, canvasH + padding * 2 + 14);

    const link = document.createElement('a');
    const filename = label ? `${label.replace(/\s+/g, '-')}.png` : 'qr-kod.png';
    link.download = filename;
    link.href = offscreen.toDataURL('image/png');
    link.click();
  };

  return (
    <button className="qr-btn-ghost" onClick={download} disabled={disabled}>
      ↓ ladda ner PNG
    </button>
  );
}
