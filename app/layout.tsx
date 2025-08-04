import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Casa Blanca Trelleborg - Restaurang & Pizzeria',
  description: 'Upplev fantastisk mat, mysig atmosfär och vänlig service på Casa Blanca i Trelleborg. Vi erbjuder à la carte, gourmet pizza och lunchbuffé.',
  keywords: 'restaurang, pizza, trelleborg, casa blanca, mat, middag, lunch, buffé, italiensk, svensk',
  authors: [{ name: 'Casa Blanca Trelleborg' }],
  openGraph: {
    title: 'Casa Blanca Trelleborg - Restaurang & Pizzeria',
    description: 'Upplev fantastisk mat, mysig atmosfär och vänlig service på Casa Blanca i Trelleborg.',
    type: 'website',
    locale: 'sv_SE',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="cursor-default">{children}</body>
    </html>
  )
}
