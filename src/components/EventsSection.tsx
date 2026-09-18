"use client";

import { useI18n } from "@/hooks";
import { events } from "@/lib/events";
import { formatEventDate, formatEventTime } from "@/lib/eventFormatting";
import styles from "@/styles/components/EventsSection.module.css";
import typographyStyles from "@/styles/components/ui/Typography.module.css";

export function EventsSection() {
  const { t, locale } = useI18n();

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
          const date = formatEventDate(event.date, locale);
          return (
            <li key={event.id} className={styles.card}>
              <time
                className={styles.date}
                dateTime={event.date}
                aria-label={date.fullDate}
              >
                <span className={styles.month}>
                  {date.month}
                </span>
                <span className={styles.day}>{date.day}</span>
              </time>
              <div className={styles.details}>
                <p className={typographyStyles.category}>{t(event.category)}</p>
                <h3>{t(event.title)}</h3>
                <p className={styles.hours}>
                  {formatEventTime(event.start, locale)} – {formatEventTime(event.end, locale)}
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
