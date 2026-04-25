import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';
import { RtGuard } from 'src/common/guards/rt.guard';
import { Public } from 'src/common/decorators/public.decorator';
import type { TelegramLoginQuery } from './dto/telegramQuery.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @ApiOperation({ summary: 'Sign up' })
    @ApiResponse({ status: 200, description: 'Creates a new user' })
    @Post('signup')
    async signup(@Res() res: Response, @Body() candidate: SignupDto) {
        const {
            user,
            tokens: { accessToken, refreshToken },
        } = await this.authService.signup(candidate);

        res.cookie('accessToken', accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.status(201).json({ user });
    }

    @Public()
    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({ status: 200, description: 'Returns user object' })
    @Post('login')
    async login(@Res() res: Response, @Body() candidate: LoginDto) {
        const {
            user,
            tokens: { accessToken, refreshToken },
        } = await this.authService.login(candidate);

        res.cookie('accessToken', accessToken, {
            maxAge: 15 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });
        res.status(201).json({ user });
    }

    @ApiOperation({ summary: 'Log out' })
    @ApiResponse({ status: 200, description: 'Logs user out' })
    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    logout(@Res() res: Response) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(200).json('Logged out');
        } catch (error) {
            console.log(error);
        }
    }

    @ApiOperation({ summary: 'Refresh tokens' })
    @ApiResponse({ status: 200, description: 'Refreshes auth token' })
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    async refresh(@Res() res: Response, @GetUser() userDto: UserPayload) {
        const { user, tokens } = await this.authService.refresh(userDto);

        res.cookie('accessToken', tokens.accessToken, {
            maxAge: 15 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });

        return res.status(200).json(user);
    }

    @Public()
    @ApiOperation({ summary: 'Log in with Telegram' })
    @ApiResponse({ status: 200, description: 'Gets Telegram account data' })
    @Get('telegram')
    async loginTelegram(
        @Query() query: TelegramLoginQuery,
        @Res() res: Response,
    ) {
        const { tokens } = await this.authService.loginTelegram(query);

        res.cookie('accessToken', tokens.accessToken, {
            maxAge: 15 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });
        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none',
            httpOnly: true,
        });

        return res.redirect(`${process.env.CORS_ORIGIN}${query.url}`);
    }
}
