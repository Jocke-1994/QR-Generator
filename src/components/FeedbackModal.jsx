import { useState } from 'react';

const ENDPOINT = 'https://formspree.io/f/xgoqpbor';

export function FeedbackModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const submit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim() || undefined, message: message.trim() }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fb-overlay" onClick={onClose}>
      <div className="fb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fb-header">
          <span className="qr-title">feedback</span>
          <button className="fb-close" onClick={onClose}>✕</button>
        </div>

        <hr className="qr-divider" />

        {status === 'ok' ? (
          <div className="fb-done">
            <span className="log-ok">✓ tack för din feedback!</span>
          </div>
        ) : (
          <form className="qr-form" onSubmit={submit}>
            <div className="qr-input-row">
              <span className="qr-label">&gt; e-post:</span>
              <input
                className="qr-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="valfritt"
              />
            </div>
            <div className="qr-input-row">
              <span className="qr-label">&gt; meddelande:</span>
              <textarea
                className="qr-input qr-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="vad tänker du?"
                rows={4}
                required
              />
            </div>
            {status === 'error' && (
              <span className="log-error">$ fel: kunde inte skicka, försök igen</span>
            )}
            <button className="qr-btn qr-btn-run" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'SKICKAR...' : 'SKICKA'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
