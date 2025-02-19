import { Controller, Post, Get, Patch, Param, Body, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ThirdPartyClientsApiKeysService } from './third-party-clients-api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';

@ApiTags('Third-Party Client API Keys')
@Controller('third-party-clients/:id/api-keys')
export class ThirdPartyClientsApiKeysController {
  constructor(private readonly service: ThirdPartyClientsApiKeysService) {}

//   @Post()
//   @ApiOperation({ summary: 'Generate API key for a client' })
//   create(@Param('id') id: number, @Body() dto: CreateApiKeyDto) {
//     return this.service.create(Number(id), dto);
//   }
@Post()
@ApiOperation({ summary: 'Generate API key for a client' })
@ApiParam({ name: 'id', type: Number, description: 'Third-Party Client ID' })
@ApiResponse({ status: 201, description: 'API Key generated successfully' })
@ApiResponse({ status: 400, description: 'Bad Request - Invalid input' })
@ApiResponse({ status: 404, description: 'Not Found - Client ID does not exist' })
@ApiResponse({ status: 500, description: 'Internal Server Error' })
async create(@Param('id') clientId: number, @Body() dto: CreateApiKeyDto) {
  try {
    return await this.service.create(clientId, dto);
  } catch (error) {
    console.error('🔥 Error creating API key:', error?.message || error);

    // Handle known errors and return proper API responses in Swagger
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    } else if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException('Unexpected error occurred while generating API key');
  }
}

  @Get()
  @ApiOperation({ summary: 'List all API keys of a client' })
  findAll(@Param('id') id: number) {
    return this.service.findAll(Number(id));
  }

  @Patch('/:keyId/revoke')
  @ApiOperation({ summary: 'Revoke an API key' })
  @ApiParam({ name: 'keyId', type: Number, description: 'API Key ID' })
  revoke(@Param('keyId') keyId: number) {
    return this.service.revoke(Number(keyId));
  }

  @Patch('/:keyId/activate')
  @ApiOperation({ summary: 'Reactivate a revoked API key' })
  @ApiParam({ name: 'keyId', type: Number, description: 'API Key ID' })
  activate(@Param('keyId') keyId: number) {
    return this.service.activate(Number(keyId));
  }
}
