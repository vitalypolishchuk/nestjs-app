import { IsEmail, IsNotEmpty } from 'class-validator';

export class MessageDto {
    @IsEmail()
    to: string;

    @IsNotEmpty()
    message: string;
}