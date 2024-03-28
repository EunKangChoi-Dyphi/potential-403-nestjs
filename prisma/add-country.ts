// prisma/add-country.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const countries = require('../data/Countries.json');
  await Promise.all(
    countries.map((it) => {
      return prisma.country.create({
        data: {
          name: it.name,
          code: it.id,
        },
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
