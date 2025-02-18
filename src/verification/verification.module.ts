import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Import PrismaService
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';

@Module({
  providers: [PrismaService, VerificationService],
  controllers: [VerificationController],
})
export class VerificationModule {}
