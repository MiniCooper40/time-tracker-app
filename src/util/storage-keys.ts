export const trackingKeyForTrackerId = (trackerId: string) =>
  `start-time=${trackerId}`;
export const trackerIdFromTrackingKey = (trackingKey: string) =>
  trackingKey.split("=").at(-1);
