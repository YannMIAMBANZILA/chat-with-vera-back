import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
        secret: process.env.JWT_SERCRET || 'deb-secret',
        signOptions: { expiresIn: '1h'}   
    })
], // Pour accéder au userService depuis AuthService
  controllers: [AuthController],
  providers: [AuthService],
})


export class AuthModule {}
