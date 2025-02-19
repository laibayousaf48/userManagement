// import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { ConfigModule } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { VerificationModule } from './verification/verification.module';
// import { ThirdPartyClientsModule } from './thirdPartyCients/thirdPartyClients.module';
// import { ThirdPartyClientsApiKeysModule } from './thirdPartyApiKeys/third-party-clients-api-keys.module';
// import { ApiKeyLogsModule } from './apiLogs/api-logs.module';
// import { ApiKeyLoggingMiddleware } from './middleware/api-key-logging.middleware';

// @Module({
//   imports: [
//     AuthModule,
//     UsersModule,
//     VerificationModule,
//     ThirdPartyClientsModule,
//     ThirdPartyClientsApiKeysModule,
//     ApiKeyLogsModule,
//     ConfigModule.forRoot({
//       isGlobal: true, // Makes config available throughout the app
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ApiKeyLoggingMiddleware).forRoutes('*'); // Apply middleware globally
//   }
// }
//////////////
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VerificationModule } from './verification/verification.module';
import { ThirdPartyClientsModule } from './thirdPartyCients/thirdPartyClients.module';
import { ThirdPartyClientsApiKeysModule } from './thirdPartyApiKeys/third-party-clients-api-keys.module';
import { ApiKeyLogsModule } from './apiLogs/api-logs.module';
import { ApiKeyLoggingMiddleware } from './middleware/api-key-logging.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    VerificationModule,
    ThirdPartyClientsModule,
    ThirdPartyClientsApiKeysModule,
    ApiKeyLogsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available globally
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(ApiKeyLoggingMiddleware)
//       .forRoutes('third-party-api-keys'); // Apply only to third-party routes
//   }
// }
