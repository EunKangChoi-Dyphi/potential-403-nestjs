import { ApiProperty } from "@nestjs/swagger";
import { TravelNote } from "@prisma/client";
import { CreateTravelNoteDto } from "src/modules/travel-notes/dtos/req/create-travel-note.dto";

export class TravelNoteEntity implements TravelNote {
  @ApiProperty({
    description: "여행기록 고유번호 PK",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "여행기록 시작날짜",
    example: "2024-03-31",
  })
  startDate: string;

  @ApiProperty({
    description: "여행기록 종료날짜",
    example: "2024-04-30",
  })
  endDate: string;

  @ApiProperty({
    description: "여행기록 제목",
    example: "후쿠오카에서의 하루!",
  })
  title: string;

  @ApiProperty({
    description: "여행기록 내용",
    example: "후쿠오카의 인생 첫 료칸!!!",
  })
  review: string;

  @ApiProperty({
    description: "도시 고유번호 PK",
    example: 1,
  })
  cityId: number;

  @ApiProperty({
    description: "도시명",
    example: "Fukuoka",
  })
  cityName: string;

  @ApiProperty({
    description: "작성자 고유번호 PK",
    example: 1,
  })
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  static of(userId: number, dto: CreateTravelNoteDto): TravelNote {
    const travelNote = new TravelNoteEntity();
    travelNote.userId = userId;
    travelNote.title = dto.title;
    travelNote.cityId = dto.cityId;
    travelNote.cityName = dto.cityName;
    travelNote.startDate = dto.startDate.toString();
    travelNote.endDate = dto.endDate.toString();
    travelNote.review = dto.review;
    return travelNote;
  }
}
