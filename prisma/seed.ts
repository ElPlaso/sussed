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

  await prisma.project.create({
    data: {
      id: "project2",
      title: "Project 2",
      description: "Project with existing campaign",
      ownerId: "bob",
      campaigns: {
        create: {
          id: "project2Campaign1",
          title: "Project 2 Campaign",
          description: "Project 2 Campaign description",
        },
      },
    },
  });

  await prisma.project.create({
    data: {
      id: "project3",
      title: "Project 3",
      description: "Project with existing campaign and invitation",
      ownerId: "bob",
      campaigns: {
        create: {
          id: "project3Campaign1",
          title: "Project 3 Campaign",
          description: "Project 3 Campaign description",
          susInvitations: {
            create: {
              id: "project3Campaign1Invitation1",
            },
          },
        },
      },
    },
  });

  await prisma.project.create({
    data: {
      id: "project4",
      title: "Project 4",
      description: "Public project",
      isPublic: true,
      ownerId: "bob",
      campaigns: {
        create: {
          id: "project4Campaign1",
          title: "Project 4 Campaign",
          description: "A campaign within a public project",
        },
      },
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
