import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/sign-up.dto";
import { Response } from "express";
import { LogInDto } from "./dto/log-in.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response){
      const { token } = await this.authService.signUp(signUpDto);
      this.authService.setCookieAndRespond(res, token, 'User registered successfully')
    }

    @Post('login')
    async login(@Body() loginDto: LogInDto, @Res() res: Response){
      const { token } = await this.authService.login(loginDto);
      this.authService.setCookieAndRespond(res, token, 'User logged in successfully')
    }
}