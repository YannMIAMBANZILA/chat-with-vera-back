import { Injectable, BadRequestException } from "@nestjs/common";
import { VeraQueryRequestDto } from "./dto/vera-query-request.dto";
import { VeraQueryResponseDto, VeraSourceDto } from "./dto/vera-query-response.dto";

@Injectable()
export class VeraService {
    // Méthode pour traiter une requête Vera et générer une réponse
    async handleQuery(request: VeraQueryRequestDto): Promise<VeraQueryResponseDto> {
        // Validation des données
        if (!request.query || request.query.trim() === '') {
            throw new BadRequestException('Query cannot be empty');
        }

        if (!request.userId) {
            throw new BadRequestException('userId is required');
        }

        try {
            // Logique fictive pour générer une réponse basée sur la requête
            return {
                queryId: request.queryId || `query-${Date.now()}`,
                answer: `Réponse générée pour la requête : ${request.query}`,
                sources: [
                    {
                        title: 'Source Exemple',
                        url: 'https://example.com/source'
                    }
                ]
            };
        } catch (error) {
            throw new BadRequestException('Failed to process query');
        }
    }
}