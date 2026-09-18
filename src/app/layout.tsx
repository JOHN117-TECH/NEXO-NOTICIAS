import layoutStyles from "@/app/layout.module.css";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SkipLink } from "@/components/SkipLink";
import Footer from "@/components/Footer";
import { themeInitializationScript } from "@/lib/theme";

export const metadata: Metadata = {
  title: { default: "Nexo Noticias 📰", template: "%s | Nexo Noticias 📰" },
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
        <script
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
