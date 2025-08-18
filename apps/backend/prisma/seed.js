const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Headphones",
        description: "Nice sound",
        price: 79.99,
        category: "Electronics",
        inventory: 50,
      },
      {
        name: "Keyboard",
        description: "Mechanical",
        price: 99.99,
        category: "Electronics",
        inventory: 30,
      },
      {
        name: "Shoes",
        description: "Running",
        price: 59.99,
        category: "Sports",
        inventory: 70,
      },
    ],
  });
  console.log("Seeded products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
