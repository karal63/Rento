import { ApiPropertyOptional } from '@nestjs/swagger';

export class UnassignDto {
    @ApiPropertyOptional({
        example: '692f4e940bb25367ab854f7e',
        description: 'Determines which user we want to unassign',
    })
    userId?: string;
}
