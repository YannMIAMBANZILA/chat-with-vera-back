import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { Response, ResponseSchema } from './dto/schemas/responses.schema';

@Module({
  controllers: [ResponsesController], // enregistrer le contrôleur des réponses
  providers: [ResponsesService], // enregistrer le service des réponses
  imports: [
    MongooseModule.forFeature([
      {
        name: Response.name,
        schema: ResponseSchema,
      },
    ]), // enregistrer le schéma Mongoose pour les réponses
  ],
})
export class ResponsesModule {}
