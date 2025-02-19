import { Module } from '@nestjs/common';
import { ThirdPartyClientsApiKeysService } from './third-party-clients-api-keys.service';
import { ThirdPartyClientsApiKeysController } from './third-party-clients-api-keys.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ThirdPartyClientsApiKeysController],
  providers: [ThirdPartyClientsApiKeysService, PrismaService],
})
export class ThirdPartyClientsApiKeysModule {}
