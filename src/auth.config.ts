import type { NextAuthConfig } from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const providers: Provider[] = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
    allowDangerousEmailAccountLinking: true, // Resolves "To confirm your identity, sign in with the same account you used originally" error when signing in with GitHub
  }),
];

if (process.env.NEXT_ENV === "test") {
  providers.push(
    Credentials({
      id: "password",
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        if (credentials.password === "password") {
          // This Bob should be seeded in the database
          return {
            id: "bob",
            email: "bob@prisma.io",
            name: "Bob",
          };
        }
        return null;
      },
    })
  );
}

export default {
  providers,
  callbacks: {
    authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth?.user;
    },
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages:
    process.env.NEXT_ENV === "test"
      ? undefined
      : {
          signIn: "/auth/signin",
        },
} satisfies NextAuthConfig;
