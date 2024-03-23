import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export const SignInUser = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user[data] || req.user;
  },
);
