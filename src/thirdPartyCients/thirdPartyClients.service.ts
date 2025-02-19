// src/third-party-clients/third-party-clients.service.ts
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Assuming PrismaService is set up
import { CreateThirdPartyClientDto } from './dto/create-third-party-client.dto';
import { UpdateThirdPartyClientDto } from './dto/update-third-party-client.dto';

@Injectable()
export class ThirdPartyClientsService {
  constructor(private prisma: PrismaService) {}

  // Create a new Third Party Client
  async create(createDto: CreateThirdPartyClientDto) {
    return this.prisma.thirdPartyClients.create({
      data: {
        name: createDto.name,
        key: createDto.key,
        // isVerified: createDto.isVerified, // Ensure this field is passed
        isVerified: false, // Ensure this field is passed
        description: createDto.description,
      },
    });
  }

  // Get all Third Party Clients
  async findAll() {
    return this.prisma.thirdPartyClients.findMany();
  }

  // Get a single Third Party Client by ID
  async findOne(id: number) {
    const client = await this.prisma.thirdPartyClients.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Third Party Client with id ${id} not found`);
    }
    return client;
  }

  // Update a Third Party Client by ID
  async update(id: number, updateDto: UpdateThirdPartyClientDto) {
    const existingClient = await this.prisma.thirdPartyClients.findUnique({
      where: { id },
    });
    if (!existingClient) {
      throw new NotFoundException(`Third Party Client with id ${id} not found`);
    }

    return this.prisma.thirdPartyClients.update({
      where: { id },
      data: updateDto,
    });
  }

  // Delete a Third Party Client by ID
  async remove(id: number) {
    const client = await this.prisma.thirdPartyClients.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Third Party Client with id ${id} not found`);
    }

    return this.prisma.thirdPartyClients.delete({
      where: { id },
    });
  }

  // verify client
  async verifyClient(id: number) {
    try {
      if (!id) throw new BadRequestException('Client ID is required');

      const client = await this.prisma.thirdPartyClients.findUnique({ where: { id } });
      if (!client) throw new NotFoundException(`Third-Party Client with ID ${id} not found`);

      if (client.isVerified) throw new BadRequestException(`Client with ID ${id} is already verified`);

      return await this.prisma.thirdPartyClients.update({
        where: { id },
        data: { isVerified: true },
      });
    } catch (error) {
      console.error('🔥 Error verifying client:', error?.message || error);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Unexpected error occurred while verifying client');
    }
  }
}
