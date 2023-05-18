import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamhuree,
} from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamhuree = BaiJamhuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamhure',
})

export const metadata = {
  title: 'Spacetime App',
  description:
    'Uma cápsula do tempo construída com Next, Tailwind, TypeScript, Node e Fastify',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamhuree.variable} bg-gray-950 font-sans text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
