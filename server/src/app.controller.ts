import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
    @ApiOperation({ summary: 'Health check' })
    @ApiResponse({ status: 200, description: 'Checks health.' })
    @Get()
    getHello(): string {
        return 'OK';
    }
}
