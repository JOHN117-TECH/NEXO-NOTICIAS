
import Link from "next/link";
import styles from "@/styles/components/NewsletterBanner.module.css";


export function NewsletterBanner() {
    return (
        <>
            <section
                className={styles.newsletter}
                aria-labelledby="newsletter-title"
            >
                <article className={styles.content}>

                    <h2 id="newsletter-title" className={styles.title}>
                        Las historias más importantes,
                        directo a tu correo.
                    </h2>

                    <p className={styles.description}>
                        Mantente informado sobre tecnología,
                        educación, turismo y actualidad.
                    </p>

                    <Link
                        href="/contacto"
                        className={styles.subscribeButton}
                    >
                        <span>Solicita tu suscripción</span>

                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </article>

                {/* Teléfono decorativo */}
                <section className={styles.visual} aria-hidden="true">
                    <article className={styles.phone}>
                        <div className={styles.notch} />

                        <div className={styles.phoneHeader}>
                            <span>NEXO</span>
                            <span>NOTICIAS</span>
                        </div>

                        <div className={styles.phoneContent}>
                            <div className={styles.phoneTitle} />

                            <div className={styles.phoneArticle}>
                                <div className={styles.articleImage} />

                                <div className={styles.articleText}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>

                            <div className={styles.phoneArticle}>
                                <div className={styles.articleImage} />

                                <div className={styles.articleText}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </section>
        </>
    );
}