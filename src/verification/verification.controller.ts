import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto'; // DTO
import { Verifications } from '@prisma/client'; // Prisma model for Verification
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

@Post('request')
@ApiOperation({ summary: 'Request email verification' })
@ApiResponse({ status: 201, description: 'Verification token sent successfully' })
@ApiResponse({ status: 400, description: 'User not found or request failed' })
async requestVerification(@Body() createVerificationDto: CreateVerificationDto) {
  return this.verificationService.requestVerification(createVerificationDto);
}

// Verify token
@Post('verify/:token')
@ApiOperation({ summary: 'Verify email with token' })
@ApiParam({ name: 'token', description: 'Verification token sent to the user' })
@ApiResponse({ status: 200, description: 'Email successfully verified' })
@ApiResponse({ status: 400, description: 'Invalid or expired token' })
async verifyToken(@Param('token') token: string) {
  return this.verificationService.verifyToken(token);
}

// Get all verifications
@Get()
@ApiOperation({ summary: 'Get all verification records' })
@ApiResponse({ status: 200, description: 'List of all verifications' })
async getAllVerifications() {
  return this.verificationService.getAllVerifications();
}
}
