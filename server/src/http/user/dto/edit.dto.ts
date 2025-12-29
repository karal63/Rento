import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class EditDto {
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
        example: 'Your second name',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsString()
    secondName: string;
}
