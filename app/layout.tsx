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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    other: [
      { url: '/android-chrome-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/android-chrome-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Santosh Thakur - Software Developer",
    description: "Passionate developer with experience in building scalable web applications",
    type: "website",
    images: [
      {
        url: '/favicon-32x32.svg',
        width: 32,
        height: 32,
        alt: 'Santosh Thakur - Software Developer',
      },
    ],
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
