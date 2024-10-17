import { Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import * as bcrypt from 'bcryptjs';
import { UserModel, User } from "../models/user.model";
import { JwtService } from "@nestjs/jwt";
import { LogInDto } from "./dto/log-in.dto";

import { ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async signUp(signUpDto: SignUpDto) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

        const existingUser = await UserModel.findOne({ email: signUpDto.email });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Add user to MongoDB
        const user = new UserModel({
            email: signUpDto.email,
            password: hashedPassword,
        });
        await user.save(); // Ensure to await the save operation

        const token = this.jwtService.sign({ email: user.email, id: user._id });

        return { token };
    }

    async login(loginDto: LogInDto) {
        // Check if user exists
        const user = await UserModel
            .findOne({ email: loginDto.email })
            .select('email password _id')
            .exec() as User | null; // Execute the query and assert the type

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is invalid');
        }

        const token = this.jwtService.sign({ email: user.email, id: user._id });

        return { token };
    }
}
