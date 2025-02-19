// src/third-party-clients/third-party-clients.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { ThirdPartyClientsService } from './thirdPartyClients.service';
import { CreateThirdPartyClientDto } from './dto/create-third-party-client.dto';
import { UpdateThirdPartyClientDto } from './dto/update-third-party-client.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
@Controller('third-party-clients')
export class ThirdPartyClientsController {
  constructor(private readonly thirdPartyClientsService: ThirdPartyClientsService) {}

  @Post()
  @ApiOperation({summary: 'create third party client'})
  @ApiResponse({status: 201, description: 'third party client created successfully'})
  @ApiResponse({status: 404, description: 'bad request'})
  create(@Body() createThirdPartyClientDto: CreateThirdPartyClientDto) {
    return this.thirdPartyClientsService.create(createThirdPartyClientDto);
  }

  @Get()
  @ApiOperation({summary: 'All third party clients'})
  @ApiResponse({status: 201, description: 'third party client fetched successfully'})
  findAll() {
    return this.thirdPartyClientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get third party client by id'})
  @ApiResponse({status: 201, description: 'third party client fetched successfully'})
  @ApiResponse({status: 404, description: 'bad request'})
  findOne(@Param('id') id: number) {
    return this.thirdPartyClientsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'update third party client'})
  @ApiResponse({status: 201, description: 'third party client updated successfully'})
  @ApiResponse({status: 404, description: 'bad request'})
  update(
    @Param('id') id: number,
    @Body() updateThirdPartyClientDto: UpdateThirdPartyClientDto,
  ) {
    return this.thirdPartyClientsService.update(id, updateThirdPartyClientDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete third party client'})
  @ApiResponse({status: 201, description: 'third party client deleted successfully'})
  @ApiResponse({status: 404, description: 'bad request'})
  remove(@Param('id') id: number) {
    return this.thirdPartyClientsService.remove(id);
  }

  @Patch(':id/verify')
  @ApiOperation({ summary: 'Mark client as verified (isVerified = true)' })
  @ApiResponse({ status: 200, description: 'Client successfully verified' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 400, description: 'Client already verified' })
  async verify(@Param('id', ParseIntPipe) id: number) {
    return this.thirdPartyClientsService.verifyClient(id);
  }
}
