import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { DashboardDto } from './dto/dashboard.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @ApiOperation({ summary: 'Get admin dashboard summary' })
    @ApiResponse({
        status: 200,
        description: 'returns all information about entities conditions',
    })
    @Roles(Role.Admin)
    @Get('summary')
    async getDashboardSummary(@Query() query: DashboardDto) {
        const data = await this.dashboardService.getSummary(query);
        return data;
    }
}
