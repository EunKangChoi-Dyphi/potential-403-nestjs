// prisma/functions/add-country.ts
import fs from "fs";
import path from "path";

const addCountry = async (prisma) => {
  const file = fs.readFileSync(path.join(__dirname, "..", "data", "CountiesAndCity.json"), "utf-8");
  const countries = JSON.parse(file).filter((c) => c.cities);

  const result = countries.map((c) => {
    return prisma.country.create({
      data: {
        code: c.id,
        name: c.name_y || c.name_x,
        continent: c.region,
      },
    });
  });

  await Promise.all(result);
};

export default addCountry;
