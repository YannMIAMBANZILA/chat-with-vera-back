// DTO : Data Transfer Object pour la création d'une réponse

export class CreateResponseDto {
    readonly userId: string; // ID de l'utilisateur qui soumet la réponse
    readonly surveyId: string; // ID du sondage auquel la réponse appartient
    readonly answers: { questionId: string; value: string }[]; // tableau des réponses aux questions
    questionId: string;
    value: string;
}