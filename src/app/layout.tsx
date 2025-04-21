import type { Metadata } from 'next'
import { Comic_Neue, Slackey } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Providers from '@/providers/Providers'

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-comic',
})

const slackey = Slackey({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-slackey',
})

export const metadata: Metadata = {
  title: 'AhoJ jA jsem HanKie',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${comicNeue.variable} ${slackey.variable} flex min-h-dvh flex-col antialiased bg-custom-purple`}
      >
        <Providers>
          <Navbar />
          <main className="flex w-full flex-1 flex-col">{children}</main>
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
