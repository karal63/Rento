import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsEnum,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateDto {
    @ApiProperty({
        example: 'Leo',
        description: 'First name',
    })
    @IsString()
    @Length(3)
    name: string;

    @ApiProperty({
        example: 'Your second name',
        description: "Can't be empty",
    })
    @IsString()
    secondName: string;

    @ApiProperty({
        example: 'leo@gmail.com',
        description: 'Email addres',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '+12345678910',
        description: "Can't be empty",
    })
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        example: '1._Aqq@/2',
        description: "Can't be empty",
    })
    @IsString()
    @IsStrongPassword()
    password: string;

    @ApiPropertyOptional({
        example: ['admin'],
        description: 'Must contain at least one role if provided',
        enum: Role,
        isArray: true,
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsEnum(Role, { each: true })
    roles: Role[];
}
