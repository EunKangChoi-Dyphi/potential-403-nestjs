// prisma/functions/add-city.seed.ts

const addCity = async (prisma) => {
  const data = require('../../data/Cities.json');

  const cities = data.map((d) => {
    return prisma.city.create({
      data: {
        name: d.name,
        countryCode: d.country_code,
      },
    });
  });

  await Promise.all(cities);
};

export default addCity;
