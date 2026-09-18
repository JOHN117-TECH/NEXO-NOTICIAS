"use client";

import { useI18n } from "@/hooks";
import { events } from "@/lib/events";
import styles from "@/styles/components/EventsSection.module.css";
import typographyStyles from "@/styles/components/ui/Typography.module.css";

export function EventsSection() {
  const { t, locale } = useI18n();
  const language = locale === "en" ? "en-US" : "es-CO";
  const timeZone = "America/Bogota";
  const month = new Intl.DateTimeFormat(language, { month: "short", timeZone });
  const day = new Intl.DateTimeFormat(language, { day: "numeric", timeZone });
  const fullDate = new Intl.DateTimeFormat(language, {
    dateStyle: "long",
    timeZone,
  });
  const time = new Intl.DateTimeFormat(language, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });

  return (
    <section className={styles.section} aria-labelledby="events-title">
      <header className={styles.header}>
        <h2 id="events-title" className={typographyStyles.sectionTitle}>
          {t("Próximos eventos")}
        </h2>
        <p>
          {t(
            "Espacios para aprender, descubrir y conectar con nuestra comunidad.",
          )}
        </p>
        <p className={styles.note}>
          {t("Agenda de ejemplo · 2026 · Hora de Colombia (UTC−5)")}
        </p>
      </header>
      <ul className={styles.grid}>
        {events.map((event) => {
          const start = new Date(`${event.date}T${event.start}:00-05:00`);
          const end = new Date(`${event.date}T${event.end}:00-05:00`);
          return (
            <li key={event.id} className={styles.card}>
              <time
                className={styles.date}
                dateTime={event.date}
                aria-label={fullDate.format(start)}
              >
                <span className={styles.month}>
                  {month.format(start).replace(/\.$/, "")}
                </span>
                <span className={styles.day}>{day.format(start)}</span>
              </time>
              <div className={styles.details}>
                <p className={typographyStyles.category}>{t(event.category)}</p>
                <h3>{t(event.title)}</h3>
                <p className={styles.hours}>
                  {time.format(start)} – {time.format(end)}
                </p>
                <p className={styles.location}>{t(event.location)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
