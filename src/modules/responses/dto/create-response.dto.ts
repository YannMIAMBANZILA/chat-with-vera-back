import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO : Data Transfer Object pour la création d'une réponse

class AnswerDto {
  @IsString()
  @IsNotEmpty()
  questionId: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateResponseDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string; // ID de l'utilisateur qui soumet la réponse

    @IsString()
    @IsNotEmpty()
    readonly surveyId: string; // ID du sondage auquel la réponse appartient

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    readonly answers: AnswerDto[]; // tableau des réponses aux questions
}