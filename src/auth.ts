import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import prisma from './db'

import authConfig from './auth.config'

export const options = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig,
} satisfies NextAuthConfig

export const { handlers, auth } = NextAuth(options)