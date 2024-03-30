import { TravelImage } from '@prisma/client';

export class TravelImageEntity implements TravelImage {
  key: string;
  id: number;
  sequence: number;
  isMain: boolean;
  url: string;
  createdAt: Date;
  travelNoteId: number;

  static of(
    sequence: number,
    url: string,
    isMain: boolean,
    travelNoteId: number,
  ): TravelImageEntity {
    const travelImage = new TravelImageEntity();
    travelImage.sequence = sequence;
    travelImage.url = url;
    travelImage.isMain = isMain;
    travelImage.travelNoteId = travelNoteId;
    return travelImage;
  }
}
