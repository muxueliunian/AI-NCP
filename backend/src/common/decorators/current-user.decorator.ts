import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../modules/user/entities/user.entity';

/**
 * Custom decorator to get current authenticated user from request
 * Usage: @CurrentUser() user: User
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
