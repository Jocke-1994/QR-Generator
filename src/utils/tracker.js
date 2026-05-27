export function trackEvent(projectId, payload) {
  const url = import.meta.env.VITE_TRACKER_URL;
  const key = import.meta.env.VITE_TRACKER_API_KEY;
  if (!url || !key) return;
  fetch(`${url}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key },
    body: JSON.stringify({ project_id: projectId, ...payload }),
  }).catch(() => {});
}
