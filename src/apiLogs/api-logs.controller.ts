import { Controller, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ApiKeyLogsService } from './api-logs.service';
import { CreateApiKeyLogDto } from './dto/create-api-key-log.dto';

@ApiTags('API Key Logs')
@Controller('api-key-logs')
export class ApiKeyLogsController {
  constructor(private readonly apiKeyLogsService: ApiKeyLogsService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create an API Key log' })
//   @ApiResponse({ status: 201, description: 'Log created successfully' })
//   @ApiResponse({ status: 500, description: 'Internal Server Error' })
//   async create(@Body() dto: CreateApiKeyLogDto) {
//     return await this.apiKeyLogsService.create(dto);
//   }

  @Get()
  @ApiOperation({ summary: 'Get all API Key logs' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved logs' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll() {
    return await this.apiKeyLogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an API Key log by ID' })
  @ApiResponse({ status: 200, description: 'Log found' })
  @ApiResponse({ status: 404, description: 'Log not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.apiKeyLogsService.findOne(id);
  }
}
