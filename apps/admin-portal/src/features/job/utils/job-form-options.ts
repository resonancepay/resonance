export const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hour24 = Math.floor(index / 2);
  const minute = index % 2 === 0 ? "00" : "30";
  const period = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const value = `${String(hour24).padStart(2, "0")}:${minute}`;
  const label = `${hour12}:${minute} ${period}`;
  return { label, value };
});

// API expects a plain UTC-hour offset, -12 to +12 inclusive (confirmed).
export const TIMEZONE_OPTIONS = Array.from({ length: 25 }, (_, index) => {
  const hourOffset = index - 12;
  const sign = hourOffset >= 0 ? "+" : "-";
  return { label: `UTC${sign}${Math.abs(hourOffset)}`, value: String(hourOffset) };
});

// getTimezoneOffset() is minutes, positive when local is *behind* UTC, so
// it's inverted here. Rounded/clamped since the browser's real offset can
// be fractional (e.g. UTC+5:30) but the API only accepts whole hours.
export const getUserUtcHourOffset = (): number => {
  const rawHours = -new Date().getTimezoneOffset() / 60;
  return Math.min(12, Math.max(-12, Math.round(rawHours)));
};

export const CHECKLIST_OPTIONS = [
  { id: "clean-lobby-glass", label: "Clean lobby glass" },
  { id: "vacuum-hallway-carpet", label: "Vacuum hallway carpet" },
  { id: "polish-lift-interior", label: "Polish lift interior" },
  { id: "dust-artificial-flowers", label: "Dust all artificial flowers" },
  {
    id: "clean-coffee-stain-reception-couch",
    label: "Clean coffee stain on reception couch",
  },
  { id: "clean-underneath-tables", label: "Clean underneath the tables" },
  { id: "clear-office-pantry", label: "Clear out the office pantry" },
  { id: "clean-kitchen-cabinets", label: "Clean kitchen cabinets" },
  { id: "dust-artworks", label: "Dust the artworks" },
  { id: "dust-chandeliers", label: "Dust the chandeliers" },
  { id: "polish-leather-chairs", label: "Polish the leather chairs" },
];
