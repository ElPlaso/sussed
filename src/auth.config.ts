import type { NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export default {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        })
    ],
    callbacks: {
        authorized({ auth }) {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth?.user
        },
        session: async ({ session, token }) => {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            return session
        },
    },
} satisfies NextAuthConfig