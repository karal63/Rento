import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
    MaxLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class EditDto {
    @ApiProperty({
        example: 'Leo',
        description: 'First name',
    })
    @IsString()
    @Length(3, 25)
    @IsOptional()
    name?: string;

    @ApiProperty({
        example: 'Your second name',
        description: "Can't be empty",
    })
    @IsString()
    @Length(3, 25)
    @IsOptional()
    secondName?: string;

    @ApiProperty({
        example: 'leo@gmail.com',
        description: 'Email addres',
    })
    @IsEmail()
    @MaxLength(254)
    @IsOptional()
    email?: string;

    @ApiProperty({
        example: '+12345678910',
        description: "Can't be empty",
    })
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({
        example: '1._Aqq@/2',
        description: "Can't be empty",
    })
    @IsString()
    @IsStrongPassword()
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({
        example: ['admin'],
        description: 'Must contain at least one role if provided',
        enum: Role,
        isArray: true,
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsEnum(Role, { each: true })
    @IsOptional()
    roles?: Role[];
}
