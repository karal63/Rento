import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { MessageService } from './message.service';
import { SendMessageDto } from './dto/sendMessage.dto';

@ApiTags('Message')
@Controller('message')
export class MessageController {
    constructor(private readonly service: MessageService) {}

    @Public()
    @ApiOperation({
        summary: 'Send message',
        description: 'Send user contact message',
    })
    @ApiResponse({ status: 200, description: 'Message sent' })
    @Post('send')
    async send(@Body() body: SendMessageDto) {
        await this.service.sendMessage(body);
    }
}
