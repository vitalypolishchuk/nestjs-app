import { IsEmail, IsNotEmpty } from 'class-validator';

export class MessageDto {
    @IsEmail() // Validates that the 'to' field is a valid email format
    @IsNotEmpty() // Ensures 'to' is not empty
    to: string;

    @IsNotEmpty() // Ensures 'message' is not empty
    message: string;
}
