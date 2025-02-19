import { 
    Injectable, 
    NotFoundException, 
    BadRequestException, 
    InternalServerErrorException 
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { CreateApiKeyDto } from './dto/create-api-key.dto';
  import { randomBytes } from 'crypto';
  
  @Injectable()
  export class ThirdPartyClientsApiKeysService {
    constructor(private prisma: PrismaService) {}
    async create(clientId: number, dto: CreateApiKeyDto) {
        try {
          if (!clientId) {
            throw new BadRequestException('Client ID is required');
          }
    
          // Check if client exists
          const client = await this.prisma.thirdPartyClients.findUnique({ where: { id: clientId } });
          if (!client) {
            throw new NotFoundException(`Third-Party Client with ID ${clientId} not found`);
          }
    
          // Generate API key
          const generatedKey = randomBytes(32).toString('hex');
    
          // ✅ First, create the API key and store it in a variable
          const createdApiKey = await this.prisma.thirdPartyClientsApiKeys.create({
            data: {
              clientId,
              key: generatedKey,
              isActive: true,
              createdBy: dto.createdBy,
            },
          });
    
          // ✅ Now, use the created API key's ID to insert a log
          await this.prisma.thirdPartyClientsApiKeysLogs.create({
            data: {
              keyId: createdApiKey.id, // 🔥 Use the actual database ID of the created key
              endpoint: 'API Key Created',
              ipAddress: 'SYSTEM', // Since this is backend-generated
              createdBy: dto.createdBy ?? null, // Set createdBy if available
            },
          });
    
          return createdApiKey; // Return the created API key details
        } catch (error) {
          console.error('Error creating API key:', error?.message || error);
    
          if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
          }
    
          throw new InternalServerErrorException('Unexpected error occurred while generating API key');
        }
      }

    async findAll(clientId: number) {
      try {
        if (!clientId) throw new BadRequestException('Client ID is required');
  
        const keys = await this.prisma.thirdPartyClientsApiKeys.findMany({
          where: { clientId },
        });
  
        if (!keys.length) {
          throw new NotFoundException('No API keys found for this client');
        }
  
        return keys;
      } catch (error) {
        throw new InternalServerErrorException('Error retrieving API keys');
      }
    }

    async revoke(id: number) {
        try {
          if (!id) {
            throw new BadRequestException('API Key ID is required');
          }

          const key = await this.prisma.thirdPartyClientsApiKeys.findUnique({ where: { id } });
          if (!key) {
            throw new NotFoundException(`API Key with ID ${id} not found`);
          }

          if (!key.isActive) {
            throw new BadRequestException(`API Key with ID ${id} is already revoked`);
          }

          return await this.prisma.thirdPartyClientsApiKeys.update({
            where: { id },
            data: { isActive: false, revokedAt: new Date() },
          });
    
        } catch (error) {
          console.error('Error revoking API key:', error?.message || error);

          if (error instanceof NotFoundException) {
            throw error;
          } else if (error instanceof BadRequestException) {
            throw error;
          }

          throw new InternalServerErrorException('Unexpected error occurred while revoking API key');
        }
      }

    async activate(id: number) {
      try {
        if (!id) throw new BadRequestException('API Key ID is required');
  
        const key = await this.prisma.thirdPartyClientsApiKeys.findUnique({ where: { id } });
        if (!key) throw new NotFoundException('API Key not found');
  
        if (key.isActive) throw new BadRequestException('API Key is already active');
  
        return await this.prisma.thirdPartyClientsApiKeys.update({
          where: { id },
          data: { isActive: true, revokedAt: null },
        });
      } catch (error) {
        throw new InternalServerErrorException('Error activating API key');
      }
    }
  }
  