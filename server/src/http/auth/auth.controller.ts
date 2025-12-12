import { Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 200, description: 'Creates a new user' })
    @Post('signup')
    async signup(@Res() res: Response) {
        try {
            const {
                user,
                tokens: { accessToken, refreshToken },
            } = await this.authService.signup();

            res.cookie('accessToken', accessToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.cookie('refreshToken', refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).json({ user });
        } catch (error) {
            console.log(error);
        }
    }
}
