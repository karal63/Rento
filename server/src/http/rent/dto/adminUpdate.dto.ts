import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class AdminUpdateDto {
    @ApiPropertyOptional({
        example: '692f4e940bb25367ab854f7e',
        description: 'References a car',
    })
    @IsString()
    @IsOptional()
    carId: string;

    @ApiPropertyOptional({
        example: '692f4e940bb25367ab854f7e',
        description: 'Represents a user that made a rental',
    })
    @IsString()
    @IsOptional()
    userId: string;

    @ApiPropertyOptional({
        example: '1766345820000',
        description: 'Date when rental becomes active',
    })
    @IsNumber()
    @IsOptional()
    rentFrom: number;

    @ApiPropertyOptional({
        example: '1766345820000',
        description: 'Date when rental ends',
    })
    @IsNumber()
    @IsOptional()
    rentTo: number;

    @ApiPropertyOptional({
        example: 'Airport XYZ',
        description:
            'Determines location where car will be picked up by a client',
    })
    @IsString()
    @IsOptional()
    pickupLocation: string;

    @ApiPropertyOptional({
        example: '09:00',
        description: 'Determines time when car will be picked up by a client',
    })
    @IsString()
    @IsOptional()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    pickupTime: string;

    @ApiPropertyOptional({
        example: 'Completed',
        description: 'Indicates current rental status',
    })
    @IsEnum(Status)
    @IsOptional()
    status: string;
}
