import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()// Décorateur pour définir un schéma Mongoose

export class User {

@ Prop({ required: true }) 
    username: string;
    
@ Prop({ required: true, unique: true })
    userEmail: string;

@ Prop({ required: true })
    password: string;

@ Prop({default: Date.now}) 
    createdAt: Date;
} 

export const UserSchema = SchemaFactory.createForClass(User); // Crée le schéma Mongoose à partir de la classe User
