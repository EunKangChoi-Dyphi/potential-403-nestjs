import { ApiProperty } from "@nestjs/swagger";

export class SocialLoginResponseDto {
  @ApiProperty({
    description: "Trazzle 서버 유저고유 PK",
    example: 2,
  })
  id: number;

  @ApiProperty({
    description: "Trazzle 서비스 유저 액세스토큰 (24h)",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFjY291bnQiOiJrLWNobGRtc3JrZCIsImlhdCI6MTcxMTc5MTU2MCwiZXhwIjoxNzExODc3OTYwfQ.qNeh3LJTjMsNitv8wU76EdqjRzScyQdZfWodm1SPcSM",
  })
  access_token: string;

  @ApiProperty({
    description: "유저이름",
    example: "서동성",
  })
  name: string;

  @ApiProperty({
    description: "소셜연동 유저 계정 고유값(k :카카오/ g: 구글 / a : 애플)",
    examples: ["k-12345", "g-12345", "a-12345"],
  })
  account: string;

  @ApiProperty({
    description: "프로필 이미지 URL",
  })
  profileImageURL: string | null;

  @ApiProperty({
    description: "유저 소개문구",
    example: "Let's Trazzle!",
  })
  intro: string | null;
}
