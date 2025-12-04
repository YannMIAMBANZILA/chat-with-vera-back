import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

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
  app.enableCors({
    origin: [
      'https://chat-with-vera.vercel.app',
      
    ],
    methods: 'GET, POST, OPTIONS',
    credentials: true,
  }
    
  );

  // Préfixe global pour toutes les routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000; // important pour Render
  

  await app.listen(port, '0.0.0.0');

}
bootstrap();
