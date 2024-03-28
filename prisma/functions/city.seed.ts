const citySeed = async (prisma) => {
  await prisma.city.createMany({});
};

export default citySeed;
