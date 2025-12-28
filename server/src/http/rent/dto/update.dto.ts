import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateDto {
    @ApiProperty({
        example: '09:00',
        description: 'Pickup time',
    })
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    time: string;

    @ApiProperty({
        example: 'Airport',
        description: 'Pickup location',
    })
    @IsNotEmpty()
    @IsString()
    location: string;
}
