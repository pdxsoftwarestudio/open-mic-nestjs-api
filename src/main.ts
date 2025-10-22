import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define CORS options
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // Replace with the specific ports your frontend runs on
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow sending cookies and authentication headers
  };

  // Enable CORS with the defined options
  app.enableCors(corsOptions);

  await app.listen(8080);
}
bootstrap();
