// Format a Date or time string to 12-hour format with am/pm
export function formatTime12h(dateOrTime: Date | string): string {
  let date: Date;
  if (typeof dateOrTime === "string") {
    // If only time (e.g. '14:30'), use today as date
    if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(dateOrTime)) {
      const today = new Date();
      const [h, m, s] = dateOrTime.split(":").map(Number);
      date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        h,
        m,
        s || 0,
      );
    } else {
      date = new Date(dateOrTime);
    }
  } else {
    date = dateOrTime;
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${ampm} ${hours}:${minutesStr}`;
}
