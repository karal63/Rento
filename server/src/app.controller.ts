import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('Root')
@Controller('/')
export class AppController {
    @ApiOperation({ summary: 'Health check' })
    @ApiResponse({ status: 200, description: 'Checks health.' })
    @Public()
    @Get('/')
    getHello(): string {
        return 'OK';
    }
}
