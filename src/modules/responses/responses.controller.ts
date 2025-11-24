import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { ResponsesService } from './responses.service';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  async create(@Body() createResponseDto: CreateResponseDto) {
    try {
      return await this.responsesService.create(createResponseDto);
    } catch (error: unknown) {
      const status =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException('Failed to create response', status);
    }
  }
}
