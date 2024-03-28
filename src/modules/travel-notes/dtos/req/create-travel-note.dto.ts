import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { LocalDate } from '@js-joda/core';
import { toLocalDate } from 'src/util/transform';
import { BadRequestException } from '@nestjs/common';

export class CreateTravelNoteDto {
  @IsNotEmpty({ message: '여행 시작일[startDate]은 필수 입력값입니다.' })
  @Transform(
    toLocalDate('여행 시작일의 날짜 형식이 올바르지 않습니다. [YYYY-MM-DD]'),
  )
  startDate: LocalDate;

  @IsNotEmpty({ message: '여행 종료일[endDate]은 필수 입력값입니다.' })
  @Transform(
    toLocalDate('여행 종료일의 날짜 형식이 올바르지 않습니다. [YYYY-MM-DD]'),
  )
  endDate: LocalDate;

  @IsNotEmpty({ message: '제목[title]은 문자열이어야 합니다.' })
  title: string;

  @IsNotEmpty({ message: '여행기[review]는 문자열이어야 합니다.' })
  @IsOptional()
  review: string;

  @IsNumber({}, { message: '도시 ID[cityId]는 숫자여야 합니다.' })
  cityId: number;

  validate() {
    if (this.startDate.isAfter(this.endDate)) {
      throw new BadRequestException(
        '여행 시작일은 여행 종료일보다 빨라야 합니다.',
      );
    }
  }
}
