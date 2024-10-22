export function formatDateTimeForPayload(date: Date = new Date()) {
  return {
    date: new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    time: new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  };
}
