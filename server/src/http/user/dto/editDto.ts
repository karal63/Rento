import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';

export class EditDto {
    @ApiProperty({
        example: 'Leo',
        description: 'First name',
    })
    @IsNotEmpty()
    @IsString()
    @Length(3)
    @IsOptional()
    name: string;

    @ApiProperty({
        example: 'Your second name',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    secondName: string;

    @ApiProperty({
        example: 'leo@gmail.com',
        description: 'Email addres',
    })
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        example: '+12345678910',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: string;

    @ApiProperty({
        example: '1._Aqq@/2',
        description: "Can't be empty",
    })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @IsOptional()
    password: string;
}
