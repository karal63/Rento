import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'leo@gmail.com',
        description: 'Email addres',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1234',
        description: 'Password must be at least 4 characters long',
    })
    @IsNotEmpty()
    @Length(4)
    password: string;
}
