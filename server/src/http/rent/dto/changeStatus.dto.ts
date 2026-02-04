import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class ChangeStatusDto {
    @ApiProperty({ example: 'COMPLETED', description: 'New rental status' })
    @IsEnum(Status)
    status: Status;
}
