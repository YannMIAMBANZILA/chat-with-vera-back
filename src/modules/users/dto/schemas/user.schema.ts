import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';
export type UserDocument = User & Document;

@Schema()// Décorateur pour définir un schéma Mongoose

export class User {

@ Prop({ required: true }) 
    username: string;
    
@ Prop({ required: true, unique: true, null: false })
    email: string;

@ Prop({ required: true })
    password: string;

@ Prop({default: Date.now}) 
    createdAt: Date;
} 

export const UserSchema = SchemaFactory.createForClass(User); // Crée le schéma Mongoose à partir de la classe User

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password') || this.isNew ) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});