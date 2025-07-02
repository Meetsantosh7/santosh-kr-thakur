import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Santosh Thakur - Software Developer",
  description:
    "Passionate developer with experience in building scalable web applications using React, Core PHP, Laravel, and MySQL.",
  keywords: "Software developer, React JS, laravel, php, mysql, web development",
  authors: [{ name: "Santosh Thakur" }],
  openGraph: {
    title: "Santosh Thakur - Software Developer",
    description: "Passionate developer with experience in building scalable web applications",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
