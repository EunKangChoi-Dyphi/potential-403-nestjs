import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from '../../entities/user.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  account: string;

  @IsOptional()
  @IsString()
  intro: string;

  @IsOptional()
  @IsString()
  profileImageURL: string;
}
