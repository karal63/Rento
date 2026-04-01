import { IsOptional } from 'class-validator';

export class GetAllCarsDto {
    page: string;

    @IsOptional()
    brand?: string[];

    @IsOptional()
    search?: string;
}
