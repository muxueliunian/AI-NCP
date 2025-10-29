import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES, UserRole } from '../../user/entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'User name', required: false })
  name?: string;

  @ApiProperty({ description: 'User role', enum: Object.values(USER_ROLES) })
  role: UserRole;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ description: 'User information', type: UserResponseDto })
  user: UserResponseDto;
}
