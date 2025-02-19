import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateThirdPartyClientDto {
  @ApiProperty({ example: 'My Third Party Service', description: 'Name of the third-party client' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'a1b2c3d4e5f6g7h8i9j0', description: 'Unique API key for the third-party client' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: true, description: 'Indicates if the third-party client is verified' })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({ example: 'This is a sample third-party client.', description: 'Optional description of the third-party client', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
