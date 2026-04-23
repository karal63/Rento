import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SendMessageDto {
    @ApiProperty({ example: 'Leo', description: 'User name' })
    @IsString()
    @Length(2, 25)
    name!: string;

    @ApiProperty({ example: 'leo@gmail.com', description: 'User email' })
    @IsString()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'some content', description: 'User message' })
    @IsString()
    @Length(4, 500)
    content!: string;
}
