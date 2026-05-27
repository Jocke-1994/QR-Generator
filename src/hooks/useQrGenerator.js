import { useState } from 'react';
import { trackEvent } from '../utils/tracker';

export function useQrGenerator() {
  const [input, setInput] = useState('');
  const [label, setLabel] = useState('');
  const [labelPosition, setLabelPosition] = useState('below');
  const [qrValue, setQrValue] = useState('');
  const [qrLabel, setQrLabel] = useState('');
  const [log, setLog] = useState([{ type: 'dim', text: '$ väntar på input...' }]);

  const generate = () => {
    if (!input.trim()) {
      setLog([{ type: 'error', text: '$ fel: ingen input angiven' }]);
      return;
    }
    const trimmed = input.trim();
    const ts = new Date().toLocaleTimeString('sv-SE');

    setQrValue(trimmed);
    setQrLabel(label.trim());

    trackEvent('qr-generator', {
      event_type: 'qr_created',
      data: {
        value: trimmed,
        label: label.trim() || null,
        created_at: new Date().toISOString(),
      },
    });

    setLog([
      { type: 'ok', text: '✓ QR-kod genererad' },
      { type: 'dim', text: `$ tecken: ${trimmed.length}` },
      { type: 'dim', text: `$ storlek: 200×200px` },
      { type: 'dim', text: `$ tidsstämpel: ${ts}` },
      ...(label.trim() ? [{ type: 'dim', text: `$ namn: ${label.trim()}` }] : []),
    ]);
  };

  const clear = () => {
    setInput('');
    setLabel('');
    setQrValue('');
    setQrLabel('');
    setLog([{ type: 'dim', text: '$ väntar på input...' }]);
  };

  return {
    input, setInput,
    label, setLabel,
    labelPosition, setLabelPosition,
    qrValue, qrLabel,
    log, generate, clear,
  };
}
