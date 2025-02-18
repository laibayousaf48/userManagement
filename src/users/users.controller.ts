import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201 })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({ status: 200 })
  // findAll() {
  //   const users = await this.userService.findAll();
  //   return users.map(user => ({
  //     ...user,
  //     id: user.id.toString(),  // Convert BigInt id to string
  //     created_by: user.created_by ? user.created_by.toString() : null,  // Convert BigInt created_by to string
  //   }));
  // }
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200 })
  async findAll() {
    const users = await this.userService.findAll();  // Ensure you await the async method
  
    return users.map(user => ({
      ...user,
      id: user.id.toString(),  // Convert BigInt id to string
      created_by: user.createdBy ? user.createdBy.toString() : null,  // Convert BigInt created_by to string
    }));
  }
  


  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(BigInt(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200 })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(BigInt(id), updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(BigInt(id));
  }
}
