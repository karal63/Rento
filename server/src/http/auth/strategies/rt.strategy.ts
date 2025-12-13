import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UserPayload } from 'src/common/types/user.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: RtStrategy.jwtFromCookie,
            secretOrKey: process.env.JWT_REFRESH_SECRET as string,
        });
    }

    validate(payload: UserPayload) {
        return payload;
    }

    private static jwtFromCookie(this: void, req: Request): string | null {
        return (req.cookies as { accessToken: string }).accessToken;
    }
}
