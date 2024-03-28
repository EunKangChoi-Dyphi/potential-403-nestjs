import { Country } from '@prisma/client';

export class CountryEntity implements Country {
  id: number;
  code: string;
  name: string;
  continent: string;
  createdAt: Date;
  updatedAt: Date;
}
