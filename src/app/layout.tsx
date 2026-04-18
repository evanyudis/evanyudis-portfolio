import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import './globals.css'

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
      <body className="bg-white text-black antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
