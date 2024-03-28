import fs from 'fs';
const addCity = async (prisma) => {
  const jsonFile = fs.readFileSync('../../data/cities.data.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  const cities = jsonData.forEach((city) => {
    return {
      name: city.name, // 도시명
      countryCode: city.country_code, // 국가코드
    };
  });
  // 데이터베이스에 적재한다.
  await prisma.city.createMany({
    data: cities,
  });
};

export default addCity;
