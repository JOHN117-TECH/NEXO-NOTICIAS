import layoutStyles from "@/app/layout.module.css";
import type { Metadata } from "next";
import Script from "next/script";
import { siteIcon } from "@/assets/images";
import "./globals.css";
import { Providers, Header, LanguageProvider, SkipLink, Footer } from "@/components";

import { themeInitializationScript } from "@/lib";

export const metadata: Metadata = {
  icons: {
    icon: {
      url: siteIcon.src,
      type: "image/png",
      sizes: `${siteIcon.width}x${siteIcon.height}`,
    },
  },
  title: { default: "Nexo Noticias", template: "%s | Nexo Noticias" },
  description:
    "Información que te conecta con el mundo. Noticias de tecnología, educación, turismo y actualidad.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initialization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body>
        <LanguageProvider>
          <SkipLink />
          <Providers>
            <div className={layoutStyles.siteShell}>
              <Header />
              <section className="sm:mt-20">
                {children}
              </section>
              <Footer />
            </div>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
