import { Controller, Post, Body } from "@nestjs/common";
import { CreateResponseDto } from "./dto/create-response.dto";
import { ResponsesService } from "./responses.service";

@Controller('responses') // définir le contrôleur pour les réponses
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post() // définir la route POST pour créer une nouvelle réponse
  async create(@Body() createResponseDto: CreateResponseDto) {
    return await this.responsesService.create(createResponseDto);
  }
}

