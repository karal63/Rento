import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../types/user.type';

export const GetUser = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        const request: Request & { user: UserPayload } = context
            .switchToHttp()
            .getRequest();
        return request.user;
    },
);
