import { Controller, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenValidationGuard } from 'src/guards/token-validation.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRequest } from 'src/common/types';

@ApiTags('users') // Group all user-related routes under the 'users' tag in Swagger
@ApiBearerAuth()  // Indicate that JWT auth is used for routes in this controller
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get('/me') // Correct endpoint for getting current user info
    @ApiOperation({ summary: 'Get current user info' }) // Describes the endpoint
    @ApiResponse({ status: 200, description: 'Current user info returned successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async infoMe(@Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(TokenValidationGuard)
    @Get('/:id')
    @ApiOperation({ summary: 'Get user info by ID' })
    @ApiResponse({ status: 200, description: 'User info returned successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async info(@Param('id') userId: string) {
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(AuthGuard)
    @Delete('/')
    @ApiOperation({ summary: 'Delete current user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async delete(@Req() request: AuthenticatedRequest) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.deleteUser(userId);
        return userInfo;
    }
}