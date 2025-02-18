import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name?: string |null;

  @ApiProperty({ example: false })
  isVerified: boolean;

  @ApiProperty({ example: '2025-02-18T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: 'User registered successfully', required: false })
  message?: string;
}
