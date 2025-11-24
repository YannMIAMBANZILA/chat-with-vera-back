

export class VeraQueryRequestDto {
    readonly query: string; // La requête de l'utilisateur
    userId: string; // L'ID de l'utilisateur
    files?: string[]; // Les fichiers associés à la requête, si applicable
    queryId?: string; // L'ID de la requête pour le suivi, si applicable
}

