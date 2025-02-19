import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('User Authentication API')
  .setDescription('API documentation for authentication and authorization')
  .setVersion('1.0')
  .addBearerAuth()
  .addApiKey(
    { type: 'apiKey', name: 'x-api-key', in: 'header' }, 
    'api-key-auth' // Security name
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);

app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = (data) => {
    // Check if the data contains BigInt, and convert it to string
    const stringifyBigInt = (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();  // Convert BigInt to string
      }
      return value;
    };
    res.setHeader('Content-Type', 'application/json');
    return originalJson.call(res, JSON.stringify(data, stringifyBigInt));  // Use custom replacer
  };
  next();
});

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
