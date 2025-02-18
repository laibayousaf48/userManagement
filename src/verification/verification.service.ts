import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Import Prisma Service
import * as crypto from 'crypto';
import { CreateVerificationDto } from './dto/create-verification.dto'; // DTO for creating verification
import * as nodemailer from 'nodemailer'; // Import nodemailer
import { ConfigService } from '@nestjs/config'; // To load environment variables

@Injectable()
export class VerificationService {
  private transporter;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService, // Inject ConfigService for env variables
  ) {
    // Initialize Nodemailer transporter with SMTP settings from environment variables
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: false, // For TLS
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async requestVerification(createVerificationDto: CreateVerificationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createVerificationDto.entityId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Token expires in 1 hour

    const verification = await this.prisma.verifications.create({
      data: {
        entityId: user.id,
        token,
        expiresAt: expirationDate,
        // createdBy: createVerificationDto.createdBy,
        entry: 'user_email_verification', 
        key: crypto.randomBytes(20).toString('hex'),
      },
    });

    // Send verification token email
    await this.sendVerificationEmail(user.email, token);

    // return verification;
    return {
      ...verification,
      entityId: verification.entityId.toString(),  // Convert BigInt id to string
    };
  }

  // Verify token (mark as verified)
  async verifyToken(token: string) {
    const verification = await this.prisma.verifications.findFirst({
      where: { token },
    });

    if (!verification) {
      throw new Error('Verification token not found');
    }

    if (verification.expiresAt < new Date()) {
      throw new Error('Verification token has expired');
    }

    // Mark as verified
    const updatedVerification = await this.prisma.verifications.update({
      where: { id: verification.id },
      data: { verifiedAt: new Date() },
    });

    return updatedVerification;
  }

  // Get all verifications
  async getAllVerifications() {
    return this.prisma.verifications.findMany();
  }

  // Send verification token via email
  private async sendVerificationEmail(to: string, token: string): Promise<void> {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to,
      subject: 'Email Verification Token',
      text: `Your email verification token is: ${token}`,
      html: `<p>Your email verification token is: <strong>${token}</strong></p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}
