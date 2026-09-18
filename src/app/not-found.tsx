import { Catamaran, Montserrat } from "next/font/google";
import { NotFoundPage } from "@/components/NotFoundPage";

const digitsFont = Catamaran({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
  variable: "--font-error-digits",
});

const copyFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-error-copy",
});

export default function NotFound() {
  return (
    <NotFoundPage className={`${digitsFont.variable} ${copyFont.variable}`} />
  );
}
