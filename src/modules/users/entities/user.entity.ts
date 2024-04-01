import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
export class UserEntity implements User {
  @ApiProperty({
    description: "유저 PK",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "유저이름",
    example: "최은강",
  })
  name: string;

  @ApiProperty({
    description: "유저계정",
    examples: {
      kakao: "k-{kakao-id}",
      google: "g-{google-id}",
      apple: "a-{apple-id}",
    },
  })
  account: string;

  @ApiProperty({
    description: "유저 소개글",
    example: "Trazzle로 세계정복!",
  })
  intro: string | null;

  @ApiProperty({
    description: "유저 프로필 이미지",
  })
  profileImageURL: string | null;
}
