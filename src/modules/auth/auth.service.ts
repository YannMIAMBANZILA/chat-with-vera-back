import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // On ne garde que les champs utiles
    const doc: any = (user as any)._doc ?? user;

    const safeUser = {
      _id: doc._id,
      username: doc.username,
      email: doc.email,
      role: doc.role,
    };

    return safeUser; // ce safeUser sera mis dans req.user
  }

  async login(user: { _id: string; username?: string; email: string; role: string }) {
    const payload = {
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
