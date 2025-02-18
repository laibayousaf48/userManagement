import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module'; // ✅ Import PrismaModule

@Module({
  imports: [PrismaModule], // ✅ Ensure PrismaModule is imported
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
