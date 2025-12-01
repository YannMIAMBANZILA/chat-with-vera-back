import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Survey, SurveyDocument } from './dto/schemas/surveys.schema';

@Injectable()
export class SurveysService {
  constructor(
    @InjectModel(Survey.name)
    private readonly surveyModel: Model<SurveyDocument>,
  ) {}

  /**
   * Récupère tous les sondages.
   * Utilisé par le dashboard (liste de sondages récents, compteurs, etc.).
   */
  async findAll(): Promise<Survey[]> {
    return this.surveyModel.find().exec();
  }

  // Plus tard : méthodes create/update/delete si besoin.
}
