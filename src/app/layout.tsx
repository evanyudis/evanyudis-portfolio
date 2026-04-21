import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { FloatingNav } from '@/components/FloatingNav'
import { inject } from '@vercel/analytics'
import './globals.css'

inject({ mode: process.env.NODE_ENV === 'production' ? 'production' : 'development' })

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Evan Yudistira — Senior Product Designer',
  description:
    'Senior product designer at Kredivo. I design scalable product experiences with a focus on design systems, thoughtful interaction, and high-quality execution.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${inter.variable} font-sans bg-white text-black antialiased`}>
        <Navigation />
        <FloatingNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
