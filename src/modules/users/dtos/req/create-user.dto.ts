import { OmitType } from '@nestjs/mapped-types';
import { UserEntity } from '../../entities/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
