import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 200, description: 'Creates a new user' })
    @Post('signup')
    async signup() {
        try {
            const { user, token } = await this.authService.create();
        } catch (error) {
            console.log(error);
        }
    }
}
