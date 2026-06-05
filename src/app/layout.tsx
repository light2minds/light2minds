import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/shop/CartDrawer'
import { Providers } from '@/components/Providers'
import { CartProvider } from '@/context/CartContext'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Light2Minds — Behavioral & Neurodevelopmental Guidance',
    template: '%s — Light2Minds',
  },
  description:
    'Light2Minds supports Florida families navigating neurodevelopmental diagnoses and prepares ABA professionals for rewarding careers in behavioral health.',
  metadataBase: new URL('https://www.light2minds.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${instrumentSerif.variable}`}>
      <body className="bg-stone-50 text-navy-900 font-sans antialiased">
        <Providers>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            {children}
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
