import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';

class CarDetailsDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    accelerationTo100: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    horsepower: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    torqueNm: number;

    @IsString()
    @IsOptional()
    transmission: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    numberOfSeats: number;
}

class CarPricingDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    day?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    days2_3: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    days4_6: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    days7_13: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    days14_29: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    month: number;
}

export class EditCarDto {
    @ApiPropertyOptional({ example: 'BMW X5' })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ example: 'https://example.com/car-image.jpg' })
    @IsOptional()
    images: string[];

    @ApiPropertyOptional({ description: 'Car details', type: CarDetailsDto })
    @ValidateNested()
    @IsOptional()
    @Type(() => CarDetailsDto)
    details: CarDetailsDto;

    @ApiPropertyOptional({
        example: 30000,
        description: 'Deposit amount in zl',
    })
    @IsInt()
    @Min(0)
    @IsOptional()
    deposit: number;

    @ApiPropertyOptional({ description: 'Car pricing', type: CarPricingDto })
    @ValidateNested()
    @IsOptional()
    @Type(() => CarPricingDto)
    pricing: CarPricingDto;

    @ApiPropertyOptional({ example: 'Lamborghini', description: 'Car brand' })
    @IsString()
    @IsOptional()
    brand: string;
}
