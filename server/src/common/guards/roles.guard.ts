import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { UserPayload } from '../types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) return true;

        const { user }: { user: UserPayload } = context
            .switchToHttp()
            .getRequest();

        return requiredRoles.some((role) => user.roles.includes(role));
    }
}
