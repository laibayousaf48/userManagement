// src/third-party-clients/dto/update-third-party-client.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateThirdPartyClientDto {
  @ApiPropertyOptional({ description: 'The name of the third-party client' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'The API key associated with the client' })
  @IsString()
  @IsOptional()
  key?: string;

  @ApiPropertyOptional({ description: 'Verification status of the client', example: true })
  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @ApiPropertyOptional({ description: 'A brief description of the third-party client' })
  @IsString()
  @IsOptional()
  description?: string;
}

