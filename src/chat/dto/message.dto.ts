import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class MessageDto {
    @IsEmail()
    to: string;

    @IsNotEmpty()
    message: string;
}

export class MessageResponseDto {
    @ApiProperty({ example: '6178b6789f1c0000f0000000' })
    readonly _id: string;

    @ApiProperty({ example: 'user1@example.com' })
    sender: string;

    @ApiProperty({ example: 'user2@example.com' })
    recipient: string;

    @ApiProperty({ example: 'Hello, how are you?' })
    message: string;

    @ApiProperty({ example: '2023-10-19T12:00:00Z' })
    createdAt: Date;
}