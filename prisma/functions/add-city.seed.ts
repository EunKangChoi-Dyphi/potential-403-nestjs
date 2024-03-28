const addCity = async (prisma) => {
  await prisma.city.createMany({
    
  });
};

export default addCity;
