import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Email',
          credentials: {
            username: { label: 'email', type: 'email', placeholder: 'jsmith@gmail.com' },
            password: { label: 'password', type: 'password', placeholder: '123456' },
          },
  
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          async authorize(credentials: any) {

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if(!existingUser){
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password)

                if(!isPasswordValid){
                    return null;
                }

                return {
                    id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                  }
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/signin',
    }
  };