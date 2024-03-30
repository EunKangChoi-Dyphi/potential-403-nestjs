import { IsOptional, IsString } from "class-validator";

export class SearchCityDto {
  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
