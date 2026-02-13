import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
    Min,
    ValidateNested,
} from 'class-validator';

class CarDetailsDto {
    @IsNumber()
    @IsPositive()
    accelerationTo100: number;

    @IsInt()
    @Min(1)
    horsepower: number;

    @IsInt()
    @Min(1)
    torqueNm: number;

    @IsString()
    transmission: string;

    @IsInt()
    @Min(1)
    numberOfSeats: number;
}

class CarPricingDto {
    @IsNumber()
    @IsPositive()
    day: number;

    @IsNumber()
    @IsPositive()
    days2_3: number;

    @IsNumber()
    @IsPositive()
    days4_6: number;

    @IsNumber()
    @IsPositive()
    days7_13: number;

    @IsNumber()
    @IsPositive()
    days14_29: number;

    @IsNumber()
    @IsPositive()
    month: number;
}

export class AddCarDto {
    @ApiProperty({ example: 'BMW X5' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'https://example.com/car-image.jpg' })
    @IsUrl()
    image: string;

    @ApiProperty({ description: 'Car details', type: CarDetailsDto })
    @ValidateNested()
    @Type(() => CarDetailsDto)
    details: CarDetailsDto;

    @ApiProperty({ example: 30000, description: 'Deposit amount in zl' })
    @IsInt()
    @Min(0)
    deposit: number;

    @ApiProperty({ description: 'Car pricing', type: CarPricingDto })
    @ValidateNested()
    @Type(() => CarPricingDto)
    pricing: CarPricingDto;

    @ApiProperty({ example: 'Lamborghini', description: 'Car brand' })
    @IsString()
    brand: string;
}
