import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches } from 'class-validator';

export class CreateRentalDto {
    @ApiProperty({
        example: '692f4e940bb25367ab854f7e',
        description: 'References a car',
    })
    @IsString()
    carId: string;

    @ApiProperty({
        example: '692f4e940bb25367ab854f7e',
        description: 'References an employee',
    })
    @IsString()
    employee: string;

    @ApiProperty({
        example: '692f4e940bb25367ab854f7e',
        description: 'Represents a user that made a rental',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        example: '1766345820000',
        description: 'Date when rental becomes active',
    })
    @IsNumber()
    rentFrom: number;

    @ApiProperty({
        example: '1766345820000',
        description: 'Date when rental ends',
    })
    @IsNumber()
    rentTo: number;

    @ApiProperty({
        example: 'Airport XYZ',
        description:
            'Determines location where car will be picked up by a client',
    })
    @IsString()
    pickupLocation: string;

    @ApiProperty({
        example: '09:00',
        description: 'Determines time when car will be picked up by a client',
    })
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    pickupTime: string;
}
