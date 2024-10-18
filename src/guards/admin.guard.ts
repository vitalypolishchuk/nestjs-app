import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies.jwt;
        const user = this.jwtService.verify(token);

        if (user.role !== 'admin') {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        return true;
    }
}