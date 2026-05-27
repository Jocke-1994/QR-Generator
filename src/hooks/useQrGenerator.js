import { useState } from 'react';
import { trackEvent } from '../utils/tracker';

export function useQrGenerator() {
  const [input, setInput] = useState('');
  const [label, setLabel] = useState('');
  const [labelPosition, setLabelPosition] = useState('below');
  const [labelSize, setLabelSize] = useState(12);
  const [qrValue, setQrValue] = useState('');
  const [qrLabel, setQrLabel] = useState('');
  const [log, setLog] = useState([{ type: 'dim', text: '$ väntar på input...' }]);
  const [suggestion, setSuggestion] = useState(null);

  const validate = (value) => {
    if (/^(javascript:|data:)/i.test(value)) {
      return { error: 'fel: javascript: och data: är inte tillåtna' };
    }
    if (value.length > 1273) {
      return { error: `fel: för lång text (${value.length}/1273 tecken)` };
    }
    if (/^https?:\/\//i.test(value)) {
      try { new URL(value); } catch {
        return { warning: 'varning: ser ut som en URL men verkar felformaterad' };
      }
    } else if (/^(www\.)?[\w-]+(\.[\w]{2,6})+(\/\S*)?$/i.test(value)) {
      return { suggestion: `https://${value}` };
    }
    return {};
  };

  const generate = () => {
    if (!input.trim()) {
      setLog([{ type: 'error', text: '$ fel: ingen input angiven' }]);
      return;
    }
    const trimmed = input.trim();
    const { error, warning, suggestion: suggestedValue } = validate(trimmed);

    if (error) {
      setLog([{ type: 'error', text: `$ ${error}` }]);
      setSuggestion(null);
      return;
    }

    setSuggestion(suggestedValue ? { text: `menade du ${suggestedValue}?`, value: suggestedValue } : null);

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
      ...(warning ? [{ type: 'error', text: `$ ${warning}` }] : []),
      ...(trimmed.length >= 500 ? [{ type: 'warn', text: `$ varning: lång text — kan vara svår att skanna` }] : []),
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
    setSuggestion(null);
  };

  return {
    input, setInput,
    label, setLabel,
    labelPosition, setLabelPosition,
    labelSize, setLabelSize,
    qrValue, qrLabel,
    log, suggestion,
    generate, clear,
  };
}
