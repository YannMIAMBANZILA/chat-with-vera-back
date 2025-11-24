import { Controller, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { VeraService } from "./vera.service";
import { VeraQueryRequestDto } from "./dto/vera-query-request.dto";
import { VeraQueryResponseDto } from "./dto/vera-query-response.dto";

@Controller('vera')
export class VeraController {
    constructor(private readonly veraService: VeraService) {}

    @Post('query')
    async query(@Body() body: VeraQueryRequestDto): Promise<VeraQueryResponseDto> {
        try {
            return await this.veraService.handleQuery(body);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}