import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration du filtre global d'exceptions
  app.useGlobalFilters(new AllExceptionsFilter());
  
  // Configuration de la validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retire les propriétés non décorées
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés non autorisées
      transform: true, // Transforme automatiquement les payloads en instances de DTO
      transformOptions: {
        enableImplicitConversion: true, // Convertit automatiquement les types primitifs
      },
    }),
  );

  // Configuration CORS (si nécessaire)
  app.enableCors();

  // Préfixe global pour toutes les routes
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
