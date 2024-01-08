import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { SignInDto } from './dto/SignIn.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from 'src/types/AuthenticatedRequest';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.password_confirmation,
    );
  }

  @UseGuards(AuthGuard)
  @Get('segredo_teste')
  getSecretMessage(@Req() req: AuthenticatedRequest) {
    return req.current_user;
  }
}
