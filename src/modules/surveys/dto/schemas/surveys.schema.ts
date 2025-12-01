import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SurveyDocument = Survey & Document;

/**
 * Schéma MongoDB pour un sondage Vera.
 *
 * Chaque sondage :
 *  - a un titre (obligatoire),
 *  - une description optionnelle,
 *  - une liste de questions (texte simple pour commencer),
 *  - un champ createdAt pour l’historique.
 *
 * Les réponses des utilisateurs ne sont PAS stockées ici,
 * mais dans la collection "responses" (via surveyId + userId).
 */
@Schema()
export class Survey {
  @Prop({ required: true })
  title: string; // Titre du sondage (ex : "Ton expérience avec Vera ?")

  @Prop()
  description?: string; // Texte descriptif optionnel

  @Prop({
    type: [
      {
        questionText: { type: String, required: true }, // Intitulé de la question
      },
    ],
    default: [],
  })
  questions: {
    questionText: string;
  }[]; // Liste de questions (simplifié pour un premier jet)

  @Prop({ default: Date.now })
  createdAt: Date; // Date de création du sondage
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
