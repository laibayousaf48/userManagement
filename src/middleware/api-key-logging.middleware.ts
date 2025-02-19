import { Injectable, NestMiddleware, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApiKeyLoggingMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.headers['x-api-key'] as string;
      if (!apiKey) throw new UnauthorizedException('API Key is required');

      const apiKeyRecord = await this.prisma.thirdPartyClientsApiKeys.findFirst({
        where: { key: apiKey }, 
      });

      if (!apiKeyRecord || !apiKeyRecord.isActive) {
        throw new UnauthorizedException('Invalid or revoked API Key');
      }
      const ipAddress = req.ip || req.socket.remoteAddress || '0.0.0.0';
      await this.prisma.thirdPartyClientsApiKeysLogs.create({
        data: {
          keyId: apiKeyRecord.id,
          endpoint: req.originalUrl,
          ipAddress: ipAddress,
          createdBy: null, // You can modify this based on user authentication
        },
      });

      next();
    } catch (error) {
      console.error('Logging Middleware Error:', error);
      throw new InternalServerErrorException('Error logging API key usage');
    }
  }
}
