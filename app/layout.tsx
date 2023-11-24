import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Patrick_Hand } from 'next/font/google';

// Inject a sttylish font
const font = Patrick_Hand({ weight: '400', subsets:['latin'] })

export const metadata: Metadata = {
  title: 'Cats and Dogs',
  description: 'Cat Facts and Dog Pics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
