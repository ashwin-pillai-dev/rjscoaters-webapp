
// referrd and followed https://github.com/apollographql/apollo-client-nextjs for apollo provider for makig graphql queries and mutations

import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
import 'sweetalert2/src/sweetalert2.scss'
import 'animate.css';





const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RJS coaters',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  )
}
