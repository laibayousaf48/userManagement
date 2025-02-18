// // src/token-blacklist/token-blacklist.service.ts

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';  // Import Prisma service

// @Injectable()
// export class TokenBlacklistService {
//   constructor(private readonly prisma: PrismaService) {}

//   // Store the token in the blacklist table
//   async addToBlacklist(token: string, expiresAt: Date): Promise<void> {
//     await this.prisma.tokenBlacklist.create({
//       data: {
//         token,
//         expiresAt,
//       },
//     });
//   }

//   // Check if the token is in the blacklist
//   async isBlacklisted(token: string): Promise<boolean> {
//     const blacklistedToken = await this.prisma.tokenBlacklist.findUnique({
//       where: { token },
//     });
//     return !!blacklistedToken;
//   }
// }
