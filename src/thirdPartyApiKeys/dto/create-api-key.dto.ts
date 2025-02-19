import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateApiKeyDto {
//   @ApiProperty({ description: 'The API key value', example: 'secure-random-key' })
//   @IsString()
//   key: string;

  @ApiProperty({ description: 'The ID of the user who created the API key', example: 1 })
  @IsNumber()
  createdBy: number;
}
