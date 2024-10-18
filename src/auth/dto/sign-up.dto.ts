import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password for the user account (6 to 20 characters)',
        example: 'strongpassword',
        minLength: 6,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;
}
