// src/third-party-clients/third-party-clients.module.ts
import { Module } from '@nestjs/common';
import { ThirdPartyClientsService } from './thirdPartyClients.service';
import { ThirdPartyClientsController } from './thirdPartyClients.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ThirdPartyClientsController],
  providers: [ThirdPartyClientsService, PrismaService],
})
export class ThirdPartyClientsModule {}
