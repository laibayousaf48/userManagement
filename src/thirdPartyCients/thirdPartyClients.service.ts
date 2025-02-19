// src/third-party-clients/third-party-clients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
        isVerified: createDto.isVerified, // Ensure this field is passed
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
}
