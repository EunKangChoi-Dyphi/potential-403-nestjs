// prisma/functions/add-country.ts

const addCountry = async (prisma) => {
  // const countries = require('../../data/Countries.json');
  const countries = require('../../data/Countries2.json');
  await Promise.all(
    countries.map((it) => {
      return prisma.country.create({
        data: {
          name: it.name,
          // code: it.id,
          code: it.iso2,
        },
      });
    }),
  );
};

export default addCountry;
