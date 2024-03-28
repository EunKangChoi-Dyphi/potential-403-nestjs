import { TravelNote } from '@prisma/client';

export class TravelNoteEntity implements TravelNote {
    id: number;
    startDate: string;
    endDate: string;
    title: string;
    review: string;
    createdAt: Date;
    updatedAt: Date;
    city: string;
    userId: number;
}