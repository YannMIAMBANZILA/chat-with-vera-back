import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Response, ResponseDocument } from "./dto/schemas/responses.schema";
import { CreateResponseDto } from "./dto/create-response.dto";

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private responseModel: Model<ResponseDocument>,
  ) {}

  // Méthode pour créer une nouvelle réponse
  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const createdResponse = new this.responseModel(createResponseDto);
    return createdResponse.save();
  }
}