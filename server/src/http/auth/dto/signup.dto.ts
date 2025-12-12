import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';

export class SignupDto {
    @ApiProperty({
        example: 'Leo',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Your second name',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsString()
    secondName: string;

    @ApiProperty({
        example: 'leo@gmail.com',
        description: 'Email addres',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '+12345678910',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        example: '1234',
        description: 'Password must be at least 4 characters long',
    })
    @IsNotEmpty()
    @IsString()
    @Length(4)
    password: string;
}
