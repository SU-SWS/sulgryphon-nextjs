import {Source_Sans_3} from "next/font/google"
import localFont from "next/font/local"

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: false,
})
