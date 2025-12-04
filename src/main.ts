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

  // Configuration CORS
  app.enableCors({
    origin: [
      'http://localhost:4200', // Développement Angular
      'https://chat-with-vera.vercel.app', // Production
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Préfixe global pour toutes les routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000; // important pour Render

  await app.listen(port, '0.0.0.0');
}

void bootstrap();
