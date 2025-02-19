import { Module } from '@nestjs/common';
import { ApiKeyLogsService } from './api-logs.service';
import { ApiKeyLogsController } from './api-logs.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ApiKeyLogsController],
  providers: [ApiKeyLogsService, PrismaService],
})
export class ApiKeyLogsModule {}
