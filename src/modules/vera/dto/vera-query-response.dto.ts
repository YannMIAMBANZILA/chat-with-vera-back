export class VeraSourceDto {
    title: string; // Le titre de la source
    url: string; // L'URL de la source
}


export class VeraQueryResponseDto {
    queryId: string; // L'ID de la requête associée à cette réponse
    answer: string; // La réponse générée par Vera
    sources?: VeraSourceDto[]; // Les sources utilisées pour générer la réponse, si applicable
}