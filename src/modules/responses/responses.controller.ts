import { Controller, Post, Body } from "@nestjs/common";
import { CreateResponseDto } from "./dto/create-response.dto";

// Minimal local implementation to satisfy the import until a proper service file/provider is added
class ResponsesService {
  async create(createResponseDto: CreateResponseDto) {
    // placeholder implementation - replace with actual service logic or provide a proper provider
    return createResponseDto;
  }
}

@Controller('responses') // définir le contrôleur pour les réponses

export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}


@Post() // définir la route POST pour créer une nouvelle réponse
async create(@Body() createResponseDto: CreateResponseDto) {
    return await this.responsesService.create(createResponseDto);
  }
}