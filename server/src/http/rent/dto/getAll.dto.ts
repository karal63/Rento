import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class GetAllDto {
    @ApiProperty({
        example: 'CANCELLED',
        description: 'Rental status',
    })
    status: Status[] | '';

    @ApiProperty({
        example: 1,
        description: 'Value for searching inside user object',
    })
    @IsString()
    search: string;

    @ApiProperty({
        example: 'createdAt:desc',
        description: 'Indicates field and order filter we want to get data',
    })
    @IsString()
    sort: string;

    @ApiProperty({
        example: 1,
        description: 'Indicates page scope',
    })
    @IsString()
    page: string;

    @ApiProperty({
        example: true,
        description: 'Indicates whether rental has assigned employee',
    })
    @IsString()
    unassigned: boolean;

    @ApiProperty({
        example: true,
        description: 'Indicates if we want to get only rentals assigned to us',
    })
    @IsString()
    my: boolean;
}
