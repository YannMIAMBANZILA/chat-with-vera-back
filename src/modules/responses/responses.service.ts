import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response, ResponseDocument } from './dto/schemas/responses.schema';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private responseModel: Model<ResponseDocument>,
  ) {}

  // Méthode pour créer une nouvelle réponse
  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    try {
      // Validation des données
      if (!createResponseDto.userId || !createResponseDto.surveyId) {
        throw new BadRequestException('userId and surveyId are required');
      }

      if (
        !createResponseDto.answers ||
        createResponseDto.answers.length === 0
      ) {
        throw new BadRequestException('At least one answer is required');
      }

      const createdResponse = new this.responseModel(createResponseDto);
      return await createdResponse.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to save response');
    }
  }
  
  // 🔹 Récupérer toutes les réponses (pour le dashboard, stats, etc.)
  async findAll(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }

}