import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
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
      <body className={`${geistSans.variable} font-sans bg-white text-black antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
