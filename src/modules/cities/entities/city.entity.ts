import { ApiProperty } from "@nestjs/swagger";
import { City } from "@prisma/client";
export class CityEntity implements City {
  @ApiProperty({
    description: "도시 PK",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "도시명",
    example: "Seoul",
  })
  name: string;

  @ApiProperty({
    description: "국가코드",
    example: "KR",
  })
  countryCode: string;

  latitude: string | null;
  longitude: string | null;
  createdAt: Date;
  updatedAt: Date;
}
