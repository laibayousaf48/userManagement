import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
// @ApiTags('authentication')
@Post('register')
@ApiOperation({ summary: 'Register a new user' })
@ApiResponse({
    status: 201,
  description: 'User registered successfully',
  type: UserResponseDto,
})
async register(@Body() dto: AuthDto): Promise<UserResponseDto> {
    return this.authService.register(dto);
  }


  @Post('login')
  @ApiOperation({ summary: 'login a user' })
@ApiResponse({
    status: 201,
  description: 'User logged in successfully',
  type: UserResponseDto,
})
@ApiResponse({
    status: 404,
  description: 'bad request',
})
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

//   @Post('logout')
//   @ApiOperation({ summary: 'Logout the user' })
//   async logout(@Req() req: Request) {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract JWT from Authorization header

//     if (!token) {
//       throw new UnauthorizedException('Token not found');
//     }

//     return this.authService.logout(token);
//   }
}
