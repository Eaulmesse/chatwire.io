import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Email invalide'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    username: string;
}
