import type { Metadata } from 'next'
import { Inter, Special_Elite, Noto_Sans } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'
import WalletProviderWrapper from '../components/WalletProviderWrapper'

const inter = Inter({ subsets: ['latin'] })
const specialElite = Special_Elite({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-special-elite'
})
const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  variable: '--font-noto-sans'
})

export const metadata: Metadata = {
  title: 'Anonymous Harassment Reports',
  description: 'A safe space to report and share harassment experiences anonymously',
  keywords: ['harassment', 'reporting', 'anonymous', 'safety', 'community'],
  authors: [{ name: 'Anonymous Reports Team' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${specialElite.variable} ${notoSans.variable}`}>
        <WalletProviderWrapper>
          <QueryProvider>
            <div className="min-h-screen bg-gray-50">
              {children}
            </div>
          </QueryProvider>
        </WalletProviderWrapper>
      </body>
    </html>
  )
}