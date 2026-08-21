export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  // Indian mobile numbers - 10 digits, optionally with +91
  return /^(\+91)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

// Operating hours are 6:00 AM - 6:00 PM
export const OPEN_HOUR = 6;
export const CLOSE_HOUR = 18;

export function isWithinOperatingHours(timeStr) {
  if (!timeStr) return false;
  const [hour] = timeStr.split(':').map(Number);
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

export function isDateTimeInFuture(dateStr, timeStr) {
  if (!dateStr || !timeStr) return false;
  const selected = new Date(`${dateStr}T${timeStr}`);
  return selected.getTime() > Date.now();
}

export function hoursUntil(dateStr, timeStr) {
  const rideTime = new Date(`${dateStr}T${timeStr}`);
  const diffMs = rideTime.getTime() - Date.now();
  return diffMs / (1000 * 60 * 60);
}

export function hasRideTimePassed(dateStr, timeStr) {
  const rideTime = new Date(`${dateStr}T${timeStr}`);
  return Date.now() >= rideTime.getTime();
}

export function statusBadgeClass(status) {
  switch (status) {
    case 'Pending Payment':
      return 'badge-pending';
    case 'Confirmed':
      return 'badge-confirmed';
    case 'Completed':
      return 'badge-completed';
    case 'Cancelled':
      return 'badge-cancelled';
    default:
      return 'badge-pending';
  }
}

export function todayDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split('T')[0];
}
