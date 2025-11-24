import { Controller, Post, Body } from "@nestjs/common";
import { VeraService } from "./vera.service";
import { VeraQueryRequestDto } from "./dto/vera-query-request.dto";
import { VeraQueryResponseDto } from "./dto/vera-query-response.dto";

@Controller('vera') // définir le contrôleur pour Vera
export class VeraController {
    constructor(private readonly veraService: VeraService) {}

    @Post('query') // définir la route POST pour traiter une requête Vera
    async query(@Body() body: VeraQueryRequestDto): Promise<VeraQueryResponseDto> {
        return this.veraService.handleQuery(body);
    }
}