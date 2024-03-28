import { City } from '@prisma/client';
export class CityEntity implements City {
  id: number;
  name: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}
