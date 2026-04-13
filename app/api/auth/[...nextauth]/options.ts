import { PrismaClient } from "@prisma/client"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '../../../../lib/prisma';



// const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'

  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const creds: any = credentials;

        // Create a URL object
        const url = new URL(creds.callbackUrl);

        // Get the value of the "callbackUrl" parameter
        const callbackUrl = url.searchParams.get("callbackUrl");
        console.log('callback url');
        console.log(callbackUrl);


        if (!credentials?.email || !credentials.password) {
          throw new Error('Email or password not provided')
        }
        console.log('credentials: ',credentials);

        const admin = await prisma.admin.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            role: true
          }
        })
        console.log('admin: ',admin);
        
        if (!admin) {
          throw new Error('Admin not found')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid Password')
        }

        console.log('admin found:');
        console.log({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role.roleName
        });


        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role.roleName
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
        accessToken: token
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const userRole: any = user
        token.role = userRole.role
      }
      return token
    }

  }
}


