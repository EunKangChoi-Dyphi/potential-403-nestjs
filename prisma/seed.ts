// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import addCity from "./functions/add-city.seed";
import addCountry from "./functions/add-country.seed";

const prisma = new PrismaClient();

async function main() {
  await addCountry(prisma);
  await addCity(prisma);

  // await prisma.user.create({
  //   data: {
  //     email: 'trazzle@trazzle.com',
  //   },
  // });
  // 추가적인 데이터 삽입 작업을 여기에 작성할 수 있습니다.
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
