import { Travel } from '@prisma/client';

export class TravelEntity implements Travel {
  id: number;
  city: string;
  startDate: Date;
  endDate: Date;
  review: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}