// prisma/functions/add-city.seed.ts
import fs from "fs";
import path from "path";

const addCity = async (prisma) => {
  const file = fs.readFileSync(path.join(__dirname, "..", "data", "CountiesAndCity.json"), "utf-8");
  const countries = JSON.parse(file)
    .filter((c) => c.cities)
    .map((c) => {
      return { id: c.id, cities: c.cities, latitude: c.latitude, longitude: c.longitude };
    });

  for (const country of countries) {
    const { id, cities } = country;

    for (const city of cities) {
      await prisma.city.create({
        data: {
          countryCode: id,
          name: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
        },
      });
    }
  }
};

export default addCity;
