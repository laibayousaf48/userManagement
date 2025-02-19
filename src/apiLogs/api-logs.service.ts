import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApiKeyLogDto } from './dto/create-api-key-log.dto';

@Injectable()
export class ApiKeyLogsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateApiKeyLogDto) {
    try {
      return await this.prisma.thirdPartyClientsApiKeysLogs.create({
        data: {
          keyId: dto.keyId,
          endpoint: dto.endpoint,
          ipAddress: dto.ipAddress,
          createdBy: dto.createdBy,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating API Key log');
    }
  }

  async findAll() {
    try {
      return await this.prisma.thirdPartyClientsApiKeysLogs.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching API Key logs');
    }
  }

  async findOne(id: number) {
    try {
      const log = await this.prisma.thirdPartyClientsApiKeysLogs.findUnique({ where: { id } });
      if (!log) throw new NotFoundException(`API Key Log with ID ${id} not found`);
      return log;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching API Key log');
    }
  }
}
