import { PickType, PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../../entities/user.entity';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserRequestBodyDto extends PartialType(
  PickType(UserEntity, ['name', 'intro']),
) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  intro?: string;
}
