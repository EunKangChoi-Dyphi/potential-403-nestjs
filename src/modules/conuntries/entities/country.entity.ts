import { Country } from '@prisma/client';

export class CountryEntity implements Country {
  id: number;
  name: string;
  continent: string;
  createdAt: Date;
  updatedAt: Date;
}
