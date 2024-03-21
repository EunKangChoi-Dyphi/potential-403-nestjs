import { Profile } from '@prisma/client';
export class UserProfile implements Profile {
  id: number;
  userId: number;
}
