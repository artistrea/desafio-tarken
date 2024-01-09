import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { SignInDto } from './dto/SignIn.dto';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    try {
      return await this.authService.signUp(
        signUpDto.email,
        signUpDto.password,
        signUpDto.password_confirmation,
      );
    } catch (e) {
      if (e instanceof QueryFailedError) return res.status(422).send();
      else throw e;
    }
  }
}
