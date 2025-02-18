import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes this module available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exports PrismaService to make it available outside this module
})
export class PrismaModule {}
