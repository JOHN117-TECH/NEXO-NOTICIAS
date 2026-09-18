import type { Locale } from "./i18n";

const months = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

// Event values are already Colombia wall-clock dates/times. Avoid environment-
// dependent Intl/ICU text (including non-breaking spaces) during hydration.
export function formatEventDate(date: string, locale: Locale) {
  const [year, month, day] = date.split("-").map(Number);
  const name = months[locale][month - 1];
  return {
    day: String(day),
    month: name.slice(0, locale === "es" && month === 9 ? 4 : 3),
    fullDate: locale === "es" ? `${day} de ${name} de ${year}` : `${name} ${day}, ${year}`,
  };
}

export function formatEventTime(time: string, locale: Locale) {
  const [hour, minute] = time.split(":").map(Number);
  const period = locale === "es"
    ? (hour < 12 ? "a. m." : "p. m.")
    : (hour < 12 ? "AM" : "PM");
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${period}`;
}
