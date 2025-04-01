# Sussed

Suss out your app's usability!

<image src="https://github.com/user-attachments/assets/2949b860-2934-4f16-890a-c01c5a253b8d" height=150 width=150 />

## Installation

Install the dependencies:

```sh
npm install
```

## Development

### Environment variables

You will need to set some environment variables before running the app. Start by creating a `.env` file in the root of the project. You can do this by copying the existing `.env.example` file:

```sh
cp .env.example .env
```

You will also need a .env.local file for things like [NextAuth](https://authjs.dev/).

```sh
cp .env.local.example .env.local
```

### Running the app

First, run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Prisma

To push the prisma schema to the database:

```sh
npx prisma db push
```

To seed the database with test data:

```sh
npx prisma db seed
```

To open prisma studio to view the database with a UI:

```sh
npx prisma studio
```

To migrate the database:

```sh
npx prisma migrate dev
```

[How to squash migrations](https://www.prisma.io/docs/orm/prisma-migrate/workflows/squashing-migrations#how-to-migrate-cleanly-from-a-development-environment)

Learn more about Prisma [here](https://www.prisma.io/)

### Testing

#### E2E

This project uses Cypress for end to end testing.

To open Cypress:

```sh
npm run cy:open
```

Learn more about Cypress [here](https://docs.cypress.io/guides/overview/why-cypress)

When running e2e tests in the Github CI, you'll need to add the `AUTH_SECRET` environment variable to your repository's secrets.

#### Unit Testing

This project uses Vitest for unit testing.

To run unit tests:

```sh
npm run test
```

Learn more about Vitest [here](https://vitest.dev/guide/)

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out Vercel's [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
