import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './dto/schemas/surveys.schema';
import { SurveysService } from './surveys.service';

@Module({
  imports: [
    // Enregistre le modèle Mongoose "Survey" pour cette feature
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  providers: [SurveysService],
  exports: [SurveysService], // Permet à DashboardModule (et d'autres) d'injecter SurveysService
})
export class SurveysModule {}
