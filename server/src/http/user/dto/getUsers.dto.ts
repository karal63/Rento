import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class GetUsersDto {
    @ApiPropertyOptional({
        example: 1,
        description: 'Value for searching inside user object',
    })
    @IsString()
    search: string;

    @ApiPropertyOptional({
        example: Role.Employee,
        description: 'Value for getting only users with certain role',
    })
    @IsString()
    role: Role | '';

    @ApiPropertyOptional({
        example: 'createdAt:desc',
        description: 'Indicates field and order filter we want to get data',
    })
    @IsString()
    sort: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Indicates page scope',
    })
    @IsString()
    page: string;
}
