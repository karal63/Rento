import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsInt,
    IsNumber,
    IsString,
    Length,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';

class CarDetailsDto {
    @IsNumber()
    @Min(0)
    @Max(20)
    accelerationTo100: number;

    @IsInt()
    @Min(1)
    @Max(3000)
    horsepower: number;

    @IsInt()
    @Min(1)
    @Max(5000)
    torqueNm: number;

    @IsString()
    @Length(3, 50)
    transmission: string;

    @IsInt()
    @Min(1)
    @Max(20)
    numberOfSeats: number;
}

class CarPricingDto {
    @IsNumber()
    @Min(0)
    day: number;

    @IsNumber()
    @Min(0)
    days2_3: number;

    @IsNumber()
    @Min(0)
    days4_6: number;

    @IsNumber()
    @Min(0)
    days7_13: number;

    @IsNumber()
    @Min(0)
    days14_29: number;

    @IsNumber()
    @Min(0)
    month: number;
}

export class AddCarDto {
    @ApiProperty({ example: 'BMW X5' })
    @IsString()
    @Length(2, 100)
    name: string;

    @ApiProperty({ example: 'https://example.com/car-image.jpg' })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    images: string[];

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
    @Length(2, 100)
    brand: string;
}
