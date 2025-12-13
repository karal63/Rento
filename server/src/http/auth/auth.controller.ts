import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 200, description: 'Creates a new user' })
    @Post('signup')
    async signup(@Res() res: Response, @Body() candidate: SignupDto) {
        const {
            user,
            tokens: { accessToken, refreshToken },
        } = await this.authService.signup(candidate);

        res.cookie('accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.status(200).json({ user });
    }

    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({ status: 200, description: 'Returns user object' })
    @Post('login')
    async login(@Res() res: Response, @Body() candidate: LoginDto) {
        const {
            user,
            tokens: { accessToken, refreshToken },
        } = await this.authService.login(candidate);

        res.cookie('accessToken', accessToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.status(200).json({ user });
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({ status: 200, description: 'Logs user out' })
    @Post('logout')
    async logout() {}

    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: 200, description: 'Refreshes auth token' })
    @Post('refresh')
    async refresh() {}
}
