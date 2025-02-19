import { IsNotEmpty, IsIP, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateApiKeyLogDto {
  @IsNotEmpty()
  @IsNumber()
  keyId: number;

  @IsNotEmpty()
  @IsString()
  endpoint: string;

  @IsNotEmpty()
  @IsIP()
  ipAddress: string;

  @IsOptional()
  @IsNumber()
  createdBy?: number;
}
