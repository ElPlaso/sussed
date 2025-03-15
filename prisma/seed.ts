import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "bob",
      name: "Bob",
      email: "bob@prisma.io",
    },
  });

  await prisma.project.create({
    data: {
      id: "project1",
      title: "Project 1",
      description: "Project 1 description",
      ownerId: "bob",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
