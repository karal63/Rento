import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUsersDto {
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
}
