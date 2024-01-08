import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWTPayload } from 'src/types/AuthenticatedRequest';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    console.log('user', user);

    if (!(await bcrypt.compare(pass, user.hashed_password))) {
      throw new UnauthorizedException();
    }

    const payload: JWTPayload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    email: string,
    pass: string,
    passConfirmation: string,
  ): Promise<ReturnType<typeof this.signIn>> {
    if (passConfirmation !== pass) throw new BadRequestException();
    const hashed_password = await bcrypt.hash(pass, 10);
    console.log('hashed_password', hashed_password);

    await this.usersService.createUser(email, hashed_password);

    return this.signIn(email, pass);
  }
}
