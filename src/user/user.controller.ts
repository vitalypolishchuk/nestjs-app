import { Controller, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenValidationGuard } from 'src/guards/token-validation.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/common/types';
import { GetCurrentUserInfoSwagger } from './swagger/get-current-user-info-swagger.decorator';
import { GetUserInfoByIdSwagger } from './swagger/get-current-user-info-by-id-swagger.decorator';
import { DeleteCurrentUserSwagger } from './swagger/delete-current-user-swagger.decorator';

@ApiTags('users') // Group all user-related routes under the 'users' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for routes in this controller
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get('/me') // Correct endpoint for getting current user info
    @GetCurrentUserInfoSwagger()
    async infoMe(@Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(TokenValidationGuard)
    @Get('/:id')
    @GetUserInfoByIdSwagger()
    async info(@Param('id') userId: string) {
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(AuthGuard)
    @Delete('/')
    @DeleteCurrentUserSwagger()
    async delete(@Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.deleteUser(userId);
        return userInfo;
    }
}