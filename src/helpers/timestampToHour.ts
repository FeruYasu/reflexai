export function timestampToHour(timestamp: Date): string {
  const date = new Date(timestamp);

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
