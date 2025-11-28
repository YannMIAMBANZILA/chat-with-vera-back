import { IsEmail, IsString, MinLength, IsOptional,IsIn } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
  @IsIn(['user', 'admin'])
  role?: string;   // optionnel, 'user' sera la valeur par défaut

}
