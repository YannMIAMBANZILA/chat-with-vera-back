import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

/**
 * DTO utilisé pour la création d'un utilisateur.
 * Il sert de contrat entre le client (front/Postman) et l'API,
 * et permet de valider automatiquement les données reçues.
 */
export class CreateUserDto {
  @IsString()          // Le username doit être une chaîne de caractères
  @MinLength(3)        // Longueur minimale : 3 caractères
  username: string;    // Exemple : "Yann"

  @IsEmail()           // Doit respecter le format email (xxx@domaine.tld)
  email: string;       // Exemple : "yann@example.com"

  @IsString()          // Le mot de passe doit être une chaîne
  @MinLength(6)        // Longueur minimale : 6 caractères (renforce un peu la sécurité)
  password: string;    // Exemple : "monMot2Passe!"

  @IsOptional()        // Champ facultatif dans la requête
  @IsIn(['user', 'admin']) // N'accepte que "user" ou "admin" si fourni
  role?: string;       // Si absent, ton schéma Mongoose mettra 'user' par défaut
}
