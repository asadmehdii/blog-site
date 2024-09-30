import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }
    return this.usersService.create(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: CreateUserDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // return this.authService.login(user);
  }
}
