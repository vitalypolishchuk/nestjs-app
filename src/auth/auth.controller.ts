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
      this.setCookieAndRespond(res, token, 'User registered successfully')
    }

    @Post('login')
    async login(@Body() loginDto: LogInDto, @Res() res: Response){
      const { token } = await this.authService.login(loginDto);
      this.setCookieAndRespond(res, token, 'User logged in successfully')
    }

    private setCookieAndRespond(res: Response, token: string, successMessage: string) {
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
  
      return res.status(201).send({ message: successMessage });
    }
}