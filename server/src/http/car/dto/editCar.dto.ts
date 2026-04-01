import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsInt,
    IsNumber,
    IsOptional,
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
    @IsOptional()
    accelerationTo100: number;

    @IsInt()
    @Min(1)
    @Max(3000)
    @IsOptional()
    horsepower: number;

    @IsInt()
    @Min(1)
    @Max(5000)
    @IsOptional()
    torqueNm: number;

    @IsString()
    @Length(3, 50)
    @IsOptional()
    transmission: string;

    @IsInt()
    @Min(1)
    @Max(20)
    @IsOptional()
    numberOfSeats: number;
}

class CarPricingDto {
    @IsNumber()
    @Min(0)
    @IsOptional()
    day: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    days2_3: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    days4_6: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    days7_13: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    days14_29: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    month: number;
}

export class EditCarDto {
    @ApiProperty({ example: 'BMW X5' })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'https://example.com/car-image.jpg' })
    @ArrayMinSize(1)
    @ArrayMaxSize(10)
    @IsOptional()
    images?: string[];

    @ApiProperty({ description: 'Car details', type: CarDetailsDto })
    @ValidateNested()
    @Type(() => CarDetailsDto)
    @IsOptional()
    details?: CarDetailsDto;

    @ApiProperty({ example: 30000, description: 'Deposit amount in zl' })
    @IsInt()
    @Min(0)
    @IsOptional()
    deposit?: number;

    @ApiProperty({ description: 'Car pricing', type: CarPricingDto })
    @ValidateNested()
    @Type(() => CarPricingDto)
    @IsOptional()
    pricing?: CarPricingDto;

    @ApiProperty({ example: 'Lamborghini', description: 'Car brand' })
    @IsString()
    @Length(2, 100)
    @IsOptional()
    brand?: string;
}
