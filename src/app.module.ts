import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VerificationModule } from './verification/verification.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    VerificationModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes config available throughout the app
    }),


],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
