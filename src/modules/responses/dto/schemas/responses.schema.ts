import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ResponseDocument = Response & Document; // définir le type de document Mongoose pour la réponse

@Schema()// définir le schéma Mongoose pour la réponse

export class Response {
  @Prop({ required: true })
  userId: string; // ID de l'utilisateur qui a soumis la réponse

  @Prop({ required: true })
  surveyId: string; // ID du sondage auquel la réponse appartient

  @Prop({type: [{ questionId: String, value: String }] , required: true })
    answers: { questionId: string; value: string }[]; // tableau des réponses aux questions

    @Prop({ default: Date.now })
    createdAt: Date; // date de création de la réponse
}
  
// Créer le schéma Mongoose à partir de la classe Response
export const ResponseSchema = SchemaFactory.createForClass(Response);