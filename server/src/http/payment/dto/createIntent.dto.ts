import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateIntentDto {
    @ApiProperty({
        example: '1234',
        description: 'Car id',
    })
    @IsNotEmpty()
    @IsString()
    carId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(30)
    daysCount: number;
}
