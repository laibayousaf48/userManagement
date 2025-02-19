// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { CreateApiKeyDto } from './dto/create-api-key.dto';
// import { randomBytes } from 'crypto'
// @Injectable()
// export class ThirdPartyClientsApiKeysService {
//   constructor(private prisma: PrismaService) {}
  
//   async create(clientId: number, dto: CreateApiKeyDto) {
//     const generatedKey = randomBytes(32).toString('hex');
//     return this.prisma.thirdPartyClientsApiKeys.create({
//       data: {
//         clientId: clientId,
//         key: generatedKey,
//         isActive: true,
//         createdBy: dto.createdBy,
//       },
//     });
//   }

//   async findAll(clientId: number) {
//     return this.prisma.thirdPartyClientsApiKeys.findMany({
//       where: { clientId: clientId },
//     });
//   }

//   async revoke(id: number) {
//     const key = await this.prisma.thirdPartyClientsApiKeys.findUnique({ where: { id } });
//     if (!key) throw new NotFoundException('API Key not found');

//     return this.prisma.thirdPartyClientsApiKeys.update({
//       where: { id },
//       data: { isActive: false, revokedAt: new Date() },
//     });
//   }

//   async activate(id: number) {
//     const key = await this.prisma.thirdPartyClientsApiKeys.findUnique({ where: { id } });
//     if (!key) throw new NotFoundException('API Key not found');

//     return this.prisma.thirdPartyClientsApiKeys.update({
//       where: { id },
//       data: { isActive: true, revokedAt: null },
//     });
//   }
// }
//////////////////////////////////
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
    
          // 🔹 Check if the Third-Party Client exists
          const client = await this.prisma.thirdPartyClients.findUnique({ where: { id: clientId } });
          if (!client) {
            throw new NotFoundException(`Third-Party Client with ID ${clientId} not found`);
          }
    
          // 🔹 Generate a secure 64-character API key
          const generatedKey = randomBytes(32).toString('hex');
    
          return await this.prisma.thirdPartyClientsApiKeys.create({
            data: {
              clientId,
              key: generatedKey,
              isActive: true,
              createdBy: dto.createdBy,
            },
          });
        } catch (error) {
          console.error('🔥 Error creating API key:', error?.message || error);
    
          // 🔹 Properly rethrow specific exceptions so they appear in API responses
          if (error instanceof NotFoundException) {
            throw error;
          } else if (error instanceof BadRequestException) {
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
  
    /**
     * ✅ Revoke an API key by setting `isActive` to false and adding `revokedAt`.
     * Handles errors when key does not exist.
     */
    async revoke(id: number) {
        try {
          if (!id) {
            throw new BadRequestException('API Key ID is required');
          }
    
          // 🔹 Find the API key
          const key = await this.prisma.thirdPartyClientsApiKeys.findUnique({ where: { id } });
          if (!key) {
            throw new NotFoundException(`API Key with ID ${id} not found`);
          }
    
          // 🔹 Check if the key is already revoked
          if (!key.isActive) {
            throw new BadRequestException(`API Key with ID ${id} is already revoked`);
          }
    
          // 🔹 Revoke the API key
          return await this.prisma.thirdPartyClientsApiKeys.update({
            where: { id },
            data: { isActive: false, revokedAt: new Date() },
          });
    
        } catch (error) {
          console.error('🔥 Error revoking API key:', error?.message || error);
    
          // 🔹 Ensure specific errors are rethrown correctly
          if (error instanceof NotFoundException) {
            throw error;
          } else if (error instanceof BadRequestException) {
            throw error;
          }
    
          // 🔹 Handle unexpected errors
          throw new InternalServerErrorException('Unexpected error occurred while revoking API key');
        }
      }
  
    /**
     * ✅ Reactivate a revoked API key by setting `isActive` to true.
     * Handles errors when key does not exist or is already active.
     */
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
  