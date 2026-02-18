import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Manrope, Cormorant_Garamond } from "next/font/google"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body
        className={`antialiased ${manrope.variable} ${cormorant.variable} text-stone-900`}
      >
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
