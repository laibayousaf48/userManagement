// import { IsNotEmpty, IsNumber } from 'class-validator';

// export class CreateVerificationDto {
//   @IsNotEmpty()
//   @IsNumber()
//   entityId: number;

//   @IsNotEmpty()
//   @IsNumber()
//   createdBy: number; // The user who created the verification request
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsNumber, IsString } from 'class-validator';

export class CreateVerificationDto {
  @ApiProperty({ example: '1' })
  @IsUUID()
  @IsNotEmpty()
  @IsNumber()
  entityId: number;

  // @ApiProperty({ example: 'admin' })
  // @IsNotEmpty()
  // createdBy: number;
}

export class VerifyTokenDto {
    @ApiProperty({ example: 'd6f67a92b3d45a9f34a879cde334ac50' })
    @IsString()
    @IsNotEmpty()
    token: string;
  }