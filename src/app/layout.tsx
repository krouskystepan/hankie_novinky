import type { Metadata } from 'next'
import { Comic_Neue, Slackey } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Providers from '@/providers/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

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
  title: 'H-News',
  description: '',
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body
        className={`${comicNeue.variable} ${slackey.variable} flex min-h-dvh flex-col antialiased bg-custom-purple`}
      >
        <Providers>
          <Navbar session={session} />
          <main className="flex w-full flex-1 flex-col">{children}</main>
          <Footer session={session} />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
