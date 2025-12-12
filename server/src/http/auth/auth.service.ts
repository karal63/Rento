import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}
    async signup(candidate: SignupDto): Promise<{
        user: User;
        tokens: { accessToken: string; refreshToken: string };
    }> {
        const user = await this.userService.create(candidate);
        const { accessToken, refreshToken } = await this.generateTokens(
            user._id.toString(),
            user.email,
        );
        return {
            user,
            tokens: { accessToken, refreshToken },
        };
    }

    async generateTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    email,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '24h',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    email,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '30d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }
}
