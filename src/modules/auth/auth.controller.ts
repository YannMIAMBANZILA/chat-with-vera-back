import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.validateUser(loginDto.email, loginDto.password);
    }
    
    async findByEmail(email: string) {
        return await this.authService.validateUser(email, '');
    }
}