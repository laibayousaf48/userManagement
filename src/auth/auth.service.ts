import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto, LoginDto } from '../auth/dto/auth.dto';
import { UserResponseDto } from './dto/user-response.dto';
// import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService, ) {}

  async register(dto: AuthDto): Promise<UserResponseDto> {
    const { email, password, name } = dto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email is already in use'); // 409 Conflict response
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      message: 'User registered successfully',
    };
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    // Find user
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const token = this.jwtService.sign({ userId: user.id.toString(), email: user.email });

    return { accessToken: token };
  }

  // async logout(token: string) {
  //   try {
  //     // Invalidate the token by adding it to the blacklist
  //     const decodedToken = this.jwtService.decode(token) as { exp: number };
  //     const expiresAt = new Date(decodedToken.exp * 1000); // Convert expiration to Date object

  //     // Add the token to the blacklist
  //     await this.tokenBlacklistService.addToBlacklist(token, expiresAt);

  //     return { message: 'User logged out successfully' };
  //   } catch (error) {
  //     throw new UnauthorizedException('Error during logout');
  //   }
  // }

  // // Optional: This can be used when checking the token during authentication
  // async isTokenBlacklisted(token: string): Promise<boolean> {
  //   return await this.tokenBlacklistService.isBlacklisted(token);
  // }
}
