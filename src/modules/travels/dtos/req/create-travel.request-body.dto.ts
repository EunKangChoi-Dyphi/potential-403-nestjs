import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTravelRequestBodyDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsString()
  review: string;

  @IsNumber()
  userId: number;
}