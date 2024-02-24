export const convertToAmPm = (timeInMinutes) => {
  let hour = Math.floor(timeInMinutes / 60);
  let minute = timeInMinutes % 60;

  let period = hour < 12 ? "AM" : "PM";
  hour = hour % 12 || 12; // Convert hour 0 to 12

  return `${hour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
};
