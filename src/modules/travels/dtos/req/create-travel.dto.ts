import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTravelDto {
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