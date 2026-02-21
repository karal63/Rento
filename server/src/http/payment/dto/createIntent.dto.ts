import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateIntentDto {
    @ApiProperty({
        example: '1234',
        description: 'Car id',
    })
    @IsNotEmpty()
    @IsString()
    carId: string;

    @ApiProperty({
        example: '1766318160000',
        description: 'Rental start timestamp',
    })
    @IsNotEmpty()
    @IsNumber()
    rentFrom: number;

    @ApiProperty({
        example: '1766922960000',
        description: 'Rental end timestamp',
    })
    @IsNotEmpty()
    @IsNumber()
    rentTo: number;

    @ApiProperty({ example: 'Airport', description: 'Pickup location' })
    @IsNotEmpty()
    @IsString()
    pickupLocation: string;

    @ApiProperty({ example: '09:00', description: 'Pickup time' })
    @IsNotEmpty()
    @IsString()
    pickupTime: string;
}
