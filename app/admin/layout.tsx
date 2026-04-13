
// referrd and followed https://github.com/apollographql/apollo-client-nextjs for apollo provider for makig graphql queries and mutations

// import '../global.css'
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
import NavSideWrapper from "./components/NavSideWrapper/navSideWrapper";
import { Suspense } from "react";
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })
import { getServerSession } from "next-auth/next"
import {authOptions}  from '../api/auth/[...nextauth]/options'


export const metadata = {
  title: 'Ayur-Arogyam',
  description: 'Elvate health with Ayurveda',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
   let user;

   if (session?.user)
   {
    user=session.user

   }
  return (
    <html lang="en">
      <body className={inter.className}>

        <NavSideWrapper user={session?.user} />

        {/* <DefaultNavbar /> 
          <DefaultSidebar/> */}
        <main className="md:ml-64 h-auto pt-20">

          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>


        </main>
      </body>
    </html>
  )
}
