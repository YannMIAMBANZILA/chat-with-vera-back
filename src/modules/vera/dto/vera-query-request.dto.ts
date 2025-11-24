import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class VeraQueryRequestDto {
    @IsString()
    @IsNotEmpty()
    readonly query: string; // La requête de l'utilisateur

    @IsString()
    @IsNotEmpty()
    userId: string; // L'ID de l'utilisateur

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    files?: string[]; // Les fichiers associés à la requête, si applicable

    @IsOptional()
    @IsString()
    queryId?: string; // L'ID de la requête pour le suivi, si applicable
}

